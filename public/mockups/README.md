# Machete de produs ("Vezi pe produs")

Scenele din acest folder sunt **generate de noi** cu modelul de imagini OpenAI `gpt-image-2` (calitate high), pe 07.10.2026, prin `scripts/mockups/generate-scenes.mjs` cu cheia OpenAI a proiectului. Nu conțin fotografii de stoc sau imagini ale altora. Conform termenilor OpenAI, drepturile asupra imaginilor generate aparțin utilizatorului (noi); le folosim pe site-urile proprii, fără restricții de licență de la terți. Scenele nu conțin persoane identificabile (fără fețe), mărci sau texte lizibile.

## Fișiere

- `<id>.webp` – fotografia scenei (≤ 200 KB), cu zona de tipar reconstruită din fundal;
- `<id>-fx.webp` – harta pentru randare: R = umbrire, G = luciu, B = latura canvasului (255) / fundal lângă produs (128), A = acoperire;
- geometria (colțurile zonei, latura canvas, culoarea și granulația țesăturii) e în `lib/mockups/scene-geometry.json`; setările scenelor în `lib/mockups/scenes.ts`.

## Variante goale (textile)

Pentru tricou, hanorac și șapcă am cerut modelului (edit cu mască, tot `gpt-image-2`, `scripts/mockups/empty-scenes.mjs`) aceeași fotografie fără zona de print. Sub grafică se vede astfel țesătura reală, cu faldurile ei, iar umbrirea graficii vine din aceleași falduri.

## Refacere

Scripturile (`scripts/mockups/`) sunt în repo-ul ShopPrint (`shopprint-main`); de acolo se copiază aici fișierele din `public/mockups/` și `lib/mockups/`.

```
node scripts/mockups/generate-scenes.mjs --only <id>   # PNG brut în ../_mockups-surse/ (în afara repo-ului)
node scripts/mockups/empty-scenes.mjs --only <id>      # (textile) varianta fără zona de print
node scripts/mockups/process-scenes.mjs --only <id>    # webp + hartă + geometrie
node scripts/mockups/contact-sheets.mjs                # verificare vizuală cu 3 grafici de probă
```

## Prompturi

La fiecare prompt se adaugă regula comună:

> Photorealistic professional product mockup photograph, natural light, realistic materials, sharp focus, high detail. IMPORTANT: the printable surface described below is completely blank and filled edge to edge with one flat uniform pure magenta color (#FF00FF), like a chroma-key screen: no text, no logo, no pattern, no graphics, no border on it. Keep the realistic lighting, soft shadows, folds and shading on the magenta surface. The magenta surface must be fully visible (not cut by the image edge). No other magenta, pink or purple objects anywhere in the scene. No people's faces, no brand names, no readable text, no watermark.

- **banner-gard** (1536x1024): A wide horizontal PVC banner (about 3 times wider than tall) stretched flat and tight on a green metal wire-mesh fence beside an outdoor sports field on a sunny day, fixed with black zip ties through round metal eyelets at the corners and along the edges. Front view, slightly from the left. The banner face is the magenta surface; the metal eyelets stay silver.
- **banner-fatada** (1536x1024): A long horizontal PVC banner (about 4 times wider than tall) mounted flat on the facade above the glass entrance of a small modern shop on a city street, daytime, seen from the sidewalk slightly from the right. The banner face is the magenta surface, with small silver eyelets at the corners.
- **banner-schela** (1536x1024): A huge rectangular PVC banner (about 1.5 times wider than tall) tied onto metal scaffolding that covers the front of an old city building under renovation, seen from the street, slight upward perspective, clear sky. The banner face is the magenta surface, slightly wavy from the wind, scaffolding poles visible around its edges.
- **banner-eveniment** (1536x1024): A horizontal PVC banner (about 2 times wider than tall) hung with ropes between two metal poles at an outdoor festival on grass, people blurred far in the background (no faces visible), summer afternoon. The banner face is the magenta surface, with gentle waves and soft folds, silver eyelets at the corners.
- **mesh-santier** (1536x1024): A long mesh banner (about 4 times wider than tall) attached to temporary galvanized construction-site fence panels in front of a building under construction with a crane in the distance, overcast day, seen from the street at a slight angle. The mesh banner face is the magenta surface, tied with zip ties.
- **mesh-cladire** (1536x1024): A giant mesh advertising banner (roughly square, slightly wider than tall) covering the blank side wall of a multi-storey city building, seen from the street below with mild upward perspective, blue sky. The mesh banner face is the magenta surface.
- **rollup-hol** (1024x1536): A single roll-up banner stand (85 cm wide, 200 cm tall, silver aluminium cassette base on the floor) standing in a bright modern office lobby with a reception desk and plants, front view. The whole printed graphic panel of the roll-up is the magenta surface; the silver cassette base and the top bar stay metallic.
- **rollup-expo** (1024x1536): A single roll-up banner stand (85 cm wide, 200 cm tall, silver aluminium cassette base) standing at a conference or trade-fair booth on carpet, soft event lighting, blurred background with no faces, front view slightly from the left. The printed graphic panel is the magenta surface; cassette base and top bar stay metallic.
- **tricou-flat** (1024x1536): A plain white cotton crew-neck t-shirt laid flat on a light oak table, top-down view, natural fabric folds and wrinkles. On the chest there is one large rectangular print area (portrait, about 3:4) that is the magenta surface, printed on the fabric, following the folds and wrinkles of the cloth.
- **tricou-purtat** (1024x1536): Torso of a person wearing a plain white cotton crew-neck t-shirt, cropped from the chin down to the waist (no face), arms relaxed, light grey studio background, soft studio light, natural fabric folds. On the chest there is a large rectangular print area (portrait, about 3:4) that is the magenta surface, printed on the fabric and following its folds.
- **hanorac** (1024x1536): A heather light-grey hoodie with a hood and front kangaroo pocket hanging on a wooden hanger against a white brick wall, front view, natural fabric folds. On the chest above the pocket there is a rectangular print area (about 4:3 landscape) that is the magenta surface, printed on the fabric and following its folds.
- **sapca** (1024x1024): A plain white six-panel baseball cap with a curved brim on a light wooden table, three-quarter front view. The front panel of the cap above the brim carries one rectangular print patch (about 2:1 landscape) that is the magenta surface, curved with the panel.
- **canvas-living** (1536x1024): A stretched canvas print (landscape, 3:2) with 3 cm deep edges hanging on a warm light-beige wall above a grey sofa in a cozy modern living room, seen slightly from the left so the right side edge of the canvas is visible. The front face of the canvas is the magenta surface; the visible side edge of the canvas is pure cyan (#00FFFF). The canvas casts a soft shadow on the wall.
- **canvas-dormitor** (1024x1536): A stretched canvas print (portrait, 2:3) with 3 cm deep edges hanging on a white wall above a bed with linen bedding in a calm Scandinavian bedroom, seen slightly from the right so the left side edge of the canvas is visible. The front face of the canvas is the magenta surface; the visible side edge is pure cyan (#00FFFF). Soft shadow on the wall.
- **canvas-patrat** (1024x1024): A square stretched canvas print (1:1) with 3 cm deep edges on a sage green wall above a wooden sideboard with a vase and books, seen slightly from the left so the right side edge of the canvas is visible. The front face of the canvas is the magenta surface; the visible side edge is pure cyan (#00FFFF). Soft shadow on the wall.
- **afis-rama** (1024x1536): A portrait poster (A2, ratio 1:1.414) in a thin black frame with a white passe-partout hanging on a light grey wall in a modern cafe, soft daylight, front view. The poster inside the passe-partout is the magenta surface.
- **afis-panou** (1024x1536): A portrait paper poster (ratio 1:1.414) pinned with four push pins on a cork notice board in a school or office hallway, front view slightly from the right. The poster is the magenta surface with very slight paper waviness.
- **sticker-laptop** (1536x1024): A closed silver aluminium laptop lying on a white desk, three-quarter top view, with one square vinyl sticker (with slightly rounded corners) stuck flat in the middle of the lid. The sticker is the magenta surface, with a subtle glossy reflection.
- **sticker-vitrina** (1536x1024): The glass door of a small shop seen from the street, with one large square vinyl sticker applied on the glass at eye level, reflections of the street faint on the glass around it. The sticker is the magenta surface.
- **sticker-cutie** (1024x1024): A brown kraft cardboard shipping box on a light table, three-quarter view, with one square vinyl label sticker applied flat on the top of the box. The sticker is the magenta surface.
- **carte-birou** (1536x1024): A single business card (85 x 55 mm, landscape) lying on a dark walnut desk next to a pen, a coffee cup and a small plant, top-down view with soft window light. The front of the business card is the magenta surface; a small stack of cards beside it is white.
- **carte-mana** (1536x1024): A hand holding one business card (85 x 55 mm, landscape) between thumb and fingers, toward the camera, blurred office background, no face. The front of the business card is the magenta surface; the thumb slightly overlaps one edge of the card.
- **flyer-masa** (1024x1536): A single A5 paper flyer (portrait, 1:1.414) lying on a light marble cafe table next to a cup of espresso and a croissant, top-down view, soft daylight. The flyer is the magenta surface.
- **flyer-mana** (1024x1536): A hand holding one A5 paper flyer (portrait, 1:1.414) up toward the camera, blurred street background, no face visible. The flyer is the magenta surface; fingers hold it at the bottom edge.
- **pliant-masa** (1536x1024): An open A4 brochure sheet (landscape, 1.414:1) lying flat on a white office desk with a laptop corner, glasses and a pen, top-down view, soft light, with faint vertical fold lines. The sheet is the magenta surface.
- **tapet-camera** (1536x1024): A modern living room with one full feature wall covered with wallpaper, a low wooden sideboard, a floor lamp and a plant in front of it, front view. The whole wallpapered feature wall (rectangular, about 3:2) is the magenta surface; the furniture stands in front of it.
- **geam-vitrina** (1536x1024): The large rectangular glass shop window of a street-level store (about 2:1 landscape), seen from the sidewalk at a slight angle, fully covered with a window graphic vinyl. The window graphic is the magenta surface; the window frame is dark grey aluminium.
- **panou-perete** (1536x1024): A rigid rectangular sign panel (aluminium composite, about 3:2 landscape) mounted with four steel standoffs on a red brick wall next to a shop entrance, daytime, front view slightly from the left. The sign face is the magenta surface; the standoffs stay metallic.
- **panou-receptie** (1536x1024): A clear acrylic plexiglass sign (about 2:1 landscape) mounted with four chrome standoffs on a white wall behind a modern reception desk, warm indoor lighting, front view. The printed sign face is the magenta surface, with a slim glossy acrylic edge and a soft shadow on the wall.
- **panou-stalpi** (1536x1024): A rectangular project information board (about 3:2 landscape) mounted on two metal posts beside the entrance of a construction site or renovated public building, daytime, front view. The board face is the magenta surface.
