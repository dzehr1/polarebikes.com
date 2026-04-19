"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart-store";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function CartSheet({
  children,
  triggerClassName,
}: {
  children: React.ReactNode;
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const totalItems = useCartStore((s) => s.getTotalItems);

  useEffect(() => setMounted(true), []);

  const subtotal = mounted ? getSubtotal() : 0;
  const count = mounted ? totalItems() : 0;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className={cn(
            "relative inline-flex h-11 w-11 items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            triggerClassName ?? "hover:bg-muted",
          )}
          aria-label="Open cart"
        >
          {children}
          {count > 0 && (
            <span
              className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-cyan-500 px-1 text-[10px] font-bold text-navy"
              suppressHydrationWarning
            >
              {count > 99 ? "99+" : count}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b px-6 py-4 text-left">
          <SheetTitle className="font-display text-2xl tracking-wide">
            Your Cart
          </SheetTitle>
          <p className="text-sm text-muted-foreground">
            {count === 0
              ? "Your cart is empty."
              : `${count} item${count === 1 ? "" : "s"}`}
          </p>
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-4">
          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 py-16 text-center">
              <ShoppingBag className="h-14 w-14 text-muted-foreground/50" />
              <p className="text-muted-foreground">
                Add an e-bike to begin your arctic ride.
              </p>
              <Button asChild onClick={() => setOpen(false)}>
                <Link href="/shop">Browse shop</Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((line) => (
                <li
                  key={`${line.productId}-${line.color}`}
                  className="flex gap-3 rounded-lg border bg-card p-3"
                >
                  <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-md bg-muted">
                    <Image
                      src={line.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="96px"
                      unoptimized
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div>
                      <Link
                        href={`/shop/${line.slug}`}
                        className="font-semibold leading-tight hover:text-primary"
                        onClick={() => setOpen(false)}
                      >
                        {line.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {line.color}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="inline-flex items-center rounded-md border">
                        <button
                          type="button"
                          className="inline-flex h-9 w-9 items-center justify-center hover:bg-muted"
                          aria-label="Decrease quantity"
                          onClick={() =>
                            updateQuantity(
                              line.productId,
                              line.color,
                              line.quantity - 1,
                            )
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-[2rem] text-center text-sm font-medium">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          className="inline-flex h-9 w-9 items-center justify-center hover:bg-muted"
                          aria-label="Increase quantity"
                          onClick={() =>
                            updateQuantity(
                              line.productId,
                              line.color,
                              line.quantity + 1,
                            )
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">
                          ${(line.price * line.quantity).toLocaleString()}
                        </span>
                        <button
                          type="button"
                          className="rounded-md p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                          aria-label="Remove item"
                          onClick={() =>
                            removeItem(line.productId, line.color)
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t bg-background p-4">
            <div className="mb-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">
                  ${subtotal.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout.
              </p>
            </div>
            <Separator className="mb-4" />
            <Button className="w-full" size="lg" asChild>
              <Link href="/cart" onClick={() => setOpen(false)}>
                View cart
              </Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
