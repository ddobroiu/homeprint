import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { brandDesign } from "@/lib/brandDesign";

export default function BrandPageNote() {
  return <aside className="design-page-note"><div className="design-wrap"><div><span className="design-kicker">{brandDesign.name} · Înainte de comandă</span><h2>{brandDesign.storyTitle}</h2><p>{brandDesign.story}</p></div><Link href="/pregatire-fisiere" className="design-text-link">Pregătește fișierul <ArrowUpRight size={18} /></Link></div></aside>;
}
