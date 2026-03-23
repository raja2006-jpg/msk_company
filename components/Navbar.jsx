"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BrandLockup from "@/components/BrandLockup";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileOpen(false);

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-400 ${
          isScrolled
            ? "bg-white/65 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.06)] backdrop-blur-[10px]"
            : "bg-white/60 py-4 backdrop-blur-[10px]"
        }`}
      style={{ "padding": "10px 10px"}}>
        <div className="container-custom flex items-center justify-between px-4 md:px-0 lg:px-6">
          <BrandLockup href="/" size="sm" priority />

          {/* Center Links (Trendy Threads style) */}
          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-[15px] font-semibold tracking-wide transition-colors duration-200 ${
                    isActive
                      ? "text-[var(--primary)] drop-shadow-sm"
                      : "text-[var(--text-secondary)] hover:text-[var(--primary)]"
                  }`}
                >
                  {link.label}
                  {isActive ? (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-[var(--primary)]"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  ) : null}
                </Link>
              );
            })}
          </div>

          {/* Right CTA Button */}
          <div className="hidden items-center md:flex">
            <Link
              href="/contact"
              className="group flex items-center gap-2 rounded-[10px] bg-[var(--primary)] px-6 py-2.5 text-[15px] font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--primary-dark)] hover:shadow-lg"
            style={{width: "auto", height: "auto","padding":'10px 10px'}}>
              <MessageCircle size={18} strokeWidth={2.5} />
              Contact Us
            </Link>
          </div>

          <button
            onClick={() => setIsMobileOpen((open) => !open)}
            className="inline-flex  p-2.5 text-[var(--primary)] transition-colors  md:hidden"
            aria-label="Toggle menu"
           
           >
            {isMobileOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed right-4 top-[76px] z-50 w-[180px] md:hidden"
            style={{ transformOrigin: "top right" }}
          >
            <div className="overflow-hidden rounded-[16px] border border-[#f0e6d2] bg-[#fdf8f0]/20 p-2 shadow-[0_8px_30px_rgba(138,33,50,0.12)] backdrop-blur-md">
              <div className="flex flex-col">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMobileMenu}
                      className="group flex w-full items-center justify-between rounded-lg px-4 py-3 text-[15px] transition-colors hover:bg-[var(--primary)]/10"
                      style={{ color: "var(--primary)","padding":"10px 10px","fontWeight":"800" }}
                    >
                      <span className="font-bold tracking-wide">{link.label}</span>
                      <span className="text-[15px] opacity-100 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                        ↗ 
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
