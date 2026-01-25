"use client";

import { useEffect, useState, useRef } from "react";
import { I18nextProvider } from "react-i18next";
import i18n, { i18nConfig } from "@/i18n/config";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const initStarted = useRef(false);

  useEffect(() => {
    if (initStarted.current) return;
    initStarted.current = true;

    const initI18n = async () => {
      if (!i18n.isInitialized) {
        await i18n.init(i18nConfig);
      }
      setIsInitialized(true);
    };

    initI18n();
  }, []);

  if (!isInitialized) {
    return null;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
