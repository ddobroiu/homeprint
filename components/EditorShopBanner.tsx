import Link from "next/link";
import { PenTool } from "lucide-react";

/** /shop: intrarea în editorul online (culorile din tokenii brandului, app/brand-design.css). */
export default function EditorShopBanner() {
    return (
        <Link
            href="/editor"
            className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-[color:var(--design-line,#dce3e9)] bg-[color:var(--design-soft,#eaf0fa)] px-4 py-3 text-[color:var(--design-ink,#172534)] transition hover:border-[color:var(--design-accent,#254d8b)]"
        >
            <span className="flex items-center gap-3 text-sm">
                <PenTool className="h-5 w-5 shrink-0 text-[color:var(--design-accent,#254d8b)]" />
                <span>
                    <strong>Nu ai grafică?</strong> Creează designul online: șabloane, fonturi și pozele tale, la dimensiunea produsului.
                </span>
            </span>
            <span className="shrink-0 rounded-lg bg-[color:var(--design-accent,#254d8b)] px-3 py-1.5 text-xs font-bold text-white">Creează design</span>
        </Link>
    );
}
