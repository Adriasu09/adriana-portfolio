import { Header } from "@/components/layout/Header";
import { About } from "@/components/sections/About/About";
import { Experience } from "@/components/sections/Experience/Experience";
import { Hero } from "@/components/sections/Hero/Hero";
import { Skills } from "@/components/sections/Skills/Skills";

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-base">
        <Hero />
        <About />
        <Experience />
        <Skills />
      </main>
    </>
  );
}
