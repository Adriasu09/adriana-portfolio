"use client";

import { Terminal } from "./Terminal";
import { useTranslation } from "react-i18next";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="text-center mb-12 space-y-4">
        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-primary-color">
          {t("hero.title")}{" "}
          <span className="text-primary">{t("hero.titleAccent")}</span>
        </h2>
        <p className="text-lg text-secondary-color max-w-2xl mx-auto">
          {t("hero.subtitle")}
        </p>
      </div>

      <Terminal />

      <div className="mt-12 flex gap-4">
        <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/30 hover:-translate-y-1 transition-transform">
          {t("hero.viewProjects")}
        </button>
        <button className="bg-elevated border border-color px-8 py-3 rounded-xl font-bold hover:bg-subtle transition-all text-primary-color">
          {t("hero.downloadCV")}
        </button>
      </div>
    </section>
  );
}
