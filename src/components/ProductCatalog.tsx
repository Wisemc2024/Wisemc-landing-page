"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const PRODUCTS = [
  {
    icon: "corporate_fare",
    title: "Kịch bản sự kiện doanh nghiệp",
    description: "Kịch bản chi tiết cho khai trương, kỷ niệm thành lập, hội nghị khách hàng chuyên nghiệp.",
    price: "199.000đ",
  },
  {
    icon: "favorite",
    title: "Kịch bản MC tiệc cưới",
    description: "Mẫu lời dẫn lãng mạn, sâu sắc và tinh tế cho ngày trọng đại của các cặp đôi.",
    price: "199.000đ",
  },
  {
    icon: "celebration",
    title: "Bộ 100 lời dẫn văn nghệ",
    description: "Các mẫu câu dẫn kết nối tiết mục văn nghệ thú vị, cuốn hút khán giả từ đầu đến cuối.",
    price: "199.000đ",
  },
  {
    icon: "military_tech",
    title: "Cẩm nang dẫn vinh danh",
    description: "Nghi thức và lời dẫn trang trọng cho các buổi lễ trao giải, vinh danh cá nhân và tập thể.",
    price: "199.000đ",
  },
  {
    icon: "book",
    title: "Cẩm nang MC sự kiện",
    description: "Tất tần tật kỹ năng xử lý tình huống và bí quyết kiểm soát sân khấu thực chiến.",
    price: "199.000đ",
  },
  {
    icon: "church",
    title: "100 lời dẫn Công giáo",
    description: "Lời dẫn chuyên biệt cho các chương trình văn nghệ, thánh lễ và sự kiện Công giáo.",
    price: "199.000đ",
  },
];

export default function ProductCatalog() {
  return (
    <section id="pricing" className="py-24 px-6 bg-surface-container-low min-h-screen relative overflow-hidden">
      <div className="absolute top-[-50px] right-[-50px] w-96 h-96 bg-primary-container/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-50px] left-[-50px] w-96 h-96 bg-primary-container/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto text-center mb-20 relative pointer-events-none">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold mb-6 uppercase tracking-tight"
        >
          Chọn tài liệu bạn cần
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-secondary text-lg md:text-xl mb-6 max-w-2xl mx-auto leading-relaxed"
        >
          Thanh toán một lần – sở hữu trọn đời – áp dụng ngay vào thực tế
        </motion.p>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.5 }}
          className="inline-block px-10 py-3 bg-primary-container text-on-primary-fixed rounded-full font-black text-2xl md:text-3xl mt-4 shadow-xl shadow-primary-container/30 border-2 border-white pointer-events-auto"
        >
          199.000đ / TÀI LIỆU
        </motion.div>
      </div>
      
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRODUCTS.map((product, i) => (
          <motion.div 
            key={product.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            whileHover={{ y: -12, scale: 1.02 }}
            className="bg-surface-container-lowest rounded-[2rem] p-10 flex flex-col shadow-sm hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-primary-container/30 group"
          >
            <div className="mb-8 p-4 bg-primary-container/5 rounded-2xl inline-flex items-center justify-center w-fit group-hover:bg-primary-container group-hover:text-on-primary-fixed transition-colors duration-300 shadow-sm">
                <span className="material-symbols-outlined text-4xl text-primary group-hover:text-inherit transition-colors">{product.icon}</span>
            </div>
            
            <h3 className="text-xl md:text-2xl font-bold mb-4 uppercase tracking-wide leading-tight group-hover:text-primary transition-colors">
                {product.title}
            </h3>
            <p className="text-secondary text-sm md:text-base mb-10 flex-grow leading-relaxed">
                {product.description}
            </p>
            
            <div className="flex items-center justify-between mt-auto pt-8 border-t border-zinc-100/80">
              <span className="font-extrabold text-2xl tracking-tighter">{product.price}</span>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-primary-container text-on-primary-fixed px-8 py-3 rounded-full font-bold text-sm hover:shadow-lg transition-shadow uppercase tracking-wider"
              >
                MUA NGAY
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
