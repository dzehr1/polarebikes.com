"use client";

import { useState } from "react";
import Link from "next/link";
import { Facebook, Instagram, Mail, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:grid lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          Contact
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-wide text-navy md:text-5xl">
          Let&apos;s ride together.
        </h1>
        <p className="mt-4 text-muted-foreground">
          Dealer inquiries, fleet quotes, or fit questions — send a note and our Salt Lake team will
          respond within one business day.
        </p>

        <div className="mt-10 space-y-6 text-sm">
          <div>
            <p className="font-semibold text-navy">Polarebikes LLC</p>
            <p className="mt-1 text-muted-foreground">
              801 Glacier Way
              <br />
              Salt Lake City, UT 84101
            </p>
          </div>
          <a
            href="mailto:hello@polarebikes.com"
            className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
          >
            <Mail className="h-4 w-4" />
            hello@polarebikes.com
          </a>
          <div className="flex gap-3 pt-2">
            <Link
              href="https://instagram.com"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border hover:bg-muted"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link
              href="https://twitter.com"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border hover:bg-muted"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href="https://youtube.com"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border hover:bg-muted"
              aria-label="YouTube"
            >
              <Youtube className="h-5 w-5" />
            </Link>
            <Link
              href="https://facebook.com"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border hover:bg-muted"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12 rounded-2xl border bg-card p-6 shadow-sm lg:mt-0">
        {sent ? (
          <p className="py-12 text-center text-muted-foreground">
            Thanks — your message is on its way. This demo doesn&apos;t send email, but our team
            would reply shortly in production.
          </p>
        ) : (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div>
              <Label htmlFor="cname">Name</Label>
              <Input id="cname" required className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="cemail">Email</Label>
              <Input id="cemail" type="email" required className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="csubj">Subject</Label>
              <Input id="csubj" required className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="cmsg">Message</Label>
              <Textarea id="cmsg" required className="mt-1.5" />
            </div>
            <Button type="submit" className="w-full min-h-12">
              Send message
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
