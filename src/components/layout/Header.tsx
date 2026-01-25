"use client";

import { SITE_CONFIG } from "@/lib/constants";
import { Terminal } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { useState, useEffect } from "react";
import { LanguageToggle } from './LanguageToggle'

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-primary rounded-lg text-white transition-transform group-hover:scale-110">
            <Terminal className="w-5 h-5" />
          </div>
          <h1 className="font-mono text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            NANA
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {SITE_CONFIG.nav.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            >
              <span className="text-primary font-mono text-xs mr-1">
                0{index + 1}.
              </span>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right section */}
        <div className="flex items-center gap-4">
          <LanguageToggle />
          <ThemeToggle />
          <button className="hidden lg:block bg-primary px-5 py-2 rounded-lg text-sm font-bold uppercase tracking-wider text-white hover:shadow-lg hover:shadow-primary/30 transition-all">
            Resume
          </button>
        </div>
      </div>
    </header>
  );
}
