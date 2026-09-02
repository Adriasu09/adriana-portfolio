import type { Locale } from "./locales";

const dictionaries = {
  es: () => import("./locales/es.json").then((module) => module.default),
  en: () => import("./locales/en.json").then((module) => module.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)[Locale]>>;

export type Translator = (key: string) => string;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}

export function createTranslator(dictionary: Dictionary): Translator {
  return (key) => {
    const value = key.split(".").reduce<unknown>((current, segment) => {
      if (typeof current !== "object" || current === null) return undefined;
      return (current as Record<string, unknown>)[segment];
    }, dictionary);

    return typeof value === "string" ? value : key;
  };
}