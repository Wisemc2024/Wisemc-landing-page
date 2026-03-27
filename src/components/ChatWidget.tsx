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

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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
      if (data.role === "assistant" || data.content) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
      }
    } catch (error) {
      console.error("Chat error:", error);
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
