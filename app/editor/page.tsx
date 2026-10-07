import { Metadata } from "next";
import { Suspense } from "react";
import PrintEditorLoader from "@/components/PrintEditor/Loader";
import { buildEditorProducts } from "@/lib/editor/products";
import { EDITOR_BRAND, EDITOR_META } from "@/lib/editor/site";

export const metadata: Metadata = {
    title: EDITOR_META.title,
    description: EDITOR_META.description,
    alternates: { canonical: "/editor" },
};

export default function EditorPage() {
    const products = buildEditorProducts();
    return (
        <Suspense fallback={<div className="flex h-[100svh] items-center justify-center" style={{ background: EDITOR_BRAND.bg, color: EDITOR_BRAND.color }}>Se încarcă editorul…</div>}>
            <PrintEditorLoader products={products} />
        </Suspense>
    );
}
