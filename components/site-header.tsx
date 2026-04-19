"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag } from "lucide-react";
import { Logo } from "@/components/logo";
import { CartSheet } from "@/components/cart-sheet";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onDark = isHome && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        onDark
          ? "border-transparent bg-transparent"
          : "border-b border-border/60 bg-background/85 backdrop-blur-md shadow-sm",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "md:hidden",
                  onDark && "text-white hover:bg-white/10 hover:text-white",
                )}
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full p-0 sm:max-w-sm">
              <SheetHeader className="border-b px-6 py-5 text-left">
                <SheetTitle className="font-display text-2xl tracking-wide">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 p-4">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="rounded-lg px-4 py-3 text-lg font-semibold hover:bg-muted"
                    onClick={() => setMobileOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}
                <Link
                  href="/cart"
                  className="rounded-lg px-4 py-3 text-lg font-semibold hover:bg-muted"
                  onClick={() => setMobileOpen(false)}
                >
                  Cart
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Logo variant={onDark ? "onDark" : "default"} />
        </div>

        <nav
          className={cn(
            "hidden items-center gap-8 md:flex",
            onDark ? "text-white" : "text-foreground",
          )}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm font-semibold tracking-wide transition-colors hover:text-primary",
                pathname === l.href && "text-primary",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CartSheet
            triggerClassName={onDark ? "hover:bg-white/10" : "hover:bg-muted"}
          >
            <ShoppingBag
              className={cn(
                "h-6 w-6",
                onDark ? "text-white" : "text-foreground",
              )}
            />
          </CartSheet>
        </div>
      </div>
    </header>
  );
}
