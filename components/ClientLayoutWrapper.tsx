"use client";
import BrandPageNote from "@/components/design/BrandPageNote";


import dynamic from "next/dynamic";
import React from "react";
import { usePathname } from "next/navigation";


export default function ClientLayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isConfiguratorAlias = /^\/(banner|banner-verso|mesh|afise|autocolante|canvas|tapet|rollup|window-graphics|pliante|flayere|plexiglass|plexiglass-transparent|pvc-forex|alucobond|polipropilena|carton|tricouri|hanorace|sepci|carti-vizita)$/.test(pathname || "");
    const isFunctional = /^\/(configurator|cart|checkout|account|login|editor|admin)(\/|$)/.test(pathname || "");
    const isAdmin = pathname?.startsWith("/admin");

    if (isAdmin) {
        return <>{children}</>;
    }

    return (
        <>
            <div className={`site-content ${isConfiguratorAlias ? "site-functional brand-configurator" : isFunctional ? "site-functional" : "site-editorial"} min-h-screen flex flex-col w-full max-w-full [&>*]:w-full`}>{children}{isConfiguratorAlias && <BrandPageNote />}</div>
        </>
    );
}
