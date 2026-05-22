import Container from "@/components/layout/Container";
import HeroSearchCard from "./HeroSearchCard";
import HeroSearchCardV2 from "./HeroSearchCardV2";
import VideoBackground from "./VideoBackground";

const DEFAULT_HERO_VIDEO = "/assets/video/website.webm";

interface HeroProps {
  videoSrc?: string;
}

const Hero: React.FC<HeroProps> = ({
  videoSrc = DEFAULT_HERO_VIDEO,
}) => {
  return (
    <section
      className="relative min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)]"
      aria-labelledby="hero-title"
    >
      <VideoBackground videoSrc={videoSrc} />

      {/* Content */}
      <div
        className="relative z-10 flex min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] flex-col justify-center pt-16 md:pt-20 pb-12 md:pb-16"
      >
        <Container>
          <header className="text-center md:text-left max-w-2xl mb-6 md:mb-8">
            <h1
              id="hero-title"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight tracking-tight"
            >
              Find Your Dream Property <br /> in Dubai
            </h1>
            <p className="mt-3 md:mt-4 text-base md:text-lg text-white/85 max-w-xl">
              Luxury villas, penthouses, apartments, and more. Explore
              properties you can buy or invest in across Dubai.
            </p>
          </header>

          {/* <HeroSearchCard /> */}
          <HeroSearchCardV2 />
        </Container>
      </div>
    </section>
  );
};

export default Hero;