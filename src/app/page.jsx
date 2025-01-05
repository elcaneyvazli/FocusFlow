import dynamic from "next/dynamic";
const Navbar = dynamic(
  () => import("@/ui/module/components/LandingPage/Navbar/Navbar"),
  {
    loading: () => <p>loading...</p>,
  }
);
const HeroSection = dynamic(
  () => import("@/ui/module/components/LandingPage/HeroSection/HeroSection"),
  {
    loading: () => <p>loading...</p>,
  }
);
const About = dynamic(
  () => import("@/ui/module/components/LandingPage/About/About"),
  {
    loading: () => <p>loading...</p>,
  }
);
const Features = dynamic(
  () => import("@/ui/module/components/LandingPage/Features/Features"),
  {
    loading: () => <p>loading...</p>,
  }
);
const Footer = dynamic(
  () => import("@/ui/module/components/LandingPage/Footer/Footer"),
  {
    loading: () => <p>loading...</p>,
  }
);

export default function Home() {
  return (
    <div
      className="flex flex-col gap-24"
      style={{
        perspective: "1000px",
      }}
    >
      <div
        className="flex flex-col gap-24 px-32 pt-16"
        style={{
          perspective: "1000px",
        }}
      >
        <Navbar />
        <HeroSection />
        <About />
        <Features />
      </div>
      <Footer />
    </div>
  );
}
