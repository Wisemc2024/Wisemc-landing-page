"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const SOLUTIONS = [
  {
    icon: "edit_note",
    title: "Tư duy biên tập",
    description: "Nắm vững cấu trúc kịch bản và cách biến hóa ngôn từ.",
  },
  {
    icon: "mic",
    title: "Làm chủ sân khấu",
    description: "Kỹ thuật kiểm soát giọng nói, hình thể và năng lượng.",
  },
  {
    icon: "auto_stories",
    title: "Vốn từ phong phú",
    description: "Xóa bỏ nỗi lo bí từ nhờ sự chuẩn bị bài bản.",
  },
  {
    icon: "speed",
    title: "Rút ngắn thời gian",
    description: "Học hỏi kinh nghiệm thực chiến chỉ qua tài liệu.",
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Solutions() {
  return (
    <section id="solutions" className="py-24 px-6 bg-white overflow-hidden relative">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary-container/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto text-center mb-16 relative">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold mb-4 uppercase tracking-tight"
        >
          Wise MC giúp bạn điều gì?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-secondary max-w-2xl mx-auto leading-relaxed"
        >
          Chúng tôi cung cấp hệ sinh thái tài liệu thực chiến giúp bạn nâng tầm sự nghiệp MC một cách nhanh chóng.
        </motion.p>
      </div>
      
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {SOLUTIONS.map((solution) => (
          <motion.div 
            key={solution.title}
            variants={item}
            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
            className="p-8 rounded-2xl bg-white border border-outline-variant/10 shadow-sm text-center relative z-10 transition-all duration-300"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-container text-on-primary-fixed rounded-full mb-6 transform group-hover:rotate-12 transition-transform shadow-lg shadow-primary-container/20">
              <span className="material-symbols-outlined text-2xl">{solution.icon}</span>
            </div>
            <h3 className="font-bold mb-3 uppercase tracking-wide">{solution.title}</h3>
            <p className="text-sm text-secondary leading-relaxed">{solution.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
