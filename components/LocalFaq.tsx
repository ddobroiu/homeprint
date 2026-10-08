import React from "react";
import { siteConfig } from "@/lib/siteConfig";
import { localDataFaqs } from "@/lib/seo/localFaqData";
import { getLocalEditorial } from "@/lib/seo/localEditorial";

// Intrebarile frecvente de pe pagina produs × localitate, construite din regulile reale de livrare
// si plata (lib/seo/localFaqData.ts) + intrebarile editoriale ale orasului (data/local-content/...).
// Raspunsurile sunt in HTML (<details>), iar aceleasi texte merg in datele structurate FAQPage.

type Props = { productTitle: string; locName: string; judetName: string; judetSlug?: string; locSlug?: string; productKey?: string };

export function getLocalFaqs({ productTitle, locName, judetName, judetSlug, locSlug, productKey }: Props) {
    const editorial = judetSlug && locSlug ? getLocalEditorial(siteConfig.url, judetSlug, locSlug)?.faq : undefined;
    return localDataFaqs({ locName, judetName, productTitle, productKey, editorial });
}

export function LocalFaq(props: Props) {
    return (
        <div className="w-full divide-y divide-slate-200">
            {getLocalFaqs(props).map((f, i) => (
                <details key={f.question} className="group py-4" open={i === 0}>
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold tracking-tight text-slate-900 hover:text-emerald-600">
                        {f.question}
                        <span className="text-emerald-600 transition group-open:rotate-45" aria-hidden>+</span>
                    </summary>
                    <p className="mt-2 text-base leading-relaxed text-slate-600">{f.answer}</p>
                </details>
            ))}
        </div>
    );
}
