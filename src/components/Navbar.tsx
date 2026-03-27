"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Tài liệu", href: "#pricing" },
  { name: "Lợi ích", href: "#benefits" },
  { name: "Giải pháp", href: "#solutions" },
  { name: "Bảng giá", href: "#pricing" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/80 backdrop-blur-xl shadow-sm py-3" 
          : "bg-transparent py-4"
      )}
    >
      <div className="flex justify-between items-center w-full px-6 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center">
          <img 
            alt="Wise MC Logo" 
            className="h-10 w-auto" 
            src="https://lh3.googleusercontent.com/aida/ADBb0uhlRJubTBpalnmi4eEMhN-fbHfqGUX2A1QdCHs79NxgcFbC8wy8JdsH5ATZWnPy3bjYjgGdVKvhlBPSLnmBuJERwX_z-nVgNh-4Wx9PtJmsaOCJTvWpMCwqwQR2_4wuyiIexTZ3Z5LKFewmo6W1Ac306JuCrjnzjpqlfH-H_9-HGmo4lUUrTZkG-MGhUNoYZYhTJ1iEwV8WuM7-kVoYuT5l_-zzHaxIBmNtu44masvn3U_5guMHEUdTGxXvMxFukiAM5646lSJY1X0"
          />
        </Link>
        
        <div className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={`${link.name}-${i}`}
              href={link.href}
              className={cn(
                "relative font-headline font-bold tracking-tight py-1 transition-colors",
                i === 0 
                  ? "text-primary border-b-2 border-primary-container" 
                  : "text-zinc-600 hover:text-zinc-900"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary-container text-on-primary-fixed font-bold px-6 py-2.5 rounded-full shadow-lg shadow-primary-container/20"
          >
            MUA NGAY
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}
