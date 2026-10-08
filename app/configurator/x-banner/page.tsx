import ProdusNouPage, { produsNouMetadata } from "@/components/configurator/ProdusNouPage";

export const metadata = produsNouMetadata("x-banner");

export default function Page() {
    return <ProdusNouPage id="x-banner" />;
}
