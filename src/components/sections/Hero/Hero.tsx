"use client";

import { Terminal } from "./Terminal";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { Download, Rocket } from "lucide-react";

export function Hero() {
  const { t } = useTranslation();

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/cv/CV_Adriana_Suarez_2026.pdf";
    link.download = "CV_Adriana_Suarez.pdf";
    link.click();
  };

  const handleScrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

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

      <div className="mt-12 flex flex-wrap gap-4 justify-center">
        <Button
          variant="primary"
          size="lg"
          onClick={handleScrollToProjects}
          className="group"
        >
          <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          {t("hero.viewProjects")}
        </Button>
        <Button variant="secondary" size="lg" onClick={handleDownloadCV}>
          <Download className="w-5 h-5" />
          {t("hero.downloadCV")}
        </Button>
      </div>
    </section>
  );
}
