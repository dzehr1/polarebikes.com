"use client";

import { motion } from "framer-motion";

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`${count} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={
            i < count
              ? "h-4 w-4 fill-amber-400 text-amber-400"
              : "h-4 w-4 fill-muted text-muted-foreground/30"
          }
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 1.5l2.59 5.25 5.79.84-4.19 4.08.99 5.78L10 14.71l-5.18 2.74.99-5.78L1.62 7.59l5.79-.84L10 1.5z"
          />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialGrid({
  items,
}: {
  items: { quote: string; name: string; role: string }[];
}) {
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-3">
      {items.map((t, i) => (
        <motion.figure
          key={t.name}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          className="flex flex-col rounded-2xl border bg-card p-6 shadow-sm"
        >
          <StarRating />
          <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
            “{t.quote}”
          </blockquote>
          <figcaption className="mt-6 border-t pt-4">
            <p className="font-semibold text-navy">{t.name}</p>
            <p className="text-xs text-muted-foreground">{t.role}</p>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}
