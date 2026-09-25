import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/sections/shared/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions",
  description:
    "The terms and conditions governing your use of the Akrostech Consulting LLC website, services and communications.",
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return <LegalPage slug="terms-and-conditions" path="/terms-and-conditions" />;
}
