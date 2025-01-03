import dynamic from "next/dynamic";
const Navbar = dynamic(
  () => import("@/ui/module/components/LandingPage/Navbar"),
  {
    loading: () => <p>loading...</p>,
  }
);
const HeroSection = dynamic(
  () => import("@/ui/module/components/LandingPage/HeroSection"),
  {
    loading: () => <p>loading...</p>,
  }
);

export default function Home() {
  return (
    <div
      className="flex flex-col gap-24 px-32 py-16"
      style={{
        perspective: "1000px",
      }}
    >
      <Navbar />
      <HeroSection />
      
    </div>
  );
}
