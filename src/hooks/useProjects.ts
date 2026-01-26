import { useTranslation } from "react-i18next";
import {
  getProjectsWithTranslations,
  getFeaturedProjects,
} from "@/data/projects";

export function useProjects() {
  const { t } = useTranslation();

  return {
    all: getProjectsWithTranslations(t),
    featured: getFeaturedProjects(t),
  };
}
