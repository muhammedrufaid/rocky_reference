import Hero from "@/components/home/Hero";
import Header from "@/components/layout/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      {/* Spacer so floating search card overlaps into white content area */}
      {/* <div className="h-24 md:h-32 lg:h-40 bg-white" aria-hidden="true" /> */}
    </div>
  );
}
