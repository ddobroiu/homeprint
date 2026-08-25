import { Suspense } from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const CanvasMartisorConfigurator = dynamic(() => import('@/components/configurator/CanvasMartisorConfigurator'));

export const metadata: Metadata = {
    title: "Canvas Mărțișor Personalizat",
    description: "Creează un cadou de mărțișor deosebit. Tablou canvas personalizat cu fotografia și textul tău, disponibil în dimensiuni mari pentru un impact maxim.",
    keywords: ['martisor', 'canvas martisor', 'cadou 1 martie', 'martisor personalizat', 'tablou canvas', 'homeprint'],
};

export default function CanvasMartisorPage() {
    return (
        <>
            <div className="pt-20">
                <Suspense fallback={<div className="min-h-[60svh] flex items-center justify-center">Se încarcă configuratorul de mărțișoare...</div>}>
                    <div className="min-h-screen bg-transparent pb-20">
                        <CanvasMartisorConfigurator />
                    </div>
                </Suspense>
            </div>
        </>
    );
}
