import { Suspense } from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const Canvas8MartieConfigurator = dynamic(() => import('@/components/configurator/Canvas8MartieConfigurator'));

import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
    title: "Canvas 8 Martie Personalizat",
    description: "Creează un cadou memorabil de 8 Martie. Tablou canvas personalizat cu fotografia și mesajul tău pentru mama, soție sau iubită. Calitate premium, preț instant.",
    keywords: ['8 martie', 'canvas 8 martie', 'cadou ziua femeii', 'cadou mama', 'tablou canvas personalizat', 'homeprint'],
    alternates: {
        canonical: 'https://www.HomePrint.ro/configurator/canvas-8-martie',
    },
};

export default function Canvas8MartiePage() {
    const breadcrumbItems = [
        { label: 'Configuratoare', href: '/shop' },
        { label: 'Canvas 8 Martie', href: '/configurator/canvas-8-martie' }
    ];

    return (
        <div className="pt-24 max-w-7xl mx-auto px-4">
            <Breadcrumbs items={breadcrumbItems} />
            <Suspense fallback={<div className="min-h-[60svh] flex items-center justify-center">Se încarcă configuratorul de 8 Martie...</div>}>
                <div className="min-h-screen bg-transparent pb-20">
                    <Canvas8MartieConfigurator />
                </div>
            </Suspense>
        </div>
    );
}
