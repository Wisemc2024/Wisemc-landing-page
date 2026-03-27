"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Hero() {
  return (
    <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden min-h-[90vh] flex items-center">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary-container/10 via-transparent to-transparent"></div>
      
      {/* Decorative patterns or shapes could be added here */}
      <div className="absolute top-20 right-[-10%] w-[40%] h-[60%] bg-primary-container/10 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true }}
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary-container/20 text-primary font-semibold text-sm mb-6 uppercase tracking-wider"
          >
            The Digital Curator
          </motion.span>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-on-surface leading-[1.1] tracking-tight mb-6 uppercase">
            KHO TÀI LIỆU <br /> 
            <span className="text-primary-container drop-shadow-sm">MC THỰC CHIẾN</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-secondary mb-10 max-w-lg leading-relaxed">
            Nâng cấp tư duy dẫn thú vị, thông minh và chuyên nghiệp hơn mỗi ngày.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-container text-on-primary-fixed px-10 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-primary-container/30 transition-shadow shadow-lg shadow-primary-container/20"
            >
              XEM TÀI LIỆU
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "rgb(245, 243, 243)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-surface-container-lowest border border-outline-variant/30 text-on-surface px-10 py-4 rounded-full font-bold text-lg transition-colors"
            >
              MUA NGAY
            </motion.button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 3 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl hover:rotate-0 transition-transform duration-500 border-8 border-white">
            <img 
              alt="MC Professional" 
              className="w-full h-[500px] object-cover" 
              src="https://i.pinimg.com/736x/66/70/d5/6670d591f1d4aa6378a5f4f8f35a7628.jpg" 
            />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl max-w-[240px] border border-primary-container/10"
          >
            <div className="flex items-center gap-2 mb-2 text-primary">
              <span className="material-symbols-outlined fill" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="font-bold">CHỌN WISE, CHỌN WOW</span>
            </div>
            <p className="text-sm text-secondary italic leading-relaxed">
              "Sao MC này dẫn dắt thông minh, sáng tạo, thú vị thế nhỉ"
            </p>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}
