import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { I18nProvider } from "@/components/providers/I18nProvider";
import { About } from "@/components/sections/About/About";
import { Contact } from "@/components/sections/Contact/Contact";
import { Experience } from "@/components/sections/Experience/Experience";
import { Hero } from "@/components/sections/Hero/Hero";
import { Projects } from "@/components/sections/Projects/Projects";
import { Skills } from "@/components/sections/Skills/Skills";
import { createTranslator, getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, isLocale } from "@/i18n/locales";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(
    isLocale(locale) ? locale : defaultLocale,
  );
  const t = createTranslator(dictionary);

  return (
    <>
      <I18nProvider>
        <Header />
        <main className="bg-base">
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Contact />
        </main>
      </I18nProvider>
      <Footer t={t} />
    </>
  );
}
