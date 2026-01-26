import { useTranslation } from "react-i18next";
import { getExperiencesWithTranslations } from "@/data/experience";

export function useExperience() {
  const { t } = useTranslation();
  return getExperiencesWithTranslations(t);
}
