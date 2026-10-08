import ProdusNouPage, { produsNouMetadata } from "@/components/configurator/ProdusNouPage";

export const metadata = produsNouMetadata("calendare");

export default function Page() {
    return <ProdusNouPage id="calendare" />;
}
