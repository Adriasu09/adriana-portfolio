"use client";

import { useTranslation } from "react-i18next";
import { Section, SectionHeader, Card } from "@/components/ui";
import { Code, Database, Wrench } from "lucide-react";
import { useSkills } from "@/hooks/useSkills";

const categoryIcons = {
  frontend: Code,
  backend: Database,
  tools: Wrench,
};

export function Skills() {
  const { t } = useTranslation();
  const { byCategory, getCategoryName } = useSkills();

  const categories = [
    { key: "frontend" as const, skills: byCategory.frontend },
    { key: "backend" as const, skills: byCategory.backend },
    { key: "tools" as const, skills: byCategory.tools },
  ];

  return (
    <Section id="skills">
      <SectionHeader number="03" title={t("skills.title")} />

      {/* Grid de categorías */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(({ key, skills }) => {
          const Icon = categoryIcons[key];

          return (
            <Card key={key} variant="elevated" className="p-6 md:p-8 space-y-6">
              {/* Header de la card */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/20 text-primary">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-primary-color uppercase tracking-wider">
                  {getCategoryName(key)}
                </h3>
              </div>

              {/* Lista de skills */}
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    {/* Nombre y porcentaje */}
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-secondary-color font-medium">
                        {skill.name}
                      </span>
                      <span className="text-accent font-bold">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
