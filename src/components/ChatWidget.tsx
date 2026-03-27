"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Chào bạn! Tôi là trợ lý ảo của Wise MC. Tôi có thể giúp gì cho bạn hôm nay?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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
      setMessages((prev) => [...prev, { role: "assistant", content: "Xin lỗi, đã có lỗi xảy ra. Hãy thử lại sau nhé!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-body">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-80 md:w-96 bg-white rounded-3xl shadow-2xl overflow-hidden border border-zinc-100 flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="bg-primary-container p-4 text-on-primary-fixed flex justify-between items-center shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                  <span className="material-symbols-outlined text-xl">smart_toy</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm">Wise MC AI Assistant</h4>
                  <div className="flex items-center gap-1.5 leading-none mt-0.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] opacity-80 uppercase tracking-wider font-bold">Trực tuyến</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="hover:bg-white/10 p-1.5 rounded-full transition-colors"
                title="Đóng chat"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-4 bg-zinc-50/50">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex flex-col max-w-[85%]",
                    msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div
                    className={cn(
                      "px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm",
                      msg.role === "user" 
                        ? "bg-primary-container text-on-primary-fixed rounded-tr-none font-medium" 
                        : "bg-white text-zinc-800 rounded-tl-none border border-zinc-100"
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2 items-center text-zinc-400 p-2">
                  <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-zinc-100 bg-white shadow-inner">
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Nhập câu hỏi của bạn..."
                  className="flex-grow bg-zinc-100/80 border-none rounded-full px-5 py-2.5 text-sm focus:ring-2 focus:ring-primary-container/30 outline-none transition-all placeholder:text-zinc-400"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSend}
                  className="bg-primary-container text-on-primary-fixed p-2.5 rounded-full shadow-lg shadow-primary-container/20 flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-xl">send</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-300",
          isOpen ? "bg-zinc-800 rotate-90" : "bg-primary-container text-on-primary-fixed"
        )}
      >
        <span className="material-symbols-outlined text-3xl">
          {isOpen ? "close" : "chat_bubble"}
        </span>
      </motion.button>
    </div>
  );
}
