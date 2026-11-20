import { Features } from "@/components/home/features";
import { Gallery } from "@/components/home/gallery";
import { Hero } from "@/components/home/hero";
import { RecentEvents } from "@/components/home/recent-events";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <RecentEvents />
      <Gallery />
    </main>
  );
}