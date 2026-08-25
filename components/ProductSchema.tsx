import Script from 'next/script';

interface ProductSchemaProps {
    name: string;
    description: string;
    image: string;
    url: string;
    price?: string | number;
    currency?: string;
    availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
    ratingValue?: string | number;
    ratingCount?: number;
}

export default function ProductSchema({
    name,
    description,
    image,
    url,
    price = "15.00",
    currency = "RON",
    availability = "InStock",
    ratingValue,
    ratingCount,
}: ProductSchemaProps) {
    const schema: Record<string, unknown> = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": name,
        "sku": `SP-${name.replace(/\s+/g, '-').toUpperCase().slice(0, 10)}-${Math.floor(Math.random() * 9999)}`,
        "mpn": `SP-${name.replace(/\s+/g, '-').toUpperCase().slice(0, 10)}`,
        "image": typeof window !== "undefined" ? new URL(image, window.location.origin).href : `https://www.HomePrint.ro${image}`,
        "description": description,
        "brand": {
            "@type": "Brand",
            "name": "HomePrint.ro"
        },
        "offers": {
            "@type": "AggregateOffer",
            "url": typeof window !== "undefined" ? new URL(url, window.location.origin).href : `https://www.HomePrint.ro${url}`,
            "priceCurrency": currency,
            "lowPrice": price,
            "highPrice": typeof price === "number" ? price * 5 : "500.00",
            "offerCount": "1",
            "availability": `https://schema.org/${availability}`,
            "seller": {
                "@type": "Organization",
                "name": "HomePrint.ro"
            }
        },
    };

    // Only attach aggregateRating when real rating data is explicitly provided - never fabricate.
    if (ratingValue && ratingCount && ratingCount > 0) {
        schema.aggregateRating = {
            "@type": "AggregateRating",
            "ratingValue": ratingValue,
            "reviewCount": ratingCount
        };
    }

    return (
        <Script
            id={`product-schema-${name.replace(/\s+/g, '-').toLowerCase()}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
