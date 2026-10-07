import Link from 'next/link';
import { FA_PRICE, FA_ROUTE } from '@/lib/femeia-antreprenor';
import { Suspense } from "react";
import ConfiguratorDispatcher from "@/components/configurator/ConfiguratorDispatcher";

export const metadata = {
    title: "Kit Vizibilitate Fonduri Naționale",
    description: "Panouri și plăci permanente pentru proiecte cu finanțare națională (Start-Up Nation, Femeia Antreprenor, IMM Invest). Conforme cu regulamentele de vizibilitate.",
    alternates: { canonical: "/fonduri-nationale" },
};

export default function FonduriNationalePage() {
    return (
        <div className="pt-20">
            <div className="max-w-6xl mx-auto px-4 mb-6"><Link href={FA_ROUTE} className="design-button">Plăcuțe Femeia Antreprenor · set de 2 bucăți · {FA_PRICE} lei</Link></div>
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Se încarcă configuratorul...</div>}>
                <ConfiguratorDispatcher configuratorId="fonduri-eu" productSlug="fonduri-nationale" />
            </Suspense>
        </div>
    );
}
