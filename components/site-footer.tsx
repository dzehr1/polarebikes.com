import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Logo } from "@/components/logo";

const footerLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/cart", label: "Cart" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-navy text-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo variant="onDark" />
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              Arctic luxury e-bikes engineered for range, speed, and cold-climate
              confidence. Polarebikes LLC — Salt Lake City, USA.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-slate-300 transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-slate-300 transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
                aria-label="Twitter / X"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-slate-300 transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-slate-300 transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg tracking-wide text-white">
              Explore
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-slate-400 transition-colors hover:text-cyan-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg tracking-wide text-white">
              Support
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li>Warranty & service</li>
              <li>Shipping policy</li>
              <li>Returns</li>
              <li>Dealer network</li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg tracking-wide text-white">
              Polarebikes LLC
            </h3>
            <address className="mt-4 not-italic text-sm text-slate-400">
              <p>801 Glacier Way</p>
              <p>Salt Lake City, UT 84101</p>
              <p className="mt-2">
                <a
                  href="mailto:hello@polarebikes.com"
                  className="hover:text-cyan-300"
                >
                  hello@polarebikes.com
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Polarebikes LLC. All rights reserved.
          </p>
          <p className="flex flex-wrap gap-4">
            <Link href="/contact" className="hover:text-slate-300">
              Privacy
            </Link>
            <Link href="/contact" className="hover:text-slate-300">
              Terms
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
