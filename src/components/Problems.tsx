"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const PROBLEMS = [
  {
    title: "Không biết viết kịch bản",
    description: "Lúng túng không biết bắt đầu từ đâu, sắp xếp ý tưởng như thế nào cho chuyên nghiệp.",
  },
  {
    title: "Bí lời",
    description: "Đứng trên sân khấu nhưng đầu óc trống rỗng, không tìm được từ ngữ phù hợp để dẫn dắt.",
  },
  {
    title: "Thiếu tự tin",
    description: "Lo lắng, run rẩy vì chưa có sự chuẩn bị kỹ càng về nội dung dẫn.",
  },
  {
    title: "Thiếu tính chuyên nghiệp",
    description: "Lời dẫn rời rạc, không tạo được ấn tượng và sự tin cậy với khách hàng.",
  },
];

export default function Problems() {
  return (
    <section className="py-24 px-6 bg-surface-container-low">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8 uppercase tracking-tight leading-tight">
            Bạn có đang gặp những vấn đề này?
          </h2>
          <div className="space-y-8">
            {PROBLEMS.map((problem, i) => (
              <motion.div 
                key={problem.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex gap-4 items-start group"
              >
                <div className="mt-1 text-red-500 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>cancel</span>
                </div>
                <div>
                  <p className="font-bold text-lg mb-1 group-hover:text-red-500 transition-colors">{problem.title}</p>
                  <p className="text-secondary leading-relaxed">{problem.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring" }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden bg-primary-container/5 p-12 flex flex-col items-center justify-center border border-primary-container/20 group"
        >
          <motion.span 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="material-symbols-outlined text-9xl text-primary-container mb-6 opacity-30 select-none"
          >
            sentiment_dissatisfied
          </motion.span>
          <p className="text-center text-xl italic font-medium text-secondary transform group-hover:scale-105 transition-transform">
            "Đừng để những rào cản này ngăn bạn trở thành một MC xuất sắc."
          </p>
          
          {/* Subtle noise pattern or decorative elements could go here */}
        </motion.div>
      </div>
    </section>
  );
}
