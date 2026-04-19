"use client";

import { motion } from "framer-motion";
import { Battery, Gauge, Shield, Snowflake } from "lucide-react";

const items = [
  {
    title: "Dual-battery range",
    body: "Optimized BMS for real-world mileage in cold temps — not just lab numbers.",
    icon: Battery,
  },
  {
    title: "Class-leading torque",
    body: "Responsive motors tuned for steep climbs, loaded cargo, and quick launches.",
    icon: Gauge,
  },
  {
    title: "5-year frame warranty",
    body: "Ride with confidence. We stand behind every weld, pivot, and paint finish.",
    icon: Shield,
  },
  {
    title: "Cold-weather rated",
    body: "Components spec’d for freezing mornings, road salt, and variable seasons.",
    icon: Snowflake,
  },
];

export function WhyGrid() {
  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06, duration: 0.4 }}
          className="rounded-2xl border bg-card p-6 shadow-sm"
        >
          <item.icon className="h-9 w-9 text-primary" aria-hidden />
          <h3 className="mt-4 font-display text-xl tracking-wide">{item.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
        </motion.div>
      ))}
    </div>
  );
}
