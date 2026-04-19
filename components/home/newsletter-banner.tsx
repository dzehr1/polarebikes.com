"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterBanner() {
  return (
    <section className="border-y bg-gradient-to-r from-sky-600 via-cyan-600 to-sky-700 py-14 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:flex-row lg:justify-between lg:text-left lg:px-8">
        <div>
          <h2 className="font-display text-3xl tracking-wide md:text-4xl">
            Field notes & launch drops
          </h2>
          <p className="mt-2 max-w-xl text-sm text-white/85">
            Get firmware tips, ride routes, and limited colorways — no spam, just signal.
          </p>
        </div>
        <form
          className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Input
            type="email"
            required
            placeholder="Email address"
            className="h-12 border-white/20 bg-white/10 text-white placeholder:text-white/60"
          />
          <Button
            type="submit"
            variant="secondary"
            className="h-12 shrink-0 font-semibold"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
