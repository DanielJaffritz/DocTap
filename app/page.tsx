import Footer from "@/features/homepage/components/Footer";
import Hero from "@/features/homepage/components/Hero";
import NavBar from "@/features/homepage/components/NavBar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col gap-10 bg-linear-to-t from-background via-background_secondary to-border">
      <NavBar />
      <Hero />
      <Footer />
    </main>
  );
}
