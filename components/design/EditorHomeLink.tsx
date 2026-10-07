import Link from "next/link";
import { ArrowUpRight, PenTool } from "lucide-react";

/** Homepage: legătura spre editorul online, sub butoanele din hero. */
export default function EditorHomeLink({ className = "design-text-link" }: { className?: string }) {
    return (
        <Link href="/editor" className={className} style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 14 }}>
            <PenTool size={19} /> Nu ai grafică? Creeaz-o în editorul online <ArrowUpRight size={17} />
        </Link>
    );
}
