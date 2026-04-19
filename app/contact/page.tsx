import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Polarebikes LLC — sales, support, and dealer inquiries.",
};

export default function ContactPage() {
  return <ContactForm />;
}
