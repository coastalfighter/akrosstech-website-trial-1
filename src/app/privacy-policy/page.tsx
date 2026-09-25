import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/sections/shared/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Akrostech Consulting LLC collects, uses, discloses, transfers and protects personal information, including SMS communications.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return <LegalPage slug="privacy-policy" path="/privacy-policy" />;
}
