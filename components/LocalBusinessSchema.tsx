import React from "react";
import { siteConfig } from "@/lib/siteConfig";

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#organization`,
    "name": siteConfig.name,
    "legalName": siteConfig.business.legalName,
    "description": siteConfig.description,
    "url": siteConfig.url,
    "logo": siteConfig.ogImage,
    "image": siteConfig.ogImage,
    "telephone": siteConfig.business.contact.phone,
    "email": siteConfig.business.contact.email,
    "taxID": siteConfig.business.cui,
    "vatID": siteConfig.business.vatId,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.business.address.fullAddress,
      "addressLocality": siteConfig.business.address.city,
      "addressRegion": siteConfig.business.address.county,
      "postalCode": siteConfig.business.address.postalCode,
      "addressCountry": "RO"
    },
    // ... geo coordinates remain hardcoded as they might not be in siteConfig yet, or I can check if I should add them there.
    // For now I will keep them hardcoded if I don't see them in siteConfig.
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "45.3956",
      "longitude": "26.9722"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "priceRange": "$$",
    "currenciesAccepted": "RON",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
    "areaServed": {
      "@type": "Country",
      "name": "Romania"
    },
    "sameAs": siteConfig.socialLinks.map(link => link.href),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicii Print Digital",
      "itemListElement": [
        // ... keeping the static offer catalog for now as it's descriptive
        {
          "@type": "OfferCatalog",
          "name": "Bannere Publicitare",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Bannere Outdoor",
                "description": "Bannere personalizate rezistente la exterior"
              }
            }
          ]
        },
        // ... (rest of the catalog)
        {
          "@type": "OfferCatalog",
          "name": "Materiale Promoționale",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Afișe & Postere",
                "description": "Print HD pe hârtie foto"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Autocolante Personalizate",
                "description": "Autocolante vinyl cu decupaj pe contur"
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Decor Interior",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Tablouri Canvas",
                "description": "Print pe pânză întinsă pe șasiu lemn"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Tapet Personalizat",
                "description": "Fototapet la dimensiuni personalizate"
              }
            }
          ]
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
