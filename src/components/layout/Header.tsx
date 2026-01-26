"use client";

import { Terminal } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { useState, useEffect } from "react";
import { LanguageToggle } from "./LanguageToggle";
import { useTranslation } from "react-i18next";

export function Header() {
  const { t } = useTranslation();
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

  const navItems = [
    { key: "about", href: "#about" },
    { key: "experience", href: "#experience" },
    { key: "skills", href: "#skills" },
    { key: "projects", href: "#projects" },
    { key: "contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-elevated/80 backdrop-blur-md border-b border-color"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-primary rounded-lg text-white transition-transform group-hover:scale-110">
            <Terminal className="w-5 h-5" />
          </div>
          <h1 className="font-mono text-xl font-bold tracking-tight text-primary-color">
            NANA
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-sm font-medium text-secondary-color hover:text-primary transition-colors"
            >
              <span className="text-primary font-mono text-xs mr-1">
                0{index + 1}.
              </span>
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        {/* Right section */}
        <div className="flex items-center gap-4">
          <LanguageToggle />
          <ThemeToggle />
          <button className="hidden lg:block bg-primary px-5 py-2 rounded-lg text-sm font-bold uppercase tracking-wider text-white hover:shadow-lg hover:shadow-primary/30 transition-all">
            {t("nav.resume")}
          </button>
        </div>
      </div>
    </header>
  );
}
