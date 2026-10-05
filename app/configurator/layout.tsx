import Link from "next/link";
import { brandDesign } from "@/lib/brandDesign";
import BrandPageNote from "@/components/design/BrandPageNote";
export default function ConfiguratorLayout({ children }: { children: React.ReactNode }) { return (<div className="brand-configurator min-h-screen"><div className="brand-configurator-heading"><div className="design-wrap"><p>{brandDesign.name} / {brandDesign.label}</p><Link href="/#configuratoare">Vezi toate configuratoarele</Link></div></div>{children}<BrandPageNote /></div>); }