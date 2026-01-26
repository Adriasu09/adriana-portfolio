"use client";

import { useTranslation } from "react-i18next";
import Image from "next/image";

export function About() {
  const { t } = useTranslation();

  const stats = [
    {
      value: t("about.stats.experience.value"),
      label: t("about.stats.experience.label"),
    },
    {
      value: t("about.stats.projects.value"),
      label: t("about.stats.projects.label"),
    },
    {
      value: t("about.stats.technologies.value"),
      label: t("about.stats.technologies.label"),
    },
  ];

  return (
    <section
      id="about"
      className="py-12 md:py-24 px-6 max-w-7xl mx-auto scroll-mt-16"
    >
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-8 md:mb-16">
        <span className="font-mono text-primary text-xl">01.</span>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-primary-color uppercase">
          {t("about.title")}
        </h2>
        <div className="h-px flex-1 bg-border"></div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left: Text Content */}
        <div className="space-y-4 md:space-y-6">
          <p className="text-secondary-color text-base md:text-lg leading-relaxed">
            {t("about.description")}
          </p>

          <blockquote className="border-l-4 border-primary pl-4 md:pl-6 py-2">
            <p className="text-primary-color font-bold text-xl italic">
              &quot;{t("about.tagline")}&quot;
            </p>
          </blockquote>

          {/* Stats Row */}
          <div className="flex gap-4 md:gap-6 pt-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-1 md:gap-2"
              >
                <span className="text-3xl md:text-4xl font-black text-primary">
                  {stat.value}
                </span>
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-tertiary-color text-center leading-tight">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Photo with Frame */}
        <div className="relative group mx-auto lg:ml-auto mt-8 lg:mt-0">
          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-primary/20 rounded-2xl blur-2xl group-hover:bg-primary/30 transition-all"></div>

          {/* Photo Container */}
          <div className="relative w-56 h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-2xl border-2 border-primary overflow-hidden z-10">
            <Image
              src="/images/avatar.jpg"
              alt="Adriana Suárez"
              fill
              className="object-cover lg:grayscale lg:hover:grayscale-0 transition-all duration-500"
              priority
            />
          </div>

          {/* Decorative Border */}
          <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-24 h-24 md:w-32 md:h-32 border-b-2 border-r-2 border-accent rounded-br-2xl"></div>
        </div>
      </div>
    </section>
  );
}
