import { siteConfig } from "@/lib/siteConfig";

interface ArticleSchemaProps {
  title: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  authorType?: "Person" | "Organization";
  url: string;
}

export default function ArticleSchema({ title, description, image, datePublished, dateModified, authorName, authorType = "Organization", url }: ArticleSchemaProps) {
  const base = siteConfig.url;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    ...(image ? { image: [new URL(image, base).href] } : {}),
    datePublished,
    dateModified: dateModified || datePublished,
    author: { "@type": authorType, name: authorName },
    publisher: { "@type": "Organization", name: siteConfig.name, url: base },
    mainEntityOfPage: { "@type": "WebPage", "@id": new URL(url, base).href },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />;
}
