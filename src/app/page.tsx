import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-base">
        <Hero />
      </main>
    </>
  );
}
