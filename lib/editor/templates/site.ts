// Șabloanele proprii ale site-ului, puse înaintea setului de bază al produsului (templates/index.ts).
import type { Template } from "./kit";
import { CANVAS_CADOU_TEMPLATES } from "./canvas-cadou";

// Canvas-cadou (nuntă, botez, familie) înaintea colajelor de bază.
export const SITE_TEMPLATE_SETS: Record<string, Template[]> = { canvas: CANVAS_CADOU_TEMPLATES };
