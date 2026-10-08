import ProdusNouPage, { produsNouMetadata } from "@/components/configurator/ProdusNouPage";

export const metadata = produsNouMetadata("beachflag");

export default function Page() {
    return <ProdusNouPage id="beachflag" />;
}
