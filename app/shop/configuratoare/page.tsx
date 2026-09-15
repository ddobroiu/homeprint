import { Metadata } from 'next';
import ConfiguratorShopClient from "@/components/ConfiguratorShopClient";

export const metadata: Metadata = {
    title: 'Configuratoare online pentru decor și print',
    description: 'Alege ce vrei pe perete și configurează online: fototapet, tablou canvas, postere, autocolante decorative, apoi bannere, roll-up și panouri rigide. Preț instant, fără cerere de ofertă.',
    keywords: ['configurator fototapet', 'configurator canvas', 'postere personalizate', 'autocolante decorative', 'homeprint'],
    alternates: {
        canonical: '/shop/configuratoare',
    },
};

export default function ConfiguratorShopPage() {
    return <ConfiguratorShopClient />;
}
