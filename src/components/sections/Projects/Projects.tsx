"use client";

import { useTranslation } from "react-i18next";
import { Section, SectionHeader, Badge } from "@/components/ui";
import { ExternalLink, Github } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import Image from "next/image";
import { Project } from "@/data/projects";

export function Projects() {
  const { t } = useTranslation();
  const { all: projects } = useProjects();

  return (
    <Section id="projects">
      <SectionHeader number="04" title={t("projects.title")} />

      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-200">
        {projects.map((project: Project, index: number) => {
          const isLarge = index === 0;

          return (
            <div
              key={project.id}
              className={`group relative overflow-hidden rounded-2xl border border-color bg-elevated hover:border-primary/50 transition-all ${
                isLarge ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              {project.image && (
                <div className="absolute inset-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
              )}

              <div className="absolute inset-0 bg-linear-to-t from-base via-base/80 to-transparent" />

              <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies
                    .slice(0, isLarge ? 5 : 3)
                    .map((tech: string) => (
                      <Badge key={tech} variant="primary" size="sm">
                        {tech}
                      </Badge>
                    ))}
                  {!isLarge && project.technologies.length > 3 && (
                    <Badge variant="outline" size="sm">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>

                <h3
                  className={`font-bold text-primary-color mb-2 ${
                    isLarge ? "text-3xl" : "text-xl"
                  }`}
                >
                  {project.title}
                </h3>

                <p
                  className={`text-secondary-color mb-6 ${
                    isLarge ? "text-lg max-w-xl" : "text-sm"
                  }`}
                >
                  {isLarge ? project.longDescription : project.description}
                </p>

                <div className="flex gap-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-elevated/50 backdrop-blur-sm rounded-full hover:bg-primary hover:text-white transition-all"
                      aria-label="View on GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-elevated/50 backdrop-blur-sm rounded-full hover:bg-primary hover:text-white transition-all"
                      aria-label="View live demo"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
