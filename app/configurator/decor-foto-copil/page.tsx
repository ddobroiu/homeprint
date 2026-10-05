import ChildPhotoConfigurator from "@/components/configurator/ChildPhotoConfigurator";
import type { Metadata } from "next";
export const metadata:Metadata={title:"Decor aniversar cu fotografia copilului",description:'La HomePrint, poza copilului tău devine un decor personal pentru aniversare. Selectează formatul potrivit petrecerii sau introdu exact dimensiunea dorită.',alternates:{canonical:"/configurator/decor-foto-copil"}};
export default function Page(){return <main className="mx-auto max-w-7xl px-4 pb-12 pt-28"><p className="mb-6 max-w-3xl text-slate-600">La HomePrint, poza copilului tău devine un decor personal pentru aniversare. Selectează formatul potrivit petrecerii sau introdu exact dimensiunea dorită.</p><ChildPhotoConfigurator/></main>;}
