"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function FinalCTA() {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-on-surface">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 right-[-10%] -translate-y-1/2 w-[600px] h-[600px] bg-primary-container/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-10 uppercase tracking-tight leading-[1.1]"
        >
          Bắt đầu hành trình <br /> 
          <span className="text-primary-container">trở thành MC chuyên nghiệp</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-zinc-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Tự tin cầm mic và tạo thu nhập từ chính giọng nói của bạn ngay hôm nay. 
          Cùng Wise MC kiến tạo tương lai rạng rỡ.
        </motion.p>
        
        <motion.button 
          whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
          whileTap={{ scale: 0.95 }}
          className="group relative bg-primary-container text-on-primary-fixed px-14 py-6 rounded-full font-bold text-xl md:text-2xl hover:shadow-2xl hover:shadow-primary-container/50 transition-all duration-300 uppercase tracking-[0.2em] overflow-hidden"
        >
          <span className="relative z-10">MUA TÀI LIỆU NGAY</span>
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            whileHover={{ opacity: 0.1, x: 200 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-white"
          />
        </motion.button>
      </div>
    </section>
  );
}
