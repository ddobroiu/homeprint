/**
 * Încărcarea pozei clientului (configuratorul de canvas) prin /api/upload.
 *
 * Pozele ajung în Cloudinary, unde planul actual primește cel mult 10 MB și 25 MP pe imagine
 * (vezi media_limits în /usage). Pozele mari din telefon sau aparat (peste 10 MB sau 25 MP)
 * erau refuzate, iar clientul rămânea fără poză în configurator. Aici le micșorăm în browser
 * doar când trec de aceste limite: 16 MP ajung pentru un canvas mare (100×150 cm la ~80 dpi)
 * și sunt și limita de suprafață a unui <canvas> în Safari pe iPhone.
 */
const MAX_BYTES = 9.5 * 1024 * 1024;
const MAX_UPLOAD_PX = 25_000_000;
const RESIZE_TO_PX = 16_000_000;
const RESIZABLE = /^image\/(jpeg|jpg|png|webp)$/i;

function canvasToBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob | null> {
    return new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
}

/** Întoarce fișierul neschimbat dacă se încadrează în limite; altfel un JPEG micșorat. */
export async function prepareArtworkImage(file: File): Promise<File> {
    if (!RESIZABLE.test(file.type) || typeof createImageBitmap !== "function") return file;

    let bitmap: ImageBitmap;
    try {
        bitmap = await createImageBitmap(file);
    } catch {
        return file; // browserul nu o poate citi; o trimitem așa cum e
    }

    try {
        const px = bitmap.width * bitmap.height;
        if (file.size <= MAX_BYTES && px <= MAX_UPLOAD_PX) return file;

        const scale = Math.min(1, Math.sqrt(RESIZE_TO_PX / px));
        const w = Math.max(1, Math.round(bitmap.width * scale));
        const h = Math.max(1, Math.round(bitmap.height * scale));
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return file;
        ctx.fillStyle = "#ffffff"; // PNG cu transparență: fundal alb, ca la print
        ctx.fillRect(0, 0, w, h);
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(bitmap, 0, 0, w, h);

        let blob: Blob | null = null;
        for (const q of [0.92, 0.86, 0.8, 0.72]) {
            blob = await canvasToBlob(canvas, q);
            if (blob && blob.size <= MAX_BYTES) break;
        }
        if (!blob || blob.size > MAX_BYTES) return file;

        const name = (file.name || "poza").replace(/\.[^.]+$/, "") + ".jpg";
        return new File([blob], name, { type: "image/jpeg", lastModified: Date.now() });
    } finally {
        bitmap.close();
    }
}

/** Încarcă poza (micșorată doar dacă e nevoie) și întoarce adresa ei. Aruncă o eroare cu mesaj pentru client. */
export async function uploadArtworkImage(file: File): Promise<string> {
    const prepared = await prepareArtworkImage(file);
    const form = new FormData();
    form.append("file", prepared);

    let res: Response;
    try {
        res = await fetch("/api/upload", { method: "POST", body: form });
    } catch {
        throw new Error("Poza nu s-a putut încărca. Verifică conexiunea la internet și încearcă din nou.");
    }

    const data = await res.json().catch(() => null);
    if (!res.ok || !data?.url) {
        if (res.status === 413 || /too large|file size/i.test(String(data?.error ?? ""))) {
            throw new Error("Poza este prea mare. Încearcă un fișier sub 10 MB sau trimite-o pe WhatsApp.");
        }
        throw new Error("Poza nu s-a putut încărca. Încearcă din nou sau trimite-o pe WhatsApp.");
    }
    return String(data.url);
}

/**
 * Adresa pe care browserul o poate afișa: TIFF și HEIC (formate acceptate la încărcare) nu se văd
 * în Chrome, așa că pentru previzualizare cerem de la Cloudinary aceeași poză ca JPEG.
 * Comanda păstrează fișierul original.
 */
export function browserImageUrl(url: string): string {
    if (!/^https:\/\/res\.cloudinary\.com\//i.test(url)) return url;
    return url.replace(/\.(tiff?|heic|heif)(\?.*)?$/i, ".jpg$2");
}
