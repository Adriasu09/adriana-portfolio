import { Header } from "@/components/layout/Header";
import { About } from "@/components/sections/About/About";
import { Hero } from "@/components/sections/Hero/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-base">
        <Hero />
        <About />
      </main>
    </>
  );
}
