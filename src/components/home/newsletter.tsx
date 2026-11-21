import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  return (
    <section className="w-full bg-white px-6 py-20">
      <div className="mx-auto max-w-5xl rounded-2xl bg-emerald-800 bg-linear-to-r from-emerald-800 to-teal-700 px-6 py-14 text-center text-white shadow-sm md:px-12">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-white/15 text-emerald-200">
          <Mail className="size-6" />
        </div>
        <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
          Subscribe to Our Community
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-emerald-50/90">
          Get weekly updates on upcoming tree plantation, cleanup, and charity drives in Rangpur.
        </p>

        <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
          <Input
            type="email"
            placeholder="Enter your email address"
            className="h-11 rounded-lg bg-white text-slate-900"
            required
          />
          <Button
            type="button"
            className="h-11 rounded-lg bg-emerald-500 px-7 font-semibold text-slate-950 hover:bg-emerald-400"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}