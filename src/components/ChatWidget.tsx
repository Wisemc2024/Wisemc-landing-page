"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { marked } from "marked";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const INITIAL_MESSAGE: Message = { 
  role: "assistant", 
  content: "Chào bạn! Tôi là trợ lý ảo của Wise MC. Tôi có thể giúp gì cho bạn hôm nay?" 
};

// ============================================================
// CẤU HÌNH LEAD CAPTURE — Google Sheets Integration
// ============================================================
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzOAfO8ZTDTFHZprCMe2UfE-yHubhcUgRUS978UR24jkD-Ah0Ayuxgr1iRbnaFMasm6Nw/exec';
const AI_CHAT_SESSION_ID = 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
const LEAD_DATA_PATTERN = /\|\|LEAD_DATA:\s*(\{.*?\})\s*\|\|/;

/**
 * Bóc tách tag ẩn ||LEAD_DATA:{...}|| từ response AI.
 * Nếu phát hiện lead → gửi lên Google Sheets kèm lịch sử chat.
 * Trả về câu trả lời sạch (đã xóa tag).
 */
function processAIResponse(aiResponse: string): { cleanedContent: string; leadData: any } {
  let leadData = null;
  if (aiResponse.includes("||LEAD_DATA:")) {
    const match = aiResponse.match(LEAD_DATA_PATTERN);
    if (match && match[1]) {
      try {
        leadData = JSON.parse(match[1]);
        console.log("✅ Dữ liệu khách hàng bóc được:", leadData);
      } catch (error) {
        console.error("❌ Lỗi parse JSON từ AI:", error);
      }
    }
    aiResponse = aiResponse.replace(LEAD_DATA_PATTERN, "").trim();
  }
  return { cleanedContent: aiResponse, leadData };
}

/**
 * Gửi dữ liệu Lead lên Google Apps Script → Google Sheets
 */
async function sendLeadToGoogleSheets(leadData: { name?: string; phone?: string; email?: string }, chatHistoryText: string) {
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' }, // Thay đổi thành text/plain để tránh bị trình duyệt chặn
      body: JSON.stringify({
        name: leadData.name || '',
        phone: leadData.phone || '',
        email: leadData.email || '',
        source: typeof window !== 'undefined' ? window.location.href : '',
        sessionId: AI_CHAT_SESSION_ID,
        chatHistory: chatHistoryText,
        timestamp: new Date().toLocaleString('vi-VN')
      })
    });
    console.log("📤 Đã đồng bộ dữ liệu vào Google Sheets!");
  } catch (err) {
    console.warn("⚠️ Không gửi được dữ liệu lead:", err);
  }
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [leadData, setLeadData] = useState({ name: "", phone: "", email: "" });
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleStartChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadData.name || !leadData.phone) {
      alert("Vui lòng nhập Họ tên và Số điện thoại!");
      return;
    }

    setIsLoading(true);
    // Gửi thông tin lead ngay lập tức
    await sendLeadToGoogleSheets(leadData, "Khách hàng vừa nhấn 'Bắt đầu chat'");
    
    // Cập nhật câu chào cá nhân hóa
    setMessages([
      { 
        role: "assistant", 
        content: `Chào **${leadData.name}**! Rất vui được hỗ trợ bạn. Tôi là trợ lý ảo của Wise MC. Bạn đang quan tâm đến nội dung nào ạ?` 
      }
    ]);
    
    setIsFormSubmitted(true);
    setIsLoading(false);
  };

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

    const data = await resp.json();
      console.log("🤖 Raw AI Response:", data.content); // Debug AI output
      
      if (data.role === "assistant" || data.content) {
        // 1. Bóc tách lead data và làm sạch nội dung
        const { cleanedContent, leadData: newLeadData } = processAIResponse(data.content);
        
        // 2. Cập nhật Lead Data vào State nếu có thông tin mới
        const currentLead = {
          name: newLeadData?.name || leadData.name,
          phone: newLeadData?.phone || leadData.phone,
          email: newLeadData?.email || leadData.email
        };
        if (newLeadData) setLeadData(currentLead);

        // 3. Chuẩn bị lịch sử chat đầy đủ (bao gồm cả câu trả lời vừa nhận) để gửi lên Sheets
        const fullHistoryForSheets = [...messages, userMsg, { role: "assistant", content: cleanedContent }]
          .map(msg => {
            const role = msg.role === 'user' ? 'Khách' : 'AI';
            return `${role}: ${msg.content}`;
          }).join('\n\n');

        // 4. LUÔN LUÔN đồng bộ lên Sheets nếu đã có Tên hoặc SĐT
        if (currentLead.name || currentLead.phone) {
          sendLeadToGoogleSheets(currentLead, fullHistoryForSheets);
        }

        setMessages((prev) => [...prev, { role: "assistant", content: cleanedContent }]);
      }
    } catch (error) {
      console.error("❌ Chat error:", error);
      setMessages((prev) => [...prev, { role: "assistant", content: "Xin lỗi, đã có lỗi xảy ra. Bạn vui lòng liên hệ Zalo 0123456789 để được hỗ trợ nhé!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setMessages([INITIAL_MESSAGE]);
    // Stop rotation after exactly 500ms
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-body">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-80 md:w-96 bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl overflow-hidden border border-white/20 flex flex-col h-[600px] ring-1 ring-black/5"
          >
            {/* Header */}
            <div className="bg-primary-container p-5 text-on-primary-fixed flex justify-between items-center shadow-lg relative z-10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20">
                    <span className="material-symbols-outlined text-2xl">smart_toy</span>
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-primary-container rounded-full animate-pulse" />
                </div>
                <div>
                  <h4 className="font-black text-sm uppercase tracking-tight">AI Assistant</h4>
                  <p className="text-[10px] font-bold opacity-70 tracking-widest uppercase flex items-center gap-1">
                    Trực tuyến
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <motion.button 
                  animate={isRefreshing ? { rotate: 360 } : { rotate: 0 }}
                  transition={isRefreshing ? { repeat: Infinity, duration: 0.5, ease: "linear" } : { duration: 0.2 }}
                  onClick={handleRefresh}
                  className="hover:bg-black/5 p-2 rounded-full transition-colors flex items-center justify-center"
                  title="Làm mới hội thoại"
                >
                  <span className="material-symbols-outlined text-xl">refresh</span>
                </motion.button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="hover:bg-black/5 p-2 rounded-full transition-colors flex items-center justify-center"
                  title="Đóng"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>
            </div>

            {/* Body */}
            {!isFormSubmitted ? (
               <div className="flex-grow p-8 flex flex-col justify-center bg-white/50 overflow-y-auto">
                 <div className="text-center mb-8">
                   <h3 className="text-xl font-black text-zinc-800 uppercase tracking-tight">Bắt đầu tư vấn</h3>
                   <p className="text-sm text-zinc-500 font-medium mt-2">Vui lòng để lại thông tin để AI hỗ trợ bạn tốt nhất</p>
                 </div>
                 
                 <form onSubmit={handleStartChat} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Họ và tên *</label>
                      <input 
                        type="text" 
                        required
                        value={leadData.name}
                        onChange={(e) => setLeadData({...leadData, name: e.target.value})}
                        placeholder="Nguyễn Văn A"
                        className="w-full bg-white/80 border-none rounded-2xl px-5 py-3.5 text-sm font-medium focus:ring-2 focus:ring-primary-container/30 outline-none transition-all shadow-inner"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Số điện thoại *</label>
                      <input 
                        type="tel" 
                        required
                        value={leadData.phone}
                        onChange={(e) => setLeadData({...leadData, phone: e.target.value})}
                        placeholder="09xx xxx xxx"
                        className="w-full bg-white/80 border-none rounded-2xl px-5 py-3.5 text-sm font-medium focus:ring-2 focus:ring-primary-container/30 outline-none transition-all shadow-inner"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Email (Tùy chọn)</label>
                      <input 
                        type="email" 
                        value={leadData.email}
                        onChange={(e) => setLeadData({...leadData, email: e.target.value})}
                        placeholder="vidu@gmail.com"
                        className="w-full bg-white/80 border-none rounded-2xl px-5 py-3.5 text-sm font-medium focus:ring-2 focus:ring-primary-container/30 outline-none transition-all shadow-inner"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isLoading}
                      className="w-full bg-primary-container text-on-primary-fixed py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-primary-container/30 flex items-center justify-center gap-2 mt-8"
                    >
                      {isLoading ? "Đang xử lý..." : "Bắt đầu Chat ngay"}
                      <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </motion.button>
                 </form>
                 
                 <p className="text-[10px] text-zinc-400 text-center mt-6 font-medium italic">
                   * Chúng tôi cam kết bảo mật thông tin của bạn
                 </p>
               </div>
            ) : (
              <>
                {/* Messages */}
                <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-6 bg-transparent">
                  {messages.map((msg, i) => (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={i}
                      className={cn(
                        "flex flex-col max-w-[85%]",
                        msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                      )}
                    >
                      <div
                        className={cn(
                          "px-5 py-3.5 rounded-2xl shadow-md chat-markdown",
                          msg.role === "user" 
                            ? "bg-primary-container text-on-primary-fixed rounded-tr-none font-bold" 
                            : "bg-white/90 text-zinc-800 rounded-tl-none border border-zinc-100/50"
                        )}
                        dangerouslySetInnerHTML={{ 
                          __html: marked.parse(msg.content, { breaks: true }) as string 
                        }}
                      />
                    </motion.div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex flex-col items-start max-w-[85%] mr-auto">
                       <div className="bg-white/90 px-5 py-3 rounded-2xl rounded-tl-none border border-zinc-100/50 flex items-center gap-2 text-zinc-400 text-sm font-bold animate-pulse">
                          <span>Đang nhập</span>
                          <div className="flex gap-1">
                            <span className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce" />
                            <span className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                            <span className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                          </div>
                       </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-6 border-t border-black/5 bg-white/50 backdrop-blur-md">
                  <div className="relative flex items-center gap-3">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Hỏi chuyên gia về AI/Automation..."
                      className="flex-grow bg-white/80 border-none rounded-2xl px-6 py-3.5 text-sm font-medium focus:ring-2 focus:ring-primary-container/30 outline-none transition-all placeholder:text-zinc-400 shadow-inner"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleSend}
                      className="bg-primary-container text-on-primary-fixed p-3.5 rounded-2xl shadow-xl shadow-primary-container/30 flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined text-2xl font-bold">send</span>
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9, rotate: -5 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-300 relative group",
          isOpen ? "bg-zinc-900 rotate-90" : "bg-primary-container text-on-primary-fixed"
        )}
      >
        <div className="absolute inset-0 rounded-full bg-primary-container animate-ping opacity-20 group-hover:hidden" />
        <span className="material-symbols-outlined text-4xl relative z-10 transition-transform duration-300">
          {isOpen ? "close" : "chat_bubble"}
        </span>
      </motion.button>
    </div>
  );
}
