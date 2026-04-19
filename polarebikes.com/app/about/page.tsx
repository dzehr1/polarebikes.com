import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description: "The POLAREBIKES story — built for all climates, engineered for the long ride.",
};

const team = [
  { name: "Alex Rivera", role: "Founder & CEO", img: "https://picsum.photos/seed/pb1/400/400" },
  { name: "Sam Okonkwo", role: "Lead Engineer", img: "https://picsum.photos/seed/pb2/400/400" },
  { name: "Morgan Lee", role: "Product Design", img: "https://picsum.photos/seed/pb3/400/400" },
  { name: "Jordan Hayes", role: "Operations", img: "https://picsum.photos/seed/pb4/400/400" },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="https://picsum.photos/seed/arcticmtn/1920/900"
            alt=""
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
            Our story
          </p>
          <h1 className="mt-4 font-display text-5xl tracking-wide md:text-6xl">
            Precision in every season.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-200">
            POLAREBIKES began as a cold-morning commute and became a mission: build electric bikes
            that feel like premium outdoor equipment — not disposable gadgets.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <h2 className="font-display text-3xl tracking-wide text-navy md:text-4xl">
          Built for all climates
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          From coastal fog to high-desert freeze-thaw, we spec components that tolerate real
          weather: sealed bearings, hydroformed frames, and battery management tuned for temperature
          swings — not just peak summer lab tests.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Every model is ride-reviewed in the Wasatch and iterated with owners who log serious miles.
          If it doesn&apos;t survive our winter, it doesn&apos;t ship with a POLAREBIKES badge.
        </p>
      </section>

      <section className="border-y bg-muted/40 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl tracking-wide text-navy md:text-4xl">
            Team
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            A small crew obsessed with torque curves, thermal behavior, and the small details that
            make a bike disappear beneath you.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <div key={m.name} className="text-center">
                <div className="relative mx-auto aspect-square w-full max-w-[220px] overflow-hidden rounded-2xl border bg-card shadow-sm">
                  <Image
                    src={m.img}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="220px"
                    unoptimized
                  />
                </div>
                <p className="mt-4 font-semibold text-navy">{m.name}</p>
                <p className="text-sm text-muted-foreground">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-muted">
            <Image
              src="https://picsum.photos/seed/glaciertrail/1200/900"
              alt="Rider on a glacier trail"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div>
            <h2 className="font-display text-3xl tracking-wide text-navy md:text-4xl">
              Mission
            </h2>
            <p className="mt-4 text-muted-foreground">
              Accelerate the shift away from short car trips with machines that inspire confidence:
              predictable handling, honest range claims, and support that respects your time.
            </p>
            <Button className="mt-8" asChild>
              <Link href="/shop">Shop the lineup</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
