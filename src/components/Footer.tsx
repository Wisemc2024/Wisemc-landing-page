"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const FOOTER_LINKS = {
  contacts: [
    { label: "Hotline: 0967 279 850", href: "tel:0967279850", icon: "call" },
    { label: "Hocviendaotaowisemc@gmail.com", href: "mailto:Hocviendaotaowisemc@gmail.com", icon: "mail" },
    { label: "Hà Nội, Việt Nam", href: "#", icon: "location_on" },
  ],
  links: [
    { label: "Điều khoản", href: "#" },
    { label: "Bảo mật", href: "#" },
    { label: "Liên hệ", href: "#" },
    { label: "Tài liệu mới", href: "#" },
    { label: "Về Wise MC", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="w-full py-20 px-6 bg-zinc-100 dark:bg-zinc-950 border-t border-zinc-200/50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 items-start mb-20">
        <div className="flex flex-col gap-8 md:col-span-2">
          <Link href="/">
            <img 
              alt="Wise MC Logo" 
              className="h-14 w-auto self-start" 
              src="https://lh3.googleusercontent.com/aida/ADBb0uhlRJubTBpalnmi4eEMhN-fbHfqGUX2A1QdCHs79NxgcFbC8wy8JdsH5ATZWnPy3bjYjgGdVKvhlBPSLnmBuJERwX_z-nVgNh-4Wx9PtJmsaOCJTvWpMCwqwQR2_4wuyiIexTZ3Z5LKFewmo6W1Ac306JuCrjnzjpqlfH-H_9-HGmo4lUUrTZkG-MGhUNoYZYhTJ1iEwV8WuM7-kVoYuT5l_-zzHaxIBmNtu44masvn3U_5guMHEUdTGxXvMxFukiAM5646lSJY1X0"
            />
          </Link>
          <div className="max-w-md">
            <h5 className="font-headline font-extrabold text-xl mb-4 text-zinc-900 uppercase tracking-tight">The Digital Curator</h5>
            <p className="text-zinc-500 dark:text-zinc-400 font-body leading-relaxed">
              Hành trình trở thành MC chuyên nghiệp bắt đầu từ đây
            </p>
          </div>
          
          <div className="flex gap-4">
            {/* Social Icons could go here */}
            {["facebook", "youtube", "instagram"].map(social => (
              <motion.a
                key={social}
                href="#"
                whileHover={{ y: -5, scale: 1.1 }}
                className="w-10 h-10 bg-white shadow-sm border border-zinc-200 rounded-full flex items-center justify-center hover:bg-primary-container transition-colors"
                title={social}
              >
                <img src={`/icons/${social}.svg`} alt={social} className="w-5 h-5 opacity-50 contrast-125" />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest text-sm mb-2 border-b-2 border-primary-container w-fit pb-1">Liên hệ</h4>
          <div className="flex flex-col gap-5">
            {FOOTER_LINKS.contacts.map(item => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400 hover:text-primary transition-colors text-sm group"
              >
                <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 md:items-start lg:items-end">
          <div className="md:items-start lg:items-end flex flex-col gap-6">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest text-sm mb-2 border-b-2 border-primary-container w-fit pb-1">Khám phá</h4>
            <div className="flex flex-col gap-4 md:items-start lg:items-end">
              {FOOTER_LINKS.links.map(link => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-zinc-500 hover:text-primary transition-colors text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-10 border-t border-zinc-200/50 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-sm text-zinc-400 font-body">
          &copy; {new Date().getFullYear()} <span className="font-bold text-zinc-600">Wise MC Academy</span>. All rights reserved.
        </div>
        <div className="flex gap-8 text-xs text-zinc-400 font-medium">
          <Link href="#" className="hover:text-primary">Support</Link>
          <Link href="#" className="hover:text-primary">Policy</Link>
          <Link href="#" className="hover:text-primary">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
