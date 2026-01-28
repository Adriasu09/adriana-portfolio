"use client";

import { useTranslation } from "react-i18next";
import { Section, SectionHeader } from "@/components/ui";
import { useProjects } from "@/hooks/useProjects";
import { Project } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  const { t } = useTranslation();
  const { all: projects } = useProjects();

  return (
    <Section id="projects">
      <SectionHeader number="04" title={t("projects.title")} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {projects.map((project: Project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}
