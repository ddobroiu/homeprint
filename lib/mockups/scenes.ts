// Scenele pentru "Vezi pe produs" (machete realiste). Imaginile de baza sunt generate de noi
// (vezi public/mockups/README.md si scripts/mockups/). Geometria (colturile zonei de tipar,
// latura de canvas) e calculata automat de scripts/mockups/process-scenes.mjs in scene-geometry.json.
// Fisier fara importuri, ca sa poata fi folosit si de scripturile Node (contact sheets).

export type MockupFamily =
    | "banner"
    | "banner-verso"
    | "mesh"
    | "rollup"
    | "tricouri"
    | "hanorace"
    | "sepci"
    | "canvas"
    | "afise"
    | "autocolante"
    | "carti-vizita"
    | "flayere"
    | "pliante"
    | "tapet"
    | "window-graphics"
    | "panouri"
    | "fonduri-eu";

/**
 * Ce se vede in zona de tipar unde nu e grafica (produs cu alta proportie decat scena, PNG transparent):
 * - material: materialul alb al produsului (banner, roll-up, tapet), cu umbrirea scenei;
 * - fabric: tesatura din jurul zonei (tricou, hanorac), cu faldurile scenei;
 * - background: fundalul reconstruit (perete, laptop, masa) + umbra produsului.
 */
export type MockupSurround = "material" | "fabric" | "background";

export type MockupSceneConfig = {
    id: string;
    label: string;
    families: MockupFamily[];
    surround: MockupSurround;
    /** culoarea materialului pentru surround=material (implicit alb hartie) */
    material?: string;
    /** deplasare (px la 1200 px) dupa faldurile din harta de umbrire: 0 = rigid */
    displace?: number;
    /** cat se vede fundalul prin material (mesh perforat) */
    seeThrough?: number;
    /** umbra produsului pe fundal (surround=background), 0..1, implicit 0.3 */
    shadow?: number;
    /** unde se lipeste produsul cand e mai mic decat zona (tinut in mana: spre degete) */
    anchor?: { u?: number; v?: number };
    /** proportia reala a produsului din scena, daca cea estimata din perspectiva nu e buna */
    aspect?: number;
};

export const MOCKUP_SCENES: MockupSceneConfig[] = [
    { id: "banner-gard", label: "Banner pe gard", families: ["banner", "banner-verso", "mesh"], surround: "material", displace: 2 },
    { id: "banner-fatada", label: "Banner pe fațadă", families: ["banner", "banner-verso"], surround: "material", displace: 1 },
    { id: "banner-schela", label: "Banner pe schelă", families: ["banner", "mesh"], surround: "material", displace: 4 },
    { id: "banner-eveniment", label: "Banner la eveniment", families: ["banner", "banner-verso"], surround: "material", displace: 5 },
    { id: "mesh-santier", label: "Mesh pe gard de șantier", families: ["mesh", "banner"], surround: "material", displace: 2, seeThrough: 0.12 },
    { id: "mesh-cladire", label: "Mesh pe clădire", families: ["mesh"], surround: "material", displace: 1, seeThrough: 0.1 },
    { id: "rollup-hol", label: "Roll-up în recepție", families: ["rollup"], surround: "material", displace: 0 },
    { id: "rollup-expo", label: "Roll-up la expoziție", families: ["rollup"], surround: "material", displace: 0 },
    { id: "tricou-flat", anchor: { v: 0.12 }, label: "Tricou alb (flat lay)", families: ["tricouri"], surround: "fabric", displace: 3 },
    { id: "tricou-purtat", anchor: { v: 0.12 }, label: "Tricou alb purtat", families: ["tricouri"], surround: "fabric", displace: 3 },
    { id: "hanorac", anchor: { v: 0.3 }, label: "Hanorac gri", families: ["hanorace"], surround: "fabric", displace: 3 },
    { id: "sapca", label: "Șapcă albă", families: ["sepci"], surround: "fabric", displace: 3 },
    { id: "canvas-living", shadow: 0.38, label: "Canvas în living", families: ["canvas"], surround: "background", displace: 0 },
    { id: "canvas-dormitor", shadow: 0.38, label: "Canvas în dormitor", families: ["canvas"], surround: "background", displace: 0 },
    { id: "canvas-patrat", shadow: 0.38, label: "Canvas pe perete", families: ["canvas"], surround: "background", displace: 0 },
    { id: "afis-rama", shadow: 0.15, label: "Afiș înrămat", families: ["afise"], surround: "background", displace: 0 },
    { id: "afis-panou", label: "Afiș pe avizier", families: ["afise", "flayere"], surround: "background", displace: 1 },
    { id: "sticker-laptop", shadow: 0.06, label: "Autocolant pe laptop", families: ["autocolante"], surround: "background", displace: 0 },
    { id: "sticker-vitrina", shadow: 0.04, label: "Autocolant pe vitrină", families: ["autocolante", "window-graphics"], surround: "background", displace: 0 },
    { id: "sticker-cutie", shadow: 0.06, label: "Autocolant pe colet", families: ["autocolante"], surround: "background", displace: 0 },
    { id: "carte-birou", label: "Carte de vizită pe birou", families: ["carti-vizita"], surround: "background", displace: 0 },
    { id: "carte-mana", anchor: { u: 0, v: 0.5 }, label: "Carte de vizită în mână", families: ["carti-vizita"], surround: "background", displace: 0 },
    { id: "flyer-masa", label: "Flyer pe masă", families: ["flayere", "pliante"], surround: "background", displace: 0 },
    { id: "flyer-mana", anchor: { u: 0.5, v: 1 }, label: "Flyer în mână", families: ["flayere", "pliante", "afise"], surround: "background", displace: 1 },
    { id: "pliant-masa", label: "Pliant pe birou", families: ["pliante", "flayere"], surround: "background", displace: 0 },
    { id: "tapet-camera", label: "Tapet în cameră", families: ["tapet"], surround: "material", displace: 0 },
    { id: "geam-vitrina", label: "Vitrină colantată", families: ["window-graphics", "autocolante"], surround: "material", displace: 0 },
    { id: "panou-perete", label: "Panou pe perete", families: ["panouri", "fonduri-eu"], surround: "background", displace: 0 },
    { id: "panou-receptie", label: "Plexiglas în recepție", families: ["panouri"], surround: "background", displace: 0 },
    { id: "panou-stalpi", label: "Panou pe stâlpi", families: ["fonduri-eu", "panouri"], surround: "background", displace: 0 },
];
