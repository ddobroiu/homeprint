// E-mailurile către client după comandă: AWB emis (DPD / FAN) și factura încărcată manual.
// FIȘIER IDENTIC PE TOATE CELE 6 SITE-URI DE PRINT. Funcții pure (fără trimitere, fără bază de date).
// Comenzile de pe shopprint.eu (procesate din adminul shopprint) primesc textul în limba clientului
// (Order.marketing.lang); restul, în română, cu marca site-ului comenzii și datele firmei în subsol.
import { escapeHtml, getConfigForSource, getPremiumHtmlTemplate } from '@/lib/email';
import { COMPANY } from '@/lib/company';

export type MailParts = { subject: string; html: string };

const EU_LANGS = ['en', 'de', 'fr', 'it', 'es', 'nl', 'pl', 'hu', 'cs'] as const;
type EuLang = (typeof EU_LANGS)[number];

/** Limba e-mailului: limba clientului pentru shopprint.eu, altfel română. */
export function orderMailLang(source?: string | null, marketing?: unknown): 'ro' | EuLang {
    if (!String(source || '').toLowerCase().includes('shopprint.eu')) return 'ro';
    const l = String((marketing as any)?.lang || '').toLowerCase();
    return (EU_LANGS as readonly string[]).includes(l) ? (l as EuLang) : 'en';
}

/** Adresa „De la”: numele site-ului comenzii + adresa de trimitere a serverului. */
export function orderMailFrom(source?: string | null, fallbackEmail?: string): string {
    const config = getConfigForSource(source);
    const name = orderMailLang(source) === 'ro' ? config.name : 'ShopPrint.eu';
    return `${name} <${process.env.EMAIL_FROM || fallbackEmail || config.email}>`;
}

const firstName = (n?: string | null) => String(n || '').trim().split(/\s+/)[0] || '';

type EuText = {
    shipSubject: string; // {no} {carrier}
    shipTitle: string;
    hello: string; // {name}
    helloNoName: string;
    shipBody: string; // {no} {carrier}
    awbLabel: string;
    track: string;
    invSubject: string; // {no}
    invBody: string; // {no}
    invButton: string;
    questions: string;
    signature: string;
};

// Texte scurte, în tonul e-mailului de confirmare de pe shopprint.eu (messages/*.json).
const EU: Record<EuLang, EuText> = {
    en: { shipSubject: 'Your order #{no} has been shipped ({carrier})', shipTitle: 'Your order is on its way', hello: 'Hello {name},', helloNoName: 'Hello,', shipBody: 'your order #{no} has been handed over to {carrier}.', awbLabel: 'Tracking number', track: 'Track your parcel', invSubject: 'Invoice for your order #{no} – ShopPrint.eu', invBody: 'please find the invoice for your order #{no} below.', invButton: 'Download the invoice', questions: 'Questions? Just reply to this email.', signature: 'The ShopPrint.eu team' },
    de: { shipSubject: 'Ihre Bestellung #{no} wurde versandt ({carrier})', shipTitle: 'Ihre Bestellung ist unterwegs', hello: 'Hallo {name},', helloNoName: 'Hallo,', shipBody: 'Ihre Bestellung #{no} wurde an {carrier} übergeben.', awbLabel: 'Sendungsnummer', track: 'Sendung verfolgen', invSubject: 'Rechnung zu Ihrer Bestellung #{no} – ShopPrint.eu', invBody: 'hier finden Sie die Rechnung zu Ihrer Bestellung #{no}.', invButton: 'Rechnung herunterladen', questions: 'Fragen? Antworten Sie einfach auf diese E-Mail.', signature: 'Ihr ShopPrint.eu-Team' },
    fr: { shipSubject: 'Votre commande n° {no} a été expédiée ({carrier})', shipTitle: 'Votre commande est en route', hello: 'Bonjour {name},', helloNoName: 'Bonjour,', shipBody: 'votre commande n° {no} a été remise à {carrier}.', awbLabel: 'Numéro de suivi', track: 'Suivre mon colis', invSubject: 'Facture de votre commande n° {no} – ShopPrint.eu', invBody: 'vous trouverez ci-dessous la facture de votre commande n° {no}.', invButton: 'Télécharger la facture', questions: 'Une question ? Répondez simplement à cet e-mail.', signature: 'L’équipe ShopPrint.eu' },
    it: { shipSubject: 'Il tuo ordine n. {no} è stato spedito ({carrier})', shipTitle: 'Il tuo ordine è in viaggio', hello: 'Ciao {name},', helloNoName: 'Ciao,', shipBody: 'il tuo ordine n. {no} è stato affidato a {carrier}.', awbLabel: 'Numero di tracciamento', track: 'Traccia il pacco', invSubject: 'Fattura del tuo ordine n. {no} – ShopPrint.eu', invBody: 'qui sotto trovi la fattura del tuo ordine n. {no}.', invButton: 'Scarica la fattura', questions: 'Domande? Rispondi pure a questa e-mail.', signature: 'Il team di ShopPrint.eu' },
    es: { shipSubject: 'Tu pedido n.º {no} ha sido enviado ({carrier})', shipTitle: 'Tu pedido está en camino', hello: 'Hola, {name}:', helloNoName: 'Hola:', shipBody: 'Tu pedido n.º {no} se ha entregado a {carrier}.', awbLabel: 'Número de seguimiento', track: 'Seguir el paquete', invSubject: 'Factura de tu pedido n.º {no} – ShopPrint.eu', invBody: 'Aquí tienes la factura de tu pedido n.º {no}.', invButton: 'Descargar la factura', questions: '¿Dudas? Responde a este e-mail.', signature: 'El equipo de ShopPrint.eu' },
    nl: { shipSubject: 'Je bestelling #{no} is verzonden ({carrier})', shipTitle: 'Je bestelling is onderweg', hello: 'Hallo {name},', helloNoName: 'Hallo,', shipBody: 'je bestelling #{no} is overgedragen aan {carrier}.', awbLabel: 'Trackingnummer', track: 'Volg je pakket', invSubject: 'Factuur voor je bestelling #{no} – ShopPrint.eu', invBody: 'hieronder vind je de factuur voor je bestelling #{no}.', invButton: 'Factuur downloaden', questions: 'Vragen? Beantwoord gewoon deze e-mail.', signature: 'Het team van ShopPrint.eu' },
    pl: { shipSubject: 'Twoje zamówienie nr {no} zostało wysłane ({carrier})', shipTitle: 'Twoje zamówienie jest w drodze', hello: 'Dzień dobry {name},', helloNoName: 'Dzień dobry,', shipBody: 'Twoje zamówienie nr {no} zostało przekazane firmie {carrier}.', awbLabel: 'Numer przesyłki', track: 'Śledź przesyłkę', invSubject: 'Faktura do zamówienia nr {no} – ShopPrint.eu', invBody: 'poniżej znajdziesz fakturę do zamówienia nr {no}.', invButton: 'Pobierz fakturę', questions: 'Pytania? Po prostu odpowiedz na tę wiadomość.', signature: 'Zespół ShopPrint.eu' },
    hu: { shipSubject: 'A(z) {no}. számú rendelését feladtuk ({carrier})', shipTitle: 'A rendelése úton van', hello: 'Kedves {name}!', helloNoName: 'Kedves Vásárlónk!', shipBody: 'A(z) {no}. számú rendelését átadtuk a(z) {carrier} futárszolgálatnak.', awbLabel: 'Követési szám', track: 'Csomag követése', invSubject: 'Számla a(z) {no}. számú rendeléséhez – ShopPrint.eu', invBody: 'Alább találja a(z) {no}. számú rendelésének számláját.', invButton: 'Számla letöltése', questions: 'Kérdése van? Válaszoljon erre az e-mailre.', signature: 'A ShopPrint.eu csapata' },
    cs: { shipSubject: 'Vaše objednávka č. {no} byla odeslána ({carrier})', shipTitle: 'Vaše objednávka je na cestě', hello: 'Dobrý den, {name},', helloNoName: 'Dobrý den,', shipBody: 'vaši objednávku č. {no} jsme předali dopravci {carrier}.', awbLabel: 'Číslo zásilky', track: 'Sledovat zásilku', invSubject: 'Faktura k objednávce č. {no} – ShopPrint.eu', invBody: 'níže najdete fakturu k objednávce č. {no}.', invButton: 'Stáhnout fakturu', questions: 'Máte dotaz? Stačí odpovědět na tento e-mail.', signature: 'Tým ShopPrint.eu' },
};

const fill = (t: string, v: Record<string, string | number>) => t.replace(/\{(\w+)\}/g, (_, k) => (v[k] === undefined ? '' : String(v[k])));

function euHtml(t: EuText, name: string, body: string, button?: { text: string; url: string }) {
    const hello = name ? fill(t.hello, { name: escapeHtml(name) }) : t.helloNoName;
    return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:auto;color:#222">
<h2 style="color:#0b4f9c">ShopPrint.eu</h2>
<p>${hello}</p>
${body}
${button ? `<p style="margin:24px 0"><a href="${escapeHtml(button.url)}" style="background:#0b4f9c;color:#fff;padding:12px 20px;border-radius:6px;text-decoration:none;font-weight:bold">${escapeHtml(button.text)}</a></p>` : ''}
<p>${escapeHtml(t.questions)}</p>
<p>${escapeHtml(t.signature)}</p>
<p style="color:#888;font-size:12px">${COMPANY.legalName} · CUI ${COMPANY.cui} · ${COMPANY.address.full}</p>
</div>`;
}

/** „AWB emis”: numărul (numerele) de urmărire și linkul curierului. */
export function awbEmail(p: {
    carrier: 'DPD' | 'FAN';
    awbs: { awb: string; url: string }[];
    orderNo?: number | null;
    name?: string | null;
    source?: string | null;
    marketing?: unknown;
    /** orașul de expediere (FAN: Sibiu / Șoimari), opțional */
    fromCity?: string | null;
}): MailParts {
    const carrierName = p.carrier === 'FAN' ? 'FAN Courier' : 'DPD';
    const lang = orderMailLang(p.source, p.marketing);
    // clienții din UE: pagina DPD în engleză
    const awbs = lang === 'ro' ? p.awbs : p.awbs.map((a) => ({ ...a, url: a.url.replace('language=ro', 'language=en') }));
    const main = awbs[0];
    const awbList = awbs
        .map((a) => `<a href="${escapeHtml(a.url)}" style="color:#4f46e5;font-weight:700;">${escapeHtml(a.awb)}</a>`)
        .join(', ');
    const no = p.orderNo ? String(p.orderNo) : '';

    if (lang !== 'ro') {
        const t = EU[lang];
        const body = `<p>${escapeHtml(fill(t.shipBody, { no, carrier: carrierName }))}</p><p>${escapeHtml(t.awbLabel)}: <b>${awbList}</b></p>`;
        return {
            subject: fill(t.shipSubject, { no, carrier: carrierName }),
            html: euHtml(t, firstName(p.name), body, main ? { text: t.track, url: main.url } : undefined),
        };
    }

    const config = getConfigForSource(p.source);
    const first = firstName(p.name);
    const many = p.awbs.length > 1;
    const content = `<p>${first ? `Bună, ${escapeHtml(first)}!` : 'Bună!'}</p>
<p>${no ? `Comanda ta <strong>#${no}</strong>` : 'Comanda ta'} a fost predată curierului ${carrierName}${p.fromCity ? ` (expediere din ${escapeHtml(p.fromCity)})` : ''}.</p>
<p>${many ? 'Numerele de urmărire (AWB)' : 'Numărul de urmărire (AWB)'}: <strong>${awbList}</strong></p>
<p>Starea livrării o vezi oricând pe site-ul curierului, de la butonul de mai jos.</p>`;
    const html = getPremiumHtmlTemplate({
        title: 'Comanda ta a fost expediată',
        subtitle: no ? `Comanda #${no} · ${carrierName}` : carrierName,
        content,
        buttonText: main ? 'Urmărește coletul' : undefined,
        buttonUrl: main?.url,
        brandConfig: config,
    });
    return {
        subject: `${no ? `Comanda #${no} a fost expediată` : 'Comanda ta a fost expediată'} – AWB ${carrierName} ${p.awbs.map((a) => a.awb).join(', ')}`,
        html,
    };
}

/** Factura încărcată din admin (PDF propriu, nu din Oblio). */
export function invoiceUploadedEmail(p: { url: string; orderNo?: number | null; name?: string | null; source?: string | null; marketing?: unknown }): MailParts {
    const lang = orderMailLang(p.source, p.marketing);
    const no = p.orderNo ? String(p.orderNo) : '';
    if (lang !== 'ro') {
        const t = EU[lang];
        return {
            subject: fill(t.invSubject, { no }),
            html: euHtml(t, firstName(p.name), `<p>${escapeHtml(fill(t.invBody, { no }))}</p>`, { text: t.invButton, url: p.url }),
        };
    }
    const config = getConfigForSource(p.source);
    const first = firstName(p.name);
    const html = getPremiumHtmlTemplate({
        title: no ? `Factura pentru comanda #${no}` : 'Factura pentru comanda ta',
        subtitle: first ? `Bună, ${escapeHtml(first)}!` : undefined,
        content: `<p style="font-size:15px;line-height:1.6;margin:0">Îți trimitem factura pentru ${no ? `comanda <strong>#${no}</strong>` : 'comanda ta'} de pe ${escapeHtml(config.name)}. O poți descărca de la butonul de mai jos.</p>`,
        buttonText: 'Descarcă factura',
        buttonUrl: p.url,
        brandConfig: config,
    });
    return { subject: `${no ? `Factura comenzii #${no}` : 'Factura comenzii tale'} - ${config.name}`, html };
}
