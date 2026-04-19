import type { Metadata } from "next";
import { CheckoutClient } from "@/components/checkout/checkout-client";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your POLAREBIKES order — contact, shipping, and payment.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
