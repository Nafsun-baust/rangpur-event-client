import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden flex items-center">
      <Image
        src="/images/hero2.webp"
        alt="photo of hero"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center text-white">
        <h1 className="text-5xl leading-[1.1] font-light tracking-tight md:text-7xl">
          Join Social Events
          <br />
          Across Rangpur
        </h1>
        <p className="mt-6 max-w-xl text-base text-white/90">
          Create, join, and explore social events happening in Rangpur. Connect with us and be part of this community.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/upcoming-events"
            className="flex items-center gap-3 bg-[#00A8E8] px-7 py-3.5 text-sm font-semibold tracking-widest text-white uppercase transition-colors hover:bg-[#0095d1]"
          >
            Explore Events
            <ArrowRight className="size-4" />
          </a>
          <a
            href="/create-event"
            className="bg-white/30 px-7 py-3.5 text-sm font-semibold tracking-widest text-white uppercase backdrop-blur-sm transition-colors hover:bg-white/40"
          >
            Create Event
          </a>
        </div>
      </div>
    </section>
  );
}