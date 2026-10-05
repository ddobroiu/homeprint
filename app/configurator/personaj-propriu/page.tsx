import OwnCharacterConfigurator from "@/components/configurator/OwnCharacterConfigurator";
import type { Metadata } from "next";
export const metadata:Metadata={title:"Personaj propriu pe PVC — încărcare și decupare pe contur",description:"HomePrint îți permite să pornești de la propria imagine de personaj. Selectează dimensiunea și trimite detaliile pentru pregătirea unui decor PVC personal.",alternates:{canonical:"/configurator/personaj-propriu"}};
export default function Page(){return <main className="mx-auto max-w-7xl px-4 pb-12 pt-28"><p className="mb-6 max-w-3xl text-slate-600">HomePrint îți permite să pornești de la propria imagine de personaj. Selectează dimensiunea și trimite detaliile pentru pregătirea unui decor PVC personal.</p><OwnCharacterConfigurator/></main>;}
