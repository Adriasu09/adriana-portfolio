"use client";

import { useState, useEffect, useRef } from "react";
import { Globe, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const languages = [
  { code: "en", name: "English", flagCode: "gb" },
  { code: "es", name: "Español", flagCode: "es" },
] as const;

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (locale: string) => {
    i18n.changeLanguage(locale);
    setIsOpen(false);
  };

  const currentLang =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer p-2 rounded-lg bg-elevated border border-color hover:bg-subtle transition-colors flex items-center gap-2"
        aria-label={`Select language (current: ${currentLang.name})`}
        title={currentLang.name}
      >
        <Globe className="w-5 h-5 text-primary-color" />
        <span className="text-xs font-mono uppercase text-primary-color font-bold">
          {currentLang.code}
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-lg bg-elevated border border-color shadow-xl z-50 overflow-hidden">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={cn(
                "cursor-pointer w-full px-4 py-3 flex items-center justify-between hover:bg-subtle transition-colors text-left",
                i18n.language === lang.code && "bg-subtle",
              )}
              aria-label={`Switch to ${lang.name}`}
            >
              <div className="flex items-center gap-3">
                {/* Flag Icon */}
                <div className="flex h-5 w-5 items-center justify-center overflow-hidden rounded-full">
                  <span
                    className={`fi fi-${lang.flagCode}`}
                    style={{
                      width: "20px",
                      height: "20px",
                      transform: "scale(1.3)",
                    }}
                    role="img"
                    aria-label={`${lang.name} flag`}
                  />
                </div>
                <span className="text-sm font-medium text-primary-color">
                  {lang.name}
                </span>
              </div>
              {i18n.language === lang.code && (
                <Check className="w-4 h-4 text-primary" aria-hidden="true" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
