"use client";

import { useTranslation } from "react-i18next";
import { Section, SectionHeader, Card, Badge } from "@/components/ui";
import { Briefcase } from "lucide-react";
import { useExperience } from "@/hooks/useExperience";

export function Experience() {
  const { t } = useTranslation();
  const experiences = useExperience();

  return (
    <Section id="experience">
      <SectionHeader number="02" title={t("experience.title")} />

      {/* Timeline Container */}
      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-border-strong before:to-transparent">
        {" "}
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
          >
            {/* Timeline Dot */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-border-strong bg-base text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              {" "}
              <Briefcase className="w-5 h-5" />
            </div>

            {/* Card Content */}
            <Card
              variant="elevated"
              className="w-[calc(100%-4rem)] md:w-[45%] p-6"
            >
              {/* Header: Position & Period */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                <h3 className="text-xl font-bold text-primary-color">
                  {exp.position}
                </h3>
                <time className="font-mono text-xs text-primary font-bold">
                  {exp.period}
                </time>
              </div>

              {/* Company & Location */}
              <div className="flex flex-col gap-1 mb-4">
                <div className="text-accent text-sm font-mono font-bold">
                  @{exp.company}
                </div>
                <div className="text-tertiary-color text-xs">
                  {exp.location}
                </div>
              </div>

              {/* Description */}
              <p className="text-secondary-color text-sm mb-4 leading-relaxed">
                {exp.description}
              </p>

              {/* Achievements */}
              {exp.achievements && exp.achievements.length > 0 && (
                <ul className="text-sm text-secondary-color space-y-2 mb-4">
                  {exp.achievements.slice(0, 3).map((achievement, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-primary mt-1">▹</span>
                      <span className="flex-1">{achievement}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Technologies */}
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <Badge key={tech} variant="primary" size="sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}
            </Card>
          </div>
        ))}
      </div>
    </Section>
  );
}
