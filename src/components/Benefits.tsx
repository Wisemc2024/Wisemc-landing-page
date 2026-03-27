"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const BENEFITS = [
  {
    icon: "psychology",
    title: "Phương pháp tư duy",
    description: "Học hỏi cách MC chuyên nghiệp tìm kiếm chất liệu, biên tập lời dẫn sáng tạo và làm chủ nội dung.",
  },
  {
    icon: "auto_awesome",
    title: "Lời dẫn thông minh, thú vị",
    description: "Cung cấp các mẫu lời dẫn linh hoạt, hài hước và tinh tế, phù hợp với nhiều phong cách MC khác nhau.",
  },
  {
    icon: "schedule",
    title: "Tiết kiệm thời gian chuẩn bị",
    description: "Không còn mất cả ngày để biên tập lời dẫn. Chỉ cần ứng dụng và tỏa sáng ngay.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Benefits() {
  return (
    <section id="benefits" className="py-24 px-6 bg-surface relative">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold mb-4 uppercase tracking-tight"
        >
          Tại sao bạn nên sử dụng tài liệu Wise MC?
        </motion.h2>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "6rem" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="h-1.5 bg-primary-container mx-auto rounded-full"
        />
      </div>
      
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8"
      >
        {BENEFITS.map((benefit) => (
          <motion.div 
            key={benefit.title}
            variants={item}
            whileHover={{ y: -10 }}
            className="bg-surface-container-lowest p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary-container/10 group"
          >
            <div className="w-16 h-16 bg-primary-container/10 text-primary flex items-center justify-center rounded-2xl mb-8 group-hover:bg-primary-container group-hover:text-on-primary-fixed transition-colors duration-300">
              <span className="material-symbols-outlined text-4xl">{benefit.icon}</span>
            </div>
            <h3 className="text-xl font-bold mb-4 uppercase tracking-wide">{benefit.title}</h3>
            <p className="text-secondary leading-relaxed">{benefit.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
