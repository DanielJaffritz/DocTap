import Hero from "@/features/homepage/components/Hero";
import NavBar from "@/features/homepage/components/NavBar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-screen h-screen p-10 flex flex-col gap-10">
      <NavBar />
      <Hero />
    </main>
  );
}
