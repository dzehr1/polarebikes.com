import Link from "next/link";
import { HomeHero } from "@/components/home/home-hero";
import { WhyGrid } from "@/components/home/why-grid";
import { TestimonialGrid } from "@/components/home/testimonial-grid";
import { ProductCard } from "@/components/product-card";
import { NewsletterBanner } from "@/components/home/newsletter-banner";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts } from "@/lib/products";

const testimonials = [
  {
    quote:
      "The Aurora Peak Pro is the first e-MTB that feels like a real bike first — motor second.",
    name: "Jordan M.",
    role: "Park City, UT",
  },
  {
    quote:
      "Our Arctic Hauler replaced short car trips. Kids love the ride; I love the torque.",
    name: "Elena R.",
    role: "Boulder, CO",
  },
  {
    quote:
      "Premium finish, quiet belt drive on the Foldaway, and support that actually answers.",
    name: "Chris P.",
    role: "Seattle, WA",
  },
];

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 6);

  return (
    <div className="overflow-x-hidden">
      <HomeHero />

      <section
        id="featured"
        className="border-b bg-background py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-4xl tracking-wide text-navy md:text-5xl">
                Featured builds
              </h2>
              <p className="mt-2 max-w-xl text-muted-foreground">
                Hand-picked machines from our lineup — scroll sideways on mobile.
              </p>
            </div>
            <Button variant="icy" asChild>
              <Link href="/shop">View all bikes</Link>
            </Button>
          </div>
          <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3 sm:px-0 lg:gap-6">
            {featured.map((p, i) => (
              <div
                key={p.id}
                className="w-[min(100%,320px)] shrink-0 snap-center sm:w-auto sm:shrink"
              >
                <ProductCard product={p} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl tracking-wide text-navy md:text-5xl">
            Why POLAREBIKES
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            We don&apos;t chase specs on a spreadsheet — we chase cold-start confidence,
            predictable handling, and components you can service for years.
          </p>
          <WhyGrid />
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl tracking-wide text-navy md:text-5xl">
            Riders are talking
          </h2>
          <TestimonialGrid items={testimonials} />
        </div>
      </section>

      <NewsletterBanner />
    </div>
  );
}
