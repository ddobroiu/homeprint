# Tema editorului online (/editor)

Editorul (`components/PrintEditor/*` + `lib/editor/*`) se copiază pe celelalte site-uri de print.
Aspectul vine **doar** din variabilele CSS definite în `components/PrintEditor/editor.css`, pe
clasele `.pe-root` (editorul) și `.pe-theme` (ecranul de start, scheletul de încărcare).

## Cum pui brandul altui site

Pe fiecare site diferă doar trei fișiere (restul editorului e identic cu ShopPrint):

- `components/PrintEditor/theme.css` — variabilele de mai jos, cu culorile din tokenii site-ului
  (`app/brand-design.css`, `[data-brand="..."]`); se încarcă după `editor.css`;
- `lib/editor/site.ts` — numele și linkul din bara de sus (`EDITOR_BRAND`), culoarea selecției,
  prefixul fișierelor exportate, ordinea produselor pe ecranul de start (`EDITOR_PRODUCT_ORDER`),
  titlul/descrierea paginii `/editor` și poze înlocuitoare (`EDITOR_IMAGE_OVERRIDES`);
- `lib/editor/templates/site.ts` — șabloanele proprii ale site-ului (ex. fonduri UE pe EuPrint,
  canvas-cadou pe Tablou / HomePrint), puse înaintea setului de bază al produsului.

```css
.pe-root,
.pe-theme {
    --pe-brand: #c2185b;        /* butonul principal, selecții, stări active */
    --pe-brand-strong: #8e0f43; /* hover pe butonul principal */
    --pe-brand-soft: #fde7f0;   /* fundalul stărilor active (unelte, chip-uri) */
    --pe-brand-muted: #f0a9c6;  /* contururi la hover */
    --pe-on-brand: #ffffff;     /* textul de pe culoarea brandului */
    --pe-radius: 14px;          /* colțurile cardurilor și panourilor */
    --pe-font: "Poppins", system-ui, sans-serif;
}
```

Poza fiecărui produs pe ecranul de start vine din registrul configuratoarelor
(`lib/configurators-registry.ts`, câmpul `image`), apoi din `lib/products/configurator-products.ts`
sau din `IMAGE_FALLBACK` din `lib/editor/products.ts`. Dimensiunile vin din
`lib/seo/standardSizes.ts` (aceleași pe cele 6 site-uri) și din constantele din `lib/pricing.ts`.

## Variabile

| Variabilă | Rol |
| --- | --- |
| `--pe-brand` | culoarea principală (buton „Adaugă în coș”, unealta activă, selecția) |
| `--pe-brand-strong` | hover / apăsat pe culoarea principală |
| `--pe-brand-soft` | fundal pentru stări active, insigne |
| `--pe-brand-muted` | contur la hover pe carduri și câmpuri |
| `--pe-on-brand` | text / iconițe peste culoarea principală |
| `--pe-accent`, `--pe-accent-soft` | accent secundar (rezervat, ex. promoții) |
| `--pe-bg` | fundalul ecranului de start |
| `--pe-surface`, `--pe-surface-2` | panouri, bare, carduri / câmpuri secundare |
| `--pe-canvas`, `--pe-canvas-dot` | fundalul planșei și punctele grilei |
| `--pe-hover` | fundalul butoanelor la hover |
| `--pe-border`, `--pe-border-strong` | linii de separare / contururi de câmpuri |
| `--pe-text`, `--pe-text-2`, `--pe-muted`, `--pe-subtle` | textul (de la principal la discret) |
| `--pe-danger(-soft)`, `--pe-ok(-soft)`, `--pe-warn(-soft)` | verificarea pentru print, DPI, ștergere |
| `--pe-guide-trim`, `--pe-guide-safe`, `--pe-guide-nogo` | ghidajele: tăiere/bleed, zona sigură, zona interzisă (caseta roll-up) |
| `--pe-radius`, `--pe-radius-sm` | colțuri mari (carduri, panouri) / mici (butoane, câmpuri) |
| `--pe-font`, `--pe-font-display` | fontul interfeței / al titlurilor de panou |
| `--pe-shadow-sm`, `--pe-shadow`, `--pe-shadow-lg` | umbrele (carduri, meniuri, ferestre) |
| `--pe-ease` | curba animațiilor (panouri, meniuri) |

Variabilele nu afectează **designul tipărit** (culorile șabloanelor sunt în
`lib/editor/templates/*`), doar interfața.

## Clase utilitare (editor.css)

`pe-btn` + `pe-btn-primary | pe-btn-secondary | pe-btn-ghost`, `pe-icon-btn` (cu `aria-pressed` sau
`is-active`), `pe-chip`, `pe-card` + `pe-card-media` (miniaturi cu ridicare la hover),
`pe-panel-title`, `pe-section-label`, `pe-pop` (meniuri plutitoare), `pe-skeleton` (încărcare),
`pe-glass` (bare translucide pe mobil), `pe-anim-panel | pe-anim-sheet | pe-anim-fade`.
Animațiile se opresc automat la `prefers-reduced-motion`.

## Șabloanele

Câte un fișier pe familie de produse în `lib/editor/templates/` (banner, roll-up, afiș, flyer,
carte de vizită, autocolant, canvas, panouri, mesh, altele) + `generic.ts` („Alte șabloane”).
Maparea produs → set e în `PRODUCT_TEMPLATE_SETS` (`templates/index.ts`). Zonele speciale
(caseta roll-up-ului) sunt în `lib/editor/zones.ts`.
