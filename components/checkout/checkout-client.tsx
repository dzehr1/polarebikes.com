"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart-store";

const steps = ["Contact", "Shipping", "Payment"] as const;

const SHIPPING_FLAT = 49;
const TAX_RATE = 0.0725;

export function CheckoutClient() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const clearCart = useCartStore((s) => s.clearCart);

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    cardName: "",
    cardNumber: "",
    cardExp: "",
    cardCvc: "",
  });

  const subtotal = getSubtotal();
  const estimatedShipping = items.length ? SHIPPING_FLAT : 0;
  const tax = items.length ? Math.round(subtotal * TAX_RATE * 100) / 100 : 0;
  const total = subtotal + estimatedShipping + tax;

  const canContinue = useMemo(() => {
    if (step === 0) {
      return form.name.trim() && form.email.trim() && form.phone.trim();
    }
    if (step === 1) {
      return (
        form.address.trim() &&
        form.city.trim() &&
        form.state.trim() &&
        form.zip.trim()
      );
    }
    return (
      form.cardName.trim() &&
      form.cardNumber.trim().length >= 12 &&
      form.cardExp.trim() &&
      form.cardCvc.trim().length >= 3
    );
  }, [form, step]);

  const placeOrder = () => {
    const orderNumber = `PB-${Math.random().toString(36).slice(2, 8).toUpperCase()}-${Date.now().toString().slice(-4)}`;
    clearCart();
    router.push(
      `/order-confirmation?order=${encodeURIComponent(orderNumber)}&total=${encodeURIComponent(total.toFixed(2))}`,
    );
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="font-display text-4xl tracking-wide text-navy">
          Nothing to checkout
        </h1>
        <p className="mt-3 text-muted-foreground">
          Add a bike to your cart before continuing.
        </p>
        <Button className="mt-8" asChild>
          <Link href="/shop">Shop bikes</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <h1 className="font-display text-4xl tracking-wide text-navy md:text-5xl">
        Checkout
      </h1>
      <p className="mt-2 text-muted-foreground">
        Secure checkout UI — payments are not processed in this demo.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          <div className="mb-8 flex gap-2 rounded-xl border bg-card p-2">
            {steps.map((s, i) => (
              <button
                key={s}
                type="button"
                onClick={() => setStep(i)}
                className={`min-h-11 flex-1 rounded-lg px-3 text-sm font-semibold transition-colors ${
                  i === step
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                {i + 1}. {s}
              </button>
            ))}
          </div>

          <motion.div
            key={step}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl border bg-card p-6 shadow-sm"
          >
            {step === 0 && (
              <div className="space-y-4">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  autoComplete="name"
                />
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  autoComplete="email"
                />
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  autoComplete="tel"
                />
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <Label htmlFor="address">Street address</Label>
                <Input
                  id="address"
                  value={form.address}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, address: e.target.value }))
                  }
                  autoComplete="street-address"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={form.city}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, city: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State / Province</Label>
                    <Input
                      id="state"
                      value={form.state}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, state: e.target.value }))
                      }
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="zip">ZIP / Postal</Label>
                    <Input
                      id="zip"
                      value={form.zip}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, zip: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={form.country}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, country: e.target.value }))
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Card details are UI-only placeholders — no real payment processing.
                </p>
                <Label htmlFor="cardName">Name on card</Label>
                <Input
                  id="cardName"
                  value={form.cardName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, cardName: e.target.value }))
                  }
                  autoComplete="cc-name"
                />
                <Label htmlFor="cardNumber">Card number</Label>
                <Input
                  id="cardNumber"
                  inputMode="numeric"
                  placeholder="4242 4242 4242 4242"
                  value={form.cardNumber}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, cardNumber: e.target.value }))
                  }
                  autoComplete="cc-number"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="cardExp">Expiration</Label>
                    <Input
                      id="cardExp"
                      placeholder="MM / YY"
                      value={form.cardExp}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, cardExp: e.target.value }))
                      }
                      autoComplete="cc-exp"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardCvc">CVC</Label>
                    <Input
                      id="cardCvc"
                      value={form.cardCvc}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, cardCvc: e.target.value }))
                      }
                      autoComplete="cc-csc"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              {step > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                >
                  Back
                </Button>
              )}
              {step < 2 && (
                <Button
                  type="button"
                  disabled={!canContinue}
                  onClick={() => setStep((s) => Math.min(2, s + 1))}
                >
                  Continue
                </Button>
              )}
              {step === 2 && (
                <Button type="button" disabled={!canContinue} onClick={placeOrder}>
                  Place order
                </Button>
              )}
            </div>
          </motion.div>
        </div>

        <aside className="h-fit rounded-2xl border bg-card p-6 shadow-sm lg:sticky lg:top-28">
          <h2 className="font-display text-xl tracking-wide">Order summary</h2>
          <ul className="mt-4 max-h-64 space-y-3 overflow-y-auto text-sm">
            {items.map((line) => (
              <li key={`${line.productId}-${line.color}`} className="flex justify-between gap-4">
                <span className="text-muted-foreground">
                  {line.name} × {line.quantity}
                </span>
                <span className="shrink-0 font-medium">
                  ${(line.price * line.quantity).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
          <Separator className="my-6" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>${estimatedShipping.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax (est.)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
