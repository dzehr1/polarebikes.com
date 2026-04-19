"use client";

import { useMemo, useState } from "react";
import { Filter, Search, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import type { Product, ProductCategory } from "@/lib/products";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const categories: { id: ProductCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "mountain", label: "Mountain" },
  { id: "city", label: "City" },
  { id: "cargo", label: "Cargo" },
  { id: "folding", label: "Folding" },
];

const PRICE_MIN = 500;
const PRICE_MAX = 5500;
const MOTOR_MIN = 200;
const MOTOR_MAX = 900;
const RANGE_MIN = 20;
const RANGE_MAX = 70;

type SortKey = "price-asc" | "price-desc" | "newest" | "popular";

function sortProducts(list: Product[], sort: SortKey): Product[] {
  const next = [...list];
  switch (sort) {
    case "price-asc":
      return next.sort((a, b) => a.price - b.price);
    case "price-desc":
      return next.sort((a, b) => b.price - a.price);
    case "newest":
      return next.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    case "popular":
      return next.sort((a, b) => b.reviewCount - a.reviewCount);
    default:
      return next;
  }
}

function FilterPanel({
  category,
  setCategory,
  priceRange,
  setPriceRange,
  motorRange,
  setMotorRange,
  rangeMiles,
  setRangeMiles,
  className,
}: {
  category: ProductCategory | "all";
  setCategory: (c: ProductCategory | "all") => void;
  priceRange: [number, number];
  setPriceRange: (v: [number, number]) => void;
  motorRange: [number, number];
  setMotorRange: (v: [number, number]) => void;
  rangeMiles: [number, number];
  setRangeMiles: (v: [number, number]) => void;
  className?: string;
}) {
  return (
    <div className={cn("space-y-8", className)}>
      <div>
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">
          Category
        </Label>
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={cn(
                "min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                category === c.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:bg-muted",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">
            Price
          </Label>
          <span className="text-xs text-muted-foreground">
            ${priceRange[0].toLocaleString()} – ${priceRange[1].toLocaleString()}
          </span>
        </div>
        <Slider
          className="mt-4"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={50}
          value={priceRange}
          onValueChange={(v) => setPriceRange(v as [number, number])}
          minStepsBetweenThumbs={50}
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">
            Motor (watts)
          </Label>
          <span className="text-xs text-muted-foreground">
            {motorRange[0]}W – {motorRange[1]}W
          </span>
        </div>
        <Slider
          className="mt-4"
          min={MOTOR_MIN}
          max={MOTOR_MAX}
          step={50}
          value={motorRange}
          onValueChange={(v) => setMotorRange(v as [number, number])}
          minStepsBetweenThumbs={50}
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">
            Range (miles)
          </Label>
          <span className="text-xs text-muted-foreground">
            {rangeMiles[0]} – {rangeMiles[1]} mi
          </span>
        </div>
        <Slider
          className="mt-4"
          min={RANGE_MIN}
          max={RANGE_MAX}
          step={1}
          value={rangeMiles}
          onValueChange={(v) => setRangeMiles(v as [number, number])}
          minStepsBetweenThumbs={1}
        />
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => {
          setCategory("all");
          setPriceRange([PRICE_MIN, PRICE_MAX]);
          setMotorRange([MOTOR_MIN, MOTOR_MAX]);
          setRangeMiles([RANGE_MIN, RANGE_MAX]);
        }}
      >
        Reset filters
      </Button>
    </div>
  );
}

export function ShopClient() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("popular");
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    PRICE_MIN,
    PRICE_MAX,
  ]);
  const [motorRange, setMotorRange] = useState<[number, number]>([
    MOTOR_MIN,
    MOTOR_MAX,
  ]);
  const [rangeMiles, setRangeMiles] = useState<[number, number]>([
    RANGE_MIN,
    RANGE_MAX,
  ]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      if (
        p.specs.motorWatts < motorRange[0] ||
        p.specs.motorWatts > motorRange[1]
      )
        return false;
      if (
        p.specs.rangeMiles < rangeMiles[0] ||
        p.specs.rangeMiles > rangeMiles[1]
      )
        return false;
      if (q) {
        const blob = `${p.name} ${p.tagline} ${p.category}`.toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    });
  }, [category, motorRange, priceRange, query, rangeMiles]);

  const sorted = useMemo(
    () => sortProducts(filtered, sort),
    [filtered, sort],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:flex lg:gap-10 lg:px-8 lg:py-14">
      <aside className="mb-8 hidden w-72 shrink-0 lg:block">
        <div className="sticky top-28 rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="font-display text-xl tracking-wide">Filters</h2>
          <FilterPanel
            category={category}
            setCategory={setCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            motorRange={motorRange}
            setMotorRange={setMotorRange}
            rangeMiles={rangeMiles}
            setRangeMiles={setRangeMiles}
            className="mt-6"
          />
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-4xl tracking-wide text-navy md:text-5xl">
              Shop all bikes
            </h1>
            <p className="mt-2 text-muted-foreground">
              {sorted.length} model{sorted.length === 1 ? "" : "s"} match your filters.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 lg:hidden"
                  type="button"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full overflow-y-auto sm:max-w-md">
                <SheetHeader>
                  <SheetTitle className="font-display text-2xl tracking-wide">
                    Filters
                  </SheetTitle>
                </SheetHeader>
                <FilterPanel
                  className="mt-8"
                  category={category}
                  setCategory={setCategory}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  motorRange={motorRange}
                  setMotorRange={setMotorRange}
                  rangeMiles={rangeMiles}
                  setRangeMiles={setRangeMiles}
                />
              </SheetContent>
            </Sheet>

            <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search bikes..."
                className="h-11 pl-9"
                aria-label="Search products"
              />
            </div>

            <Select
              value={sort}
              onValueChange={(v) => setSort(v as SortKey)}
            >
              <SelectTrigger className="h-11 w-full min-w-[180px] sm:w-[200px]">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most popular</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-asc">Price: Low to high</SelectItem>
                <SelectItem value="price-desc">Price: High to low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <motion.div
          layout
          className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
        >
          {sorted.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </motion.div>

        {sorted.length === 0 && (
          <div className="mt-16 rounded-2xl border border-dashed bg-muted/30 p-12 text-center">
            <Filter className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-4 font-medium">No bikes match those filters.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try widening price or range, or clear search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
