import ProdusNouPage, { produsNouMetadata } from "@/components/configurator/ProdusNouPage";

export const metadata = produsNouMetadata("panou-stradal");

export default function Page() {
    return <ProdusNouPage id="panou-stradal" />;
}
