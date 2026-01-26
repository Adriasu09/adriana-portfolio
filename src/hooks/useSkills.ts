import { useTranslation } from "react-i18next";
import { skills, getCategoryName, getSkillsByCategory } from "@/data/skills";

export function useSkills() {
  const { t } = useTranslation();

  return {
    skills,
    byCategory: getSkillsByCategory(),
    getCategoryName: (category: string) => getCategoryName(category, t),
  };
}
