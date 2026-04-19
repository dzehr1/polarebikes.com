"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  Star,
} from "lucide-react";
import type { Product } from "@/lib/products";
import { getRelatedProducts } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";

type ProductDetailViewProps = {
  product: Product;
};

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const [active, setActive] = useState(0);
  const [color, setColor] = useState(product.colors[0] ?? "");
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const related = getRelatedProducts(product, 4);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const images = product.images;
  const mainSrc = images[active] ?? images[0];

  const next = () =>
    setActive((i) => (i + 1) % images.length);
  const prev = () =>
    setActive((i) => (i - 1 + images.length) % images.length);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || typeof window === "undefined" || window.innerWidth >= 1024)
      return;
    const w = el.clientWidth;
    el.scrollTo({ left: active * w, behavior: "smooth" });
  }, [active]);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root || typeof window === "undefined" || window.innerWidth >= 1024)
      return;
    const slides = root.querySelectorAll("[data-slide-index]");
    if (!slides.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!hit?.target) return;
        const idx = Number(
          (hit.target as HTMLElement).getAttribute("data-slide-index"),
        );
        if (!Number.isNaN(idx)) setActive(idx);
      },
      { root, rootMargin: "0px", threshold: [0.51, 0.6, 0.75] },
    );
    slides.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [images]);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pb-32 pt-8 sm:px-6 lg:grid lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:px-8 lg:pb-20 lg:pt-10">
        <div className="space-y-4">
          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth lg:hidden"
          >
            {images.map((src, i) => (
              <div
                key={src}
                data-slide-index={i}
                className="relative aspect-[4/3] w-full min-w-full shrink-0 snap-center overflow-hidden rounded-2xl border bg-muted"
              >
                <Image
                  src={src}
                  alt={`${product.name} ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={i === 0}
                  unoptimized
                />
              </div>
            ))}
          </div>

          <div className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl border bg-muted lg:block lg:aspect-square">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0.85 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.85 }}
                transition={{ duration: 0.2 }}
                className="group relative h-full w-full"
              >
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={mainSrc}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 ease-out md:group-hover:scale-105"
                    sizes="(max-width:1024px) 100vw, 50vw"
                    priority
                    unoptimized
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  className="absolute left-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 shadow-md backdrop-blur md:left-4"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="absolute right-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 shadow-md backdrop-blur md:right-4"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          <div
            className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory lg:max-w-none"
            role="tablist"
            aria-label="Product images"
          >
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "relative h-20 w-28 shrink-0 snap-center overflow-hidden rounded-lg border-2 transition-colors",
                  i === active
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-transparent opacity-80 hover:opacity-100",
                )}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="112px"
                  unoptimized
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 lg:mt-0">
          <div className="flex flex-wrap gap-2">
            {product.originalPrice && <Badge variant="sale">Sale</Badge>}
            {product.isNew && <Badge variant="new">New</Badge>}
            {!product.inStock && (
              <Badge variant="destructive">Out of stock</Badge>
            )}
          </div>
          <h1 className="mt-4 font-display text-4xl tracking-wide text-navy md:text-5xl">
            {product.name}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">{product.tagline}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.round(product.rating)
                      ? "fill-current"
                      : "text-muted-foreground/40",
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating.toFixed(1)} ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-baseline gap-3">
            <span className="text-3xl font-bold">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className="mt-8 space-y-3">
            <p className="text-sm font-semibold">Color</p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={cn(
                    "min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                    c === color
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:bg-muted",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 hidden items-center gap-4 lg:flex">
            <div className="inline-flex items-center rounded-lg border">
              <button
                type="button"
                className="inline-flex h-12 w-12 items-center justify-center hover:bg-muted"
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-[3rem] text-center text-lg font-semibold">
                {qty}
              </span>
              <button
                type="button"
                className="inline-flex h-12 w-12 items-center justify-center hover:bg-muted"
                aria-label="Increase quantity"
                onClick={() => setQty((q) => q + 1)}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button
              size="lg"
              className="min-h-12 flex-1 gap-2"
              disabled={!product.inStock}
              onClick={() => addItem(product, color, qty)}
            >
              <ShoppingCart className="h-5 w-5" />
              Add to cart
            </Button>
          </div>

          <Separator className="my-10" />

          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-2 gap-1 sm:grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specs">Specs</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4 text-sm leading-relaxed text-muted-foreground">
              <p>{product.description}</p>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                {product.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="specs" className="mt-4">
              <dl className="grid gap-3 sm:grid-cols-2">
                {[
                  ["Motor", `${product.specs.motorWatts}W`],
                  ["Top speed", `${product.specs.topSpeedMph} mph`],
                  ["Range", `${product.specs.rangeMiles} mi`],
                  ["Battery", `${product.specs.batteryWh} Wh`],
                  ["Weight", `${product.specs.weightLbs} lb`],
                  ["Charge time", `${product.specs.chargingHours} hrs`],
                  ["Brakes", product.specs.brakes],
                  ["Suspension", product.specs.suspension],
                  ["Tires", product.specs.tireSize],
                  ["Drivetrain", product.specs.gears],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex justify-between gap-4 rounded-lg border bg-card px-4 py-3 text-sm"
                  >
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="font-medium text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </TabsContent>
            <TabsContent value="shipping" className="mt-4 text-sm text-muted-foreground">
              <p>
                Complimentary ground shipping to the contiguous United States on orders over $500.
                Bikes are partially assembled for safety; final assembly by a certified dealer is
                recommended. In-home white-glove delivery available in select metros.
              </p>
              <p className="mt-4">
                Typical transit: 5–9 business days. Tracking sends when your bike leaves our Salt Lake
                warehouse. Alaska & Hawaii rates calculated at checkout.
              </p>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4 text-sm text-muted-foreground">
              <p>
                Reviews are from verified POLAREBIKES owners. Aggregate rating{" "}
                <strong className="text-foreground">{product.rating.toFixed(1)}</strong> from{" "}
                {product.reviewCount} riders.
              </p>
              <p className="mt-4">
                Detailed review UI connects to our support portal in production — for now, add this
                bike to your cart and our team will follow up with fit guidance.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <section className="border-t bg-muted/30 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl tracking-wide text-navy md:text-4xl">
            Related bikes
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.length ? (
              related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))
            ) : (
              <p className="text-muted-foreground">
                Explore the full lineup in the shop.
              </p>
            )}
          </div>
          <div className="mt-10 text-center">
            <Button variant="outline" asChild>
              <Link href="/shop">Browse all models</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <div className="inline-flex items-center rounded-lg border">
            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center hover:bg-muted"
              aria-label="Decrease quantity"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="min-w-[2.5rem] text-center font-semibold">{qty}</span>
            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center hover:bg-muted"
              aria-label="Increase quantity"
              onClick={() => setQty((q) => q + 1)}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <Button
            className="min-h-12 flex-1 gap-2"
            disabled={!product.inStock}
            onClick={() => addItem(product, color, qty)}
          >
            <ShoppingCart className="h-5 w-5" />
            Add to cart · ${product.price.toLocaleString()}
          </Button>
        </div>
      </div>
    </>
  );
}
