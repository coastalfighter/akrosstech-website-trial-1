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
        label="Legal"
        title={doc.title}
        description={`Effective Date: ${doc.effectiveDate} · Last Updated: ${doc.lastUpdated}`}
        breadcrumbs={[{ name: doc.title, path }]}
      />
      <section data-tone="paper" className="container-page max-w-3xl pb-28">
        <MdxContent source={doc.body} />
      </section>
    </>
  );
}
