// Continutul meniului mobil (components/MobileMenu.tsx). Componenta e identica pe toate
// site-urile de print; aici stau doar datele specifice site-ului: categoriile din grila,
// butoanele mari si linkurile secundare. Culorile vin din variabilele [data-brand]
// din app/brand-design.css, contactul din lib/siteConfig.ts.
import type { LucideIcon } from "lucide-react";
import { Wallpaper, Image as ImageIcon, FileImage, Sticker, Square, Flag, GalleryVertical, IdCard, Shirt } from "lucide-react";

export type MobileMenuLink = { label: string; href: string };
export type MobileMenuCategory = MobileMenuLink & { icon: LucideIcon };
export type MobileMenuAction = MobileMenuLink & { hint: string };

export const mobileMenu: {
    categories: MobileMenuCategory[];
    editor: MobileMenuAction | null;
    prices: MobileMenuAction;
    secondary: MobileMenuLink[];
    whatsapp: string;
} = {
    categories: [
        { label: "Fototapet", href: "/tapet", icon: Wallpaper },
        { label: "Tablouri canvas", href: "/canvas", icon: ImageIcon },
        { label: "Postere", href: "/afise", icon: FileImage },
        { label: "Autocolante de perete", href: "/autocolante", icon: Sticker },
        { label: "Plexiglas", href: "/materiale/plexiglass", icon: Square },
        { label: "Bannere", href: "/banner", icon: Flag },
        { label: "Roll-up", href: "/rollup", icon: GalleryVertical },
        { label: "Cărți de vizită", href: "/carti-vizita", icon: IdCard },
        { label: "Textile", href: "/tricouri", icon: Shirt },
    ],
    editor: { label: "Creează design online", href: "/editor", hint: "Șabloane gata făcute, fișier gata de tipar" },
    prices: { label: "Calculează prețul", href: "/configuratoare", hint: "Preț instant pentru orice produs" },
    secondary: [
        { label: "Despre noi", href: "/despre-noi" },
        { label: "Livrare și termene", href: "/livrare" },
        { label: "Urmărește comanda", href: "/urmareste-comanda" },
        { label: "Întrebări și ghid de print", href: "/ghid-print" },
        { label: "Contact", href: "/contact" },
    ],
    whatsapp: "40750473111",
};
