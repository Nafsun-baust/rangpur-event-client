import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  return (
    <section className="w-full bg-emerald-900 px-6 py-20 text-white">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-800 text-emerald-300">
          <Mail className="size-6" />
        </div>
        <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
          Subscribe to Our Community
        </h2>
        <p className="mt-3 text-sm text-emerald-100/85">
          Get weekly updates on upcoming tree plantation, cleanup, and charity drives in Rangpur.
        </p>

        <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
          <Input
            type="email"
            placeholder="Enter your email address"
            className="h-11 bg-white text-slate-900"
            required
          />
          <Button
            type="button"
            className="h-11 bg-emerald-500 px-7 font-semibold text-slate-950 hover:bg-emerald-400"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}