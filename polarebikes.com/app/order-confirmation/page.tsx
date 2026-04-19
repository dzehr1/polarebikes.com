import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Order confirmation",
  description: "Thank you for your POLAREBIKES order.",
};

type Props = { searchParams: Promise<{ order?: string; total?: string }> };

export default async function OrderConfirmationPage({ searchParams }: Props) {
  const params = await searchParams;
  const order =
    params.order ??
    `PB-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  const total = params.total ?? "—";

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
        Polarebikes LLC
      </p>
      <h1 className="mt-4 font-display text-4xl tracking-wide text-navy md:text-5xl">
        Thank you — your order is in motion.
      </h1>
      <p className="mt-4 text-muted-foreground">
        We&apos;ll email a confirmation with tracking once your bike leaves our Salt Lake warehouse.
      </p>
      <div className="mt-10 rounded-2xl border bg-card p-8 text-left shadow-sm">
        <p className="text-sm text-muted-foreground">Order number</p>
        <p className="mt-1 font-mono text-2xl font-bold tracking-tight text-navy">
          {order}
        </p>
        <Separator className="my-6" />
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Estimated total</span>
          <span className="font-semibold">${total}</span>
        </div>
      </div>
      <Button className="mt-10 min-h-12 px-10" size="lg" asChild>
        <Link href="/shop">Back to shop</Link>
      </Button>
    </div>
  );
}
