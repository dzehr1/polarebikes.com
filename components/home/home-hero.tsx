"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ArcticParticles } from "@/components/arctic-particles";
import { Button } from "@/components/ui/button";

const words = ["Ride", "the", "Arctic.", "Own", "the", "Road."];

export function HomeHero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center bg-navy px-4 pb-24 pt-28 text-white sm:px-6 lg:px-8">
      <ArcticParticles />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sky-950/40 via-navy to-navy" />
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300/90">
          Polarebikes LLC
        </p>
        <h1 className="font-display text-5xl leading-[0.95] tracking-wide sm:text-6xl md:text-7xl lg:text-8xl">
          {words.map((w, i) => (
            <motion.span
              key={`${w}-${i}`}
              className="inline-block pr-[0.18em] last:pr-0"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.08 * i,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {w}
            </motion.span>
          ))}
        </h1>
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-base text-slate-300 sm:text-lg"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Electric bikes built for riders who demand precision, endurance, and a
          finish that belongs in the alpine — not the bargain basement.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.5 }}
        >
          <Button size="lg" className="min-h-12 min-w-[180px] gap-2" asChild>
            <Link href="/shop">
              Shop now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="min-h-12 min-w-[180px] border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            asChild
          >
            <Link href="/shop#featured">Explore models</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
