"use client";

import { motion } from "framer-motion";

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
          <blockquote className="flex-1 text-sm leading-relaxed text-muted-foreground">
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
