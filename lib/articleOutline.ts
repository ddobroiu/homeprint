export function articleOutline(html: string) {
  const outline: { id: string; title: string }[] = [];
  const contentHtml = html.replace(/<h2(?:\s[^>]*)?>([\s\S]*?)<\/h2>/g, (_match, heading: string) => {
    const title = heading.replace(/<[^>]*>/g, "").trim();
    const id = `sectiune-${outline.length + 1}`;
    outline.push({ id, title });
    return `<h2 id="${id}" class="scroll-mt-28">${heading}</h2>`;
  });
  const readableHtml = contentHtml.replace(/<table(\s[^>]*)?>/g, (table) => `<div class="editorial-table-scroll" tabindex="0" role="region" aria-label="Tabel comparativ">${table}`).replace(/<\/table>/g, "</table></div>");
  return { contentHtml: readableHtml, outline };
}
