import Script from 'next/script';

interface ArticleSchemaProps {
    title: string;
    description: string;
    image?: string;
    datePublished: string;
    dateModified?: string;
    authorName: string;
    url: string;
}

export default function ArticleSchema({
    title,
    description,
    image = "/logo.svg",
    datePublished,
    dateModified,
    authorName,
    url,
}: ArticleSchemaProps) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.HomePrint.ro";
    const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
    const fullImage = image.startsWith('http') ? image : `${baseUrl}${image}`;

    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "image": [fullImage],
        "datePublished": datePublished,
        "dateModified": dateModified || datePublished,
        "author": {
            "@type": "Person",
            "name": authorName
        },
        "publisher": {
            "@type": "Organization",
            "name": "HomePrint.ro",
            "logo": {
                "@type": "ImageObject",
                "url": `${baseUrl}/logo.svg`
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": fullUrl
        }
    };

    return (
        <Script
            id={`article-schema-${title.replace(/\s+/g, '-').toLowerCase()}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
