"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/lib/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";

type ProductCardProps = {
  product: Product;
  index?: number;
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const color = product.colors[0] ?? "Standard";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className="group overflow-hidden border-border/80 transition-shadow duration-300 hover:-translate-y-1 hover:shadow-xl">
        <Link href={`/shop/${product.slug}`} className="block">
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            <Image
              src={product.images[0] ?? ""}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
              unoptimized
            />
            <div className="absolute left-3 top-3 flex flex-wrap gap-2">
              {product.originalPrice && (
                <Badge variant="sale">Sale</Badge>
              )}
              {product.isNew && <Badge variant="new">New</Badge>}
            </div>
          </div>
        </Link>
        <CardContent className="space-y-2 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            {product.category}
          </p>
          <Link href={`/shop/${product.slug}`}>
            <h3 className="font-display text-xl tracking-wide text-navy transition-colors hover:text-primary">
              {product.name}
            </h3>
          </Link>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {product.tagline}
          </p>
          <p className="text-xs text-muted-foreground">
            {product.specs.motorWatts}W motor · {product.specs.rangeMiles} mi range
          </p>
          <div className="flex flex-wrap items-baseline gap-2 pt-1">
            <span className="text-lg font-bold">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex gap-2 p-4 pt-0">
          <Button
            className="flex-1"
            variant="secondary"
            asChild
          >
            <Link href={`/shop/${product.slug}`}>Details</Link>
          </Button>
          <Button
            className="flex-1 gap-2"
            onClick={() => addItem(product, color, 1)}
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
