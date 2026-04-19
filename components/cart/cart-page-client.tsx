"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart-store";

const SHIPPING_FLAT = 49;
const TAX_RATE = 0.0725;

export function CartPageClient() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const getSubtotal = useCartStore((s) => s.getSubtotal);

  const subtotal = getSubtotal();
  const estimatedShipping = items.length ? SHIPPING_FLAT : 0;
  const tax = items.length ? Math.round(subtotal * TAX_RATE * 100) / 100 : 0;
  const total = subtotal + estimatedShipping + tax;

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center sm:px-6">
        <ShoppingBag className="h-16 w-16 text-muted-foreground/40" />
        <h1 className="mt-6 font-display text-4xl tracking-wide text-navy">
          Your cart is empty
        </h1>
        <p className="mt-3 text-muted-foreground">
          Discover arctic-tuned e-bikes built for real mileage and real weather.
        </p>
        <Button className="mt-8 min-h-12 px-8" asChild>
          <Link href="/shop">Continue shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <h1 className="font-display text-4xl tracking-wide text-navy md:text-5xl">
        Cart
      </h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <ul className="space-y-4">
          {items.map((line) => (
            <li
              key={`${line.productId}-${line.color}`}
              className="flex flex-col gap-4 rounded-2xl border bg-card p-4 shadow-sm sm:flex-row sm:items-center"
            >
              <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl bg-muted sm:h-32 sm:w-44">
                <Image
                  src={line.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width:640px) 100vw, 176px"
                  unoptimized
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-3">
                <div>
                  <Link
                    href={`/shop/${line.slug}`}
                    className="font-display text-xl tracking-wide text-navy hover:text-primary"
                  >
                    {line.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">{line.color}</p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="inline-flex items-center rounded-lg border">
                    <button
                      type="button"
                      className="inline-flex h-11 w-11 items-center justify-center hover:bg-muted"
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
                    <span className="min-w-[2.5rem] text-center font-semibold">
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      className="inline-flex h-11 w-11 items-center justify-center hover:bg-muted"
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
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold">
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
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-2xl border bg-card p-6 shadow-sm lg:sticky lg:top-28">
          <h2 className="font-display text-xl tracking-wide">Order summary</h2>
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Est. shipping</span>
              <span className="font-medium">
                ${estimatedShipping.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Est. tax</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Shipping and taxes are estimates. Final totals shown at checkout.
          </p>
          <Button className="mt-8 w-full min-h-12" size="lg" asChild>
            <Link href="/checkout">Proceed to checkout</Link>
          </Button>
          <Button variant="ghost" className="mt-3 w-full" asChild>
            <Link href="/shop">Continue shopping</Link>
          </Button>
        </aside>
      </div>
    </div>
  );
}
