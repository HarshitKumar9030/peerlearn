import { Hero } from "@/components/home/Hero";
import Image from "next/image";
import { PoweredBySection } from "@/components/home/PoweredBy";
import { TrailerComponent } from "@/components/home/Trailer";
import { ShowcaseContainer } from "@/components/home/ShowCaseContainer";
import { FeaturesSection } from "@/components/home/Features"

export default function Home() {
  return (
    <>
      <div className="dark:bg-grid-white/5 bg-grid-black/5 w-full h-full bg-neutral-100 dark:bg-neutral-900">
        <Hero />
        <PoweredBySection />
        <TrailerComponent />
        <ShowcaseContainer
          title="Welcome to PeerLearn"
          content={`
    Transform your learning journey with PeerLearn. 
    Collaborate, grow, and conquer stress together in a vibrant community designed for your success. 
    Say goodbye to learning anxiety and unlock your full potential with our tailored study sessions, expert advice, and supportive groups.
  `}
        />
        <FeaturesSection />
      </div>
    </>
  );
}
