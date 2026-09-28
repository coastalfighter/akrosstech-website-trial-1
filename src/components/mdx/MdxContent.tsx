import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  a: ({ href = "", children, ...props }) => {
    if (href.startsWith("/")) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    const external = /^https?:/.test(href);
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {children}
      </a>
    );
  },
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto rounded-[6px] border border-ink/12">
      <table {...props}>{children}</table>
    </div>
  ),
};

/** Render trusted MDX from /content with GFM (tables) and JS expressions blocked. */
export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose-ak">
      <MDXRemote
        source={source}
        components={components}
        options={{ blockJS: true, mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </div>
  );
}
