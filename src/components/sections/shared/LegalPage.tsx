import { notFound } from "next/navigation";
import { getLegalDoc } from "@/lib/content";
import { MdxContent } from "@/components/mdx/MdxContent";
import { PageHero } from "./PageHero";

export function LegalPage({ slug, path }: { slug: string; path: string }) {
  const doc = getLegalDoc(slug);
  if (!doc) notFound();
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={doc.title}
        description={`Effective Date: ${doc.effectiveDate} · Last Updated: ${doc.lastUpdated}`}
        breadcrumbs={[{ name: doc.title, path }]}
      />
      <section className="container-page max-w-3xl pt-16 pb-32 md:pt-24">
        <MdxContent source={doc.body} />
      </section>
    </>
  );
}
