import Image from "next/image";
import { Badge } from "@/components/ui";
import { ExternalLink, Github } from "lucide-react";
import { Project } from "@/data/projects";
import { useTranslation } from "react-i18next";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useTranslation();
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-color bg-elevated hover:border-primary/50 transition-all flex flex-col">
      {project.image && (
        <div className="relative w-full h-48 md:h-64 shrink-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="flex flex-col flex-1 p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech: string) => (
            <Badge key={tech} variant="primary" size="sm">
              {tech}
            </Badge>
          ))}
        </div>

        <h3 className="font-bold text-primary-color text-xl mb-3">
          {project.title}
        </h3>

        <p className="text-secondary-color text-sm mb-6 flex-1">
          {project.description}
        </p>

        <div className="flex gap-3 mt-auto">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-subtle rounded-lg hover:bg-primary hover:text-white transition-all text-sm font-medium"
              aria-label="View on GitHub"
            >
              <Github className="w-4 h-4" />
              {t("projects.buttons.viewRepo")}
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all text-sm font-medium"
              aria-label="View live demo"
            >
              <ExternalLink className="w-4 h-4" />
              {t("projects.buttons.viewLive")}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
