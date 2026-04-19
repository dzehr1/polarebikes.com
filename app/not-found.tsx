import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <p className="font-display text-8xl leading-none text-primary">404</p>
      <h1 className="mt-4 font-display text-3xl tracking-wide text-navy">
        This trail doesn&apos;t exist
      </h1>
      <p className="mt-3 text-muted-foreground">
        The page you&apos;re looking for may have moved — head back to the shop.
      </p>
      <Button className="mt-8" asChild>
        <Link href="/">Go home</Link>
      </Button>
    </div>
  );
}
