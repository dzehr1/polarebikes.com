import type { Metadata } from "next";
import { ShopClient } from "@/components/shop/shop-client";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse POLAREBIKES electric bikes — mountain, city, cargo, and folding models.",
};

export default function ShopPage() {
  return <ShopClient />;
}
