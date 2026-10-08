import Image from "next/image";
import { countyImageAltForLocality, countyImageCaption, getCountyImage } from "@/lib/seo/countyImages";

// Ilustrația județului (reperul reședinței pe produsul site-ului), randată pe server.
// Apare pe pagina județului și pe toate paginile localităților din județ.
// Dacă site-ul nu are încă imaginea județului (manifestul lib/seo/data/countyImages.json),
// nu randează nimic: fără imagine stricată și fără cerere 404.
type Props = {
    judetSlug: string;
    judetName: string;
    /** Pe paginile localităților: alt-ul menționează localitatea. */
    locName?: string;
    /** Doar pe pagina județului, unde imaginea e în primul ecran pe desktop. */
    preload?: boolean;
    sizes?: string;
    className?: string;
};

export default function CountyIllustration({ judetSlug, judetName, locName, preload = false, sizes, className }: Props) {
    const img = getCountyImage(judetSlug);
    if (!img) return null;
    const alt = locName ? countyImageAltForLocality(img, judetSlug, judetName, locName) : img.alt;
    return (
        <figure className={className}>
            <Image
                src={img.src}
                alt={alt}
                width={img.width}
                height={img.height}
                sizes={sizes ?? "(max-width: 1024px) 100vw, 480px"}
                preload={preload}
                loading={preload ? undefined : "lazy"}
                className="h-auto w-full rounded-2xl bg-slate-100 object-cover shadow-sm"
            />
            <figcaption className="mt-2 text-xs text-slate-500">{countyImageCaption(img, judetSlug, judetName)}</figcaption>
        </figure>
    );
}
