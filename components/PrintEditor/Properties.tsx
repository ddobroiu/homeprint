"use client";
// Panoul din dreapta: proprietățile elementului selectat (sau ale documentului).
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    AlignCenter, AlignCenterHorizontal, AlignCenterVertical, AlignEndHorizontal, AlignEndVertical, AlignLeft, AlignRight, AlignStartHorizontal, AlignStartVertical,
    ArrowDownToLine, ArrowUpToLine, ChevronDown, ChevronUp, Copy, FlipHorizontal2, FlipVertical2, Group, Italic, Lock, Search, Trash2, Ungroup, Unlock,
} from "lucide-react";
import { aabb, mmToPt, ptToMm, sizeLabel, unionBox } from "@/lib/editor/doc";
import { EDITOR_FONTS, FONT_CATEGORIES, fontByFamily, nearestWeight, weightName, type FontCategory } from "@/lib/editor/fonts";
import { imageDpi, libraryElement } from "@/lib/editor/render";
import type { EditorDoc, EditorProduct, El, ImageEl, Paint, ShapeEl, Shadow, SvgEl, TextEl } from "@/lib/editor/types";
import { bottomNoGoMm } from "@/lib/editor/zones";
import { align, distribute, setBackground } from "./actions";
import { selectedEls, useEditor } from "./store";
import { ColorInput, IconBtn, PaintInput, Section, Segmented, Slider, Toggle, cx } from "./ui";

type Upd = (patch: Partial<El> | ((el: El) => El), key?: string | boolean) => void;

function FontPicker({ value, onChange }: { value: string; onChange: (f: string) => void }) {
    const [open, setOpen] = useState(false);
    const [q, setQ] = useState("");
    const [cat, setCat] = useState<FontCategory | "toate">("toate");
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!open) return;
        const h = (e: PointerEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
        window.addEventListener("pointerdown", h);
        return () => window.removeEventListener("pointerdown", h);
    }, [open]);
    const list = EDITOR_FONTS.filter((f) => (cat === "toate" || f.category === cat) && f.family.toLowerCase().includes(q.toLowerCase()));
    return (
        <div className="relative" ref={ref}>
            <button type="button" onClick={() => setOpen((o) => !o)} className="flex h-10 w-full items-center justify-between rounded-lg border border-[var(--pe-border)] bg-[var(--pe-surface)] px-3 text-left" title="Alege fontul">
                <span className="truncate text-[16px]" style={{ fontFamily: `"${value}"` }}>
                    {value}
                </span>
                <ChevronDown className="h-4 w-4 shrink-0 text-[var(--pe-muted)]" />
            </button>
            {open && (
                <div className="absolute left-0 right-0 z-50 mt-1 rounded-xl border border-[var(--pe-border)] bg-[var(--pe-surface)] shadow-2xl">
                    <div className="border-b border-[var(--pe-border)] p-2">
                        <label className="flex items-center gap-2 rounded-lg bg-[var(--pe-hover)] px-2 py-1.5">
                            <Search className="h-4 w-4 text-[var(--pe-subtle)]" />
                            <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Caută font" className="w-full bg-transparent text-[13px] outline-none" />
                        </label>
                        <div className="mt-2 flex flex-wrap gap-1">
                            {[{ id: "toate" as const, label: "Toate" }, ...FONT_CATEGORIES].map((c) => (
                                <button key={c.id} type="button" onClick={() => setCat(c.id)} className={cx("rounded-full px-2 py-0.5 text-[11px] font-semibold", cat === c.id ? "bg-[var(--pe-brand)] text-[var(--pe-on-brand)]" : "bg-[var(--pe-hover)] text-[var(--pe-text-2)]")}>
                                    {c.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <ul className="max-h-[320px] overflow-auto py-1">
                        {list.map((f) => (
                            <li key={f.family}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        onChange(f.family);
                                        setOpen(false);
                                    }}
                                    className={cx("flex w-full items-center justify-between px-3 py-1.5 text-left hover:bg-[var(--pe-hover)]", f.family === value && "bg-[var(--pe-brand-soft)]")}
                                >
                                    <span className="truncate text-[19px] leading-tight text-[var(--pe-text)]" style={{ fontFamily: `"${f.family}"`, fontWeight: f.weights.includes(400) ? 400 : f.weights[0] }}>
                                        {f.family}
                                    </span>
                                    <span className="ml-2 shrink-0 text-[10px] text-[var(--pe-subtle)]">{f.weights.length > 1 ? `${f.weights.length} grosimi` : ""}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                    <p className="border-t border-[var(--pe-border)] px-3 py-1.5 text-[10px] text-[var(--pe-subtle)]">Toate au ă â î ș ț · licență OFL (Google Fonts)</p>
                </div>
            )}
        </div>
    );
}

function ShadowEditor({ value, onChange, base }: { value: Shadow | null | undefined; onChange: (s: Shadow | null, key: string) => void; base: number }) {
    return (
        <div>
            <Toggle label="Umbră" checked={!!value} onChange={(v) => onChange(v ? { color: "#000000", blur: base * 0.08, dx: base * 0.04, dy: base * 0.04, opacity: 0.45 } : null, "shadow-toggle")} />
            {value && (
                <div className="mt-2 space-y-1">
                    <ColorInput value={value.color} commitKey="shadow-color" onChange={(c, k) => c && onChange({ ...value, color: c }, k)} />
                    <Slider label="Estompare" value={value.blur} min={0} max={base * 0.5} step={base / 200} unit="mm" commitKey="shadow-blur" onChange={(v, k) => onChange({ ...value, blur: v }, k)} />
                    <Slider label="Deplasare X" value={value.dx} min={-base * 0.3} max={base * 0.3} step={base / 200} unit="mm" commitKey="shadow-dx" onChange={(v, k) => onChange({ ...value, dx: v }, k)} />
                    <Slider label="Deplasare Y" value={value.dy} min={-base * 0.3} max={base * 0.3} step={base / 200} unit="mm" commitKey="shadow-dy" onChange={(v, k) => onChange({ ...value, dy: v }, k)} />
                    <Slider label="Opacitate" value={Math.round(value.opacity * 100)} min={0} max={100} unit="%" commitKey="shadow-op" onChange={(v, k) => onChange({ ...value, opacity: v / 100 }, k)} />
                </div>
            )}
        </div>
    );
}

function TextProps({ el, upd }: { el: TextEl; upd: Upd }) {
    const font = fontByFamily(el.fontFamily);
    const pt = Math.round(mmToPt(el.fontSize) * 10) / 10;
    return (
        <>
            <Section title="Text">
                <textarea value={el.text} onChange={(e) => upd({ text: e.target.value }, `text-${el.id}`)} rows={Math.min(5, el.text.split("\n").length + 1)} className="mb-2 w-full resize-y rounded-lg border border-[var(--pe-border)] bg-[var(--pe-surface)] px-2 py-1.5 text-[13px]" />
                <FontPicker value={el.fontFamily} onChange={(f) => upd({ fontFamily: f, fontWeight: nearestWeight(fontByFamily(f), el.fontWeight), italic: el.italic && !!fontByFamily(f).italic })} />
                <div className="mt-2 flex gap-2">
                    <select value={nearestWeight(font, el.fontWeight)} onChange={(e) => upd({ fontWeight: Number(e.target.value) })} className="h-9 flex-1 rounded-lg border border-[var(--pe-border)] bg-[var(--pe-surface)] px-2 text-[13px]" title="Grosime">
                        {font.weights.map((w) => (
                            <option key={w} value={w}>
                                {weightName(w)}
                            </option>
                        ))}
                    </select>
                    <IconBtn title="Italic" active={!!el.italic} disabled={!font.italic} onClick={() => upd({ italic: !el.italic })}>
                        <Italic className="h-4 w-4" />
                    </IconBtn>
                    <IconBtn title="Majuscule" active={!!el.uppercase} onClick={() => upd({ uppercase: !el.uppercase })}>
                        AA
                    </IconBtn>
                </div>
                <div className="mt-2 flex items-center gap-2">
                    <span className="text-[12px] text-[var(--pe-text-2)]">Mărime</span>
                    <button type="button" className="h-8 w-8 rounded-lg border border-[var(--pe-border)] bg-[var(--pe-surface)] text-[16px]" onClick={() => upd({ fontSize: el.fontSize / 1.1 }, "fs")}>
                        −
                    </button>
                    <input
                        key={pt}
                        defaultValue={pt}
                        inputMode="decimal"
                        className="h-8 w-20 rounded-lg border border-[var(--pe-border)] bg-[var(--pe-surface)] px-2 text-center text-[13px]"
                        onBlur={(e) => {
                            const v = parseFloat(e.target.value.replace(",", "."));
                            if (v > 0) upd({ fontSize: ptToMm(v) });
                        }}
                        onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
                    />
                    <button type="button" className="h-8 w-8 rounded-lg border border-[var(--pe-border)] bg-[var(--pe-surface)] text-[16px]" onClick={() => upd({ fontSize: el.fontSize * 1.1 }, "fs")}>
                        +
                    </button>
                    <span className="text-[11px] text-[var(--pe-subtle)]">pt</span>
                </div>
                <p className="mt-1 text-[11px] text-[var(--pe-subtle)]">Literele mari au ~{Math.round(el.fontSize * 0.72) / 10} cm înălțime la print.</p>
                <div className="mt-2">
                    <Segmented
                        value={el.align}
                        onChange={(v) => upd({ align: v })}
                        options={[
                            { value: "left", label: <AlignLeft className="h-4 w-4" />, title: "Aliniere stânga" },
                            { value: "center", label: <AlignCenter className="h-4 w-4" />, title: "Centrat" },
                            { value: "right", label: <AlignRight className="h-4 w-4" />, title: "Aliniere dreapta" },
                        ]}
                    />
                </div>
                <div className="mt-3">
                    <Slider label="Spațiere litere" value={el.letterSpacing} min={-100} max={800} step={5} commitKey="ls" onChange={(v, k) => upd({ letterSpacing: v }, k)} />
                    <Slider label="Înălțime rând" value={el.lineHeight} min={0.7} max={2.5} step={0.05} commitKey="lh" onChange={(v, k) => upd({ lineHeight: v }, k)} />
                    <Slider label="Curbură (text pe arc)" value={el.curve ?? 0} min={-100} max={100} step={1} commitKey="curve" onChange={(v, k) => upd({ curve: Math.abs(v) < 2 ? 0 : v }, k)} />
                    <Toggle label="Potrivește textul în casetă" checked={!!el.autoFit} onChange={(v) => upd({ autoFit: v, curve: v ? 0 : el.curve })} />
                </div>
            </Section>
            <Section title="Culoare text">
                <PaintInput value={el.fill} commitKey="fill" onChange={(p, k) => p && upd({ fill: p }, k)} />
            </Section>
            <Section title="Efecte">
                <Toggle label="Contur litere" checked={!!el.stroke} onChange={(v) => upd({ stroke: v ? { color: "#ffffff", width: 4 } : null })} />
                {el.stroke && (
                    <div className="mt-2 space-y-1">
                        <ColorInput value={el.stroke.color} commitKey="stroke-c" onChange={(c, k) => c && upd({ stroke: { ...el.stroke!, color: c } }, k)} />
                        <Slider label="Grosime contur" value={el.stroke.width} min={0.5} max={20} step={0.5} unit="%" commitKey="stroke-w" onChange={(v, k) => upd({ stroke: { ...el.stroke!, width: v } }, k)} />
                    </div>
                )}
                <div className="mt-2">
                    <ShadowEditor value={el.shadow} base={el.fontSize} onChange={(s, k) => upd({ shadow: s }, k)} />
                </div>
                <div className="mt-2">
                    <Toggle label="Fundal în spatele textului" checked={!!el.bg} onChange={(v) => upd({ bg: v ? { color: "#ffd60a", padding: 20, radius: 10 } : null })} />
                    {el.bg && (
                        <div className="mt-2 space-y-1">
                            <ColorInput value={el.bg.color} commitKey="bg-c" onChange={(c, k) => c && upd({ bg: { ...el.bg!, color: c } }, k)} />
                            <Slider label="Spațiu interior" value={el.bg.padding} min={0} max={80} unit="%" commitKey="bg-p" onChange={(v, k) => upd({ bg: { ...el.bg!, padding: v } }, k)} />
                            <Slider label="Colțuri rotunjite" value={el.bg.radius} min={0} max={80} unit="%" commitKey="bg-r" onChange={(v, k) => upd({ bg: { ...el.bg!, radius: v } }, k)} />
                        </div>
                    )}
                </div>
            </Section>
        </>
    );
}

function ShapeProps({ el, upd }: { el: ShapeEl; upd: Upd }) {
    const base = Math.min(el.w, el.h);
    const isLine = el.shape === "line";
    return (
        <>
            {!isLine && (
                <Section title="Umplere">
                    <PaintInput value={el.fill} allowNone commitKey="fill" onChange={(p, k) => upd({ fill: p as Paint | null }, k)} />
                </Section>
            )}
            <Section title={isLine ? "Linie" : "Contur"}>
                {!isLine && <Toggle label="Contur" checked={!!el.stroke} onChange={(v) => upd({ stroke: v ? { color: "#14211c", width: base * 0.03 } : null })} />}
                {el.stroke && (
                    <div className="mt-2 space-y-1">
                        <ColorInput value={el.stroke.color} commitKey="stroke-c" onChange={(c, k) => c && upd({ stroke: { ...el.stroke!, color: c } }, k)} />
                        <Slider
                            label="Grosime"
                            value={el.stroke.width}
                            min={0.1}
                            max={isLine ? Math.max(5, el.w * 0.1) : base * 0.3}
                            step={0.1}
                            unit="mm"
                            commitKey="stroke-w"
                            onChange={(v, k) => upd((x) => ({ ...x, stroke: { ...(x as ShapeEl).stroke!, width: v }, ...(isLine ? { h: v, y: x.y + x.h / 2 - v / 2 } : {}) }) as El, k)}
                        />
                        <Segmented value={el.stroke.dash ?? "solid"} onChange={(v) => upd({ stroke: { ...el.stroke!, dash: v } })} options={[{ value: "solid", label: "Plină" }, { value: "dash", label: "Întreruptă" }, { value: "dot", label: "Puncte" }]} />
                    </div>
                )}
            </Section>
            {(el.shape === "rect" || el.shape === "star" || el.shape === "polygon") && (
                <Section title="Formă">
                    {el.shape === "rect" && <Slider label="Colțuri rotunjite" value={el.radius ?? 0} min={0} max={base / 2} step={base / 200} unit="mm" commitKey="radius" onChange={(v, k) => upd({ radius: v }, k)} />}
                    {(el.shape === "star" || el.shape === "polygon") && <Slider label={el.shape === "star" ? "Colțuri" : "Laturi"} value={el.points ?? 5} min={3} max={24} commitKey="points" onChange={(v, k) => upd({ points: v }, k)} />}
                </Section>
            )}
            <Section>
                <ShadowEditor value={el.shadow} base={base} onChange={(s, k) => upd({ shadow: s }, k)} />
            </Section>
        </>
    );
}

function SvgProps({ el, upd }: { el: SvgEl; upd: Upd }) {
    const lib = libraryElement(el.ref);
    const base = Math.min(el.w, el.h);
    return (
        <>
            <Section title="Culori">
                <ColorInput value={el.color} commitKey="c" onChange={(c, k) => c && upd({ color: c }, k)} />
                {lib?.svg.includes("{{c2}}") && (
                    <div className="mt-2">
                        <ColorInput value={el.color2 ?? lib.c2 ?? "#111111"} commitKey="c2" onChange={(c, k) => c && upd({ color2: c }, k)} />
                    </div>
                )}
                {lib?.group === "iconite" && <Slider label="Grosime linie" value={el.strokeScale ?? 1} min={0.4} max={2.5} step={0.05} commitKey="sw" onChange={(v, k) => upd({ strokeScale: v }, k)} />}
            </Section>
            <Section>
                <ShadowEditor value={el.shadow} base={base} onChange={(s, k) => upd({ shadow: s }, k)} />
            </Section>
        </>
    );
}

function ImageProps({ el, upd, doc }: { el: ImageEl; upd: Upd; doc: EditorDoc }) {
    const base = Math.min(el.w, el.h);
    const dpi = el.placeholder ? null : Math.round(imageDpi(el));
    const f = el.filters ?? {};
    const setF = (k: keyof NonNullable<ImageEl["filters"]>, v: number, key: string) => upd({ filters: { ...f, [k]: v } }, key);
    return (
        <>
            {el.placeholder ? (
                <Section title="Casetă pentru poză">
                    <p className="mb-2 text-[12px] text-[var(--pe-muted)]">Selectată: alege o poză din „Încărcări” sau „Imagini” și intră direct aici. Poți și să tragi poza peste casetă.</p>
                    <button type="button" onClick={() => useEditor.getState().setPanel("incarcari")} className="w-full rounded-lg bg-[var(--pe-brand)] py-2 text-[13px] font-bold text-white">
                        Alege poza
                    </button>
                </Section>
            ) : (
                <Section title="Calitate la print">
                    <div className={cx("rounded-lg px-3 py-2 text-[12px] font-semibold", dpi! >= 150 ? "bg-[var(--pe-ok-soft)] text-[var(--pe-ok)]" : dpi! >= 100 ? "bg-[var(--pe-warn-soft)] text-[var(--pe-warn)]" : "bg-[var(--pe-danger-soft)] text-[var(--pe-danger)]")}>
                        {dpi} DPI la {sizeLabel(el.w, el.h)} —{" "}
                        {dpi! >= 150 ? "calitate bună" : dpi! >= 100 ? "acceptabil de la distanță" : "va ieși neclară; folosește o poză mai mare sau micșoreaz-o"}
                    </div>
                    <p className="mt-1 text-[11px] text-[var(--pe-subtle)]">
                        {el.iw}×{el.ih} px{el.credit ? ` · ${el.credit}` : ""}
                    </p>
                </Section>
            )}
            {!el.placeholder && (
                <Section title="Încadrare">
                    <Slider label="Zoom în casetă" value={Math.round((el.zoom ?? 1) * 100)} min={100} max={400} unit="%" commitKey="zoom" onChange={(v, k) => upd({ zoom: v / 100 }, k)} />
                    <Slider label="Decupaj orizontal" value={Math.round((el.ox ?? 0) * 100)} min={-100} max={100} commitKey="ox" onChange={(v, k) => upd({ ox: v / 100 }, k)} />
                    <Slider label="Decupaj vertical" value={Math.round((el.oy ?? 0) * 100)} min={-100} max={100} commitKey="oy" onChange={(v, k) => upd({ oy: v / 100 }, k)} />
                    <button
                        type="button"
                        className="mt-1 w-full rounded-lg border border-[var(--pe-border)] bg-[var(--pe-surface)] py-1.5 text-[12px] font-semibold"
                        onClick={() => {
                            const k = el.iw / el.ih;
                            const w = el.w;
                            upd({ h: w / k, zoom: 1, ox: 0, oy: 0 });
                        }}
                    >
                        Fără decupaj (proporții originale)
                    </button>
                </Section>
            )}
            <Section title="Formă și ramă">
                <Segmented value={el.mask === "circle" ? "circle" : "rect"} onChange={(v) => upd({ mask: v === "circle" ? "circle" : "none" })} options={[{ value: "rect", label: "Dreptunghi" }, { value: "circle", label: "Cerc / oval" }]} />
                {el.mask !== "circle" && <Slider label="Colțuri rotunjite" value={el.radius ?? 0} min={0} max={base / 2} step={base / 200} unit="mm" commitKey="radius" onChange={(v, k) => upd({ radius: v }, k)} />}
                <Toggle label="Ramă" checked={!!el.border} onChange={(v) => upd({ border: v ? { color: "#ffffff", width: base * 0.03 } : null })} />
                {el.border && (
                    <div className="mt-1 space-y-1">
                        <ColorInput value={el.border.color} commitKey="b-c" onChange={(c, k) => c && upd({ border: { ...el.border!, color: c } }, k)} />
                        <Slider label="Grosime ramă" value={el.border.width} min={0.1} max={base * 0.2} step={0.1} unit="mm" commitKey="b-w" onChange={(v, k) => upd({ border: { ...el.border!, width: v } }, k)} />
                    </div>
                )}
            </Section>
            {!el.placeholder && (
                <Section title="Ajustări">
                    <Slider label="Luminozitate" value={f.brightness ?? 100} min={30} max={180} unit="%" commitKey="f-b" onChange={(v, k) => setF("brightness", v, k)} />
                    <Slider label="Contrast" value={f.contrast ?? 100} min={30} max={180} unit="%" commitKey="f-c" onChange={(v, k) => setF("contrast", v, k)} />
                    <Slider label="Saturație" value={f.saturate ?? 100} min={0} max={200} unit="%" commitKey="f-s" onChange={(v, k) => setF("saturate", v, k)} />
                    <Slider label="Alb-negru" value={f.grayscale ?? 0} min={0} max={100} unit="%" commitKey="f-g" onChange={(v, k) => setF("grayscale", v, k)} />
                    <button
                        type="button"
                        className="mt-1 w-full rounded-lg border border-[var(--pe-border)] bg-[var(--pe-surface)] py-1.5 text-[12px] font-semibold"
                        onClick={() => {
                            setBackground({ kind: "image", src: el.src, iw: el.iw, ih: el.ih });
                            const st = useEditor.getState();
                            st.update((d) => ({ ...d, elements: d.elements.filter((x) => x.id !== el.id) }));
                            st.select([]);
                        }}
                    >
                        Fă-o fundal (pe tot formatul)
                    </button>
                </Section>
            )}
            <Section>
                <ShadowEditor value={el.shadow} base={base} onChange={(s, k) => upd({ shadow: s }, k)} />
            </Section>
        </>
    );
}

function Arrange({ els }: { els: El[] }) {
    const st = useEditor.getState();
    const multi = els.length > 1;
    const grouped = els.length > 1 && els.every((e) => e.groupId && e.groupId === els[0].groupId);
    const locked = els.every((e) => e.locked);
    return (
        <Section title={multi ? `Aranjare (${els.length} elemente)` : "Aranjare"}>
            <div className="grid grid-cols-6 gap-1">
                <IconBtn title={multi ? "Aliniază la stânga" : "La stânga paginii"} onClick={() => align("left")}><AlignStartVertical className="h-4 w-4" /></IconBtn>
                <IconBtn title="Centrează pe orizontală" onClick={() => align("hcenter")}><AlignCenterVertical className="h-4 w-4" /></IconBtn>
                <IconBtn title="Aliniază la dreapta" onClick={() => align("right")}><AlignEndVertical className="h-4 w-4" /></IconBtn>
                <IconBtn title="Aliniază sus" onClick={() => align("top")}><AlignStartHorizontal className="h-4 w-4" /></IconBtn>
                <IconBtn title="Centrează pe verticală" onClick={() => align("vcenter")}><AlignCenterHorizontal className="h-4 w-4" /></IconBtn>
                <IconBtn title="Aliniază jos" onClick={() => align("bottom")}><AlignEndHorizontal className="h-4 w-4" /></IconBtn>
            </div>
            {els.length >= 3 && (
                <div className="mt-1 grid grid-cols-2 gap-1">
                    <IconBtn title="Distribuie pe orizontală" onClick={() => distribute("h")}>↔ Distribuie</IconBtn>
                    <IconBtn title="Distribuie pe verticală" onClick={() => distribute("v")}>↕ Distribuie</IconBtn>
                </div>
            )}
            <div className="mt-2 grid grid-cols-6 gap-1">
                <IconBtn title="Adu în față (Ctrl+Shift+])" onClick={() => st.reorder("top")}><ArrowUpToLine className="h-4 w-4" /></IconBtn>
                <IconBtn title="Un nivel în față (Ctrl+])" onClick={() => st.reorder("up")}><ChevronUp className="h-4 w-4" /></IconBtn>
                <IconBtn title="Un nivel în spate (Ctrl+[)" onClick={() => st.reorder("down")}><ChevronDown className="h-4 w-4" /></IconBtn>
                <IconBtn title="Trimite în spate (Ctrl+Shift+[)" onClick={() => st.reorder("bottom")}><ArrowDownToLine className="h-4 w-4" /></IconBtn>
                <IconBtn title="Oglindește orizontal" onClick={() => st.updateEls(els.map((e) => e.id), (e) => ({ ...e, flipX: !e.flipX }) as El)}><FlipHorizontal2 className="h-4 w-4" /></IconBtn>
                <IconBtn title="Oglindește vertical" onClick={() => st.updateEls(els.map((e) => e.id), (e) => ({ ...e, flipY: !e.flipY }) as El)}><FlipVertical2 className="h-4 w-4" /></IconBtn>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
                <IconBtn title="Duplică (Ctrl+D)" onClick={() => st.duplicate()} className="border border-[var(--pe-border)]"><Copy className="mr-1 h-4 w-4" />Duplică</IconBtn>
                {multi && !grouped && <IconBtn title="Grupează (Ctrl+G)" onClick={() => st.group()} className="border border-[var(--pe-border)]"><Group className="mr-1 h-4 w-4" />Grupează</IconBtn>}
                {grouped && <IconBtn title="Degrupează (Ctrl+Shift+G)" onClick={() => st.ungroup()} className="border border-[var(--pe-border)]"><Ungroup className="mr-1 h-4 w-4" />Degrupează</IconBtn>}
                <IconBtn title={locked ? "Deblochează" : "Blochează poziția"} onClick={() => st.updateEls(els.map((e) => e.id), { locked: !locked } as Partial<El>)} className="border border-[var(--pe-border)]">
                    {locked ? <Unlock className="mr-1 h-4 w-4" /> : <Lock className="mr-1 h-4 w-4" />}
                    {locked ? "Deblochează" : "Blochează"}
                </IconBtn>
                <IconBtn title="Șterge (Delete)" onClick={() => st.removeSelected()} className="border border-[var(--pe-danger-soft)] text-[var(--pe-danger)]"><Trash2 className="mr-1 h-4 w-4" />Șterge</IconBtn>
            </div>
        </Section>
    );
}

function Geometry({ el, upd }: { el: El; upd: Upd }) {
    const cm = (v: number) => Math.round(v) / 10;
    const field = (label: string, value: number, apply: (mm: number) => Partial<El>) => (
        <label className="block">
            <span className="text-[11px] text-[var(--pe-muted)]">{label}</span>
            <input
                key={value}
                defaultValue={cm(value)}
                inputMode="decimal"
                className="h-8 w-full rounded-md border border-[var(--pe-border)] bg-[var(--pe-surface)] px-2 text-[12px]"
                onBlur={(e) => {
                    const v = parseFloat(e.target.value.replace(",", "."));
                    if (Number.isFinite(v)) upd(apply(v * 10));
                }}
                onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
            />
        </label>
    );
    return (
        <Section title="Poziție și mărime (cm)">
            <div className="grid grid-cols-4 gap-1.5">
                {field("X", el.x, (v) => ({ x: v }))}
                {field("Y", el.y, (v) => ({ y: v }))}
                {field("Lățime", el.w, (v) => (el.type === "image" || el.type === "svg" ? { w: v, h: (el.h * v) / el.w } : { w: Math.max(1, v) }))}
                {field("Înălțime", el.h, (v) => (el.type === "text" ? {} : el.type === "image" || el.type === "svg" ? { h: v, w: (el.w * v) / el.h } : { h: Math.max(0.1, v) }))}
            </div>
            <div className="mt-2">
                <Slider label="Rotire" value={el.rotation || 0} min={-180} max={180} unit="°" commitKey="rot" onChange={(v, k) => upd({ rotation: v }, k)} />
                <Slider label="Opacitate" value={Math.round(el.opacity * 100)} min={0} max={100} unit="%" commitKey="opacity" onChange={(v, k) => upd({ opacity: v / 100 }, k)} />
            </div>
        </Section>
    );
}

export function DocProps({ product, onChangeSize }: { product: EditorProduct | undefined; onChangeSize: () => void }) {
    const doc = useEditor((s) => s.doc)!;
    const showGuides = useEditor((s) => s.showGuides);
    const showRulers = useEditor((s) => s.showRulers);
    const toggle = useEditor((s) => s.toggle);
    const issues = useMemo(() => preflight(doc), [doc]);
    return (
        <>
            <Section title="Produs">
                <div className="text-[15px] font-bold text-[var(--pe-text)]">{product?.label ?? "Design"}</div>
                <div className="text-[13px] text-[var(--pe-text-2)]">{sizeLabel(doc.wMm, doc.hMm)}{doc.bleedMm ? ` · bleed ${doc.bleedMm} mm` : " · fără bleed"}</div>
                {product?.note && <p className="mt-1 text-[12px] leading-snug text-[var(--pe-muted)]">{product.note}</p>}
                <button type="button" onClick={onChangeSize} className="mt-2 w-full rounded-lg border border-[var(--pe-border)] bg-[var(--pe-surface)] py-2 text-[13px] font-semibold hover:border-[var(--pe-brand)]">
                    Schimbă produsul sau dimensiunea
                </button>
            </Section>
            <Section title="Afișare">
                <Toggle label="Ghidaje (tăiere, siguranță)" checked={showGuides} onChange={() => toggle("showGuides")} />
                <Toggle label="Rigle" checked={showRulers} onChange={() => toggle("showRulers")} />
            </Section>
            <Section title="Verificare pentru print">
                {issues.length === 0 ? (
                    <p className="rounded-lg bg-[var(--pe-ok-soft)] px-3 py-2 text-[12px] font-semibold text-[var(--pe-ok)]">Totul arată bine pentru tipar.</p>
                ) : (
                    <ul className="space-y-1.5">
                        {issues.map((i, k) => (
                            <li key={k} className={cx("rounded-lg px-3 py-2 text-[12px]", i.level === "error" ? "bg-[var(--pe-danger-soft)] text-[var(--pe-danger)]" : "bg-[var(--pe-warn-soft)] text-[var(--pe-warn)]")}>
                                <button type="button" className="text-left" onClick={() => i.id && useEditor.getState().select([i.id])}>
                                    {i.text}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </Section>
            <Section title="Scurtături">
                <ul className="space-y-0.5 text-[11px] text-[var(--pe-muted)]">
                    <li>Ctrl+Z / Ctrl+Y — anulează / refă</li>
                    <li>Ctrl+C / Ctrl+V / Ctrl+D — copiază / lipește / duplică</li>
                    <li>Ctrl+G — grupează · Ctrl+A — selectează tot</li>
                    <li>Săgeți — mută 1 mm (Shift: 10 mm) · Delete — șterge</li>
                    <li>Ctrl + rotița — zoom · Spațiu + trage — mută planșa</li>
                    <li>Dublu-clic pe text — editează · Alt la mutare — fără magnet</li>
                </ul>
            </Section>
        </>
    );
}

export type Issue = { level: "error" | "warn"; text: string; id?: string };

export function preflight(doc: EditorDoc): Issue[] {
    const out: Issue[] = [];
    for (const el of doc.elements) {
        if (el.hidden) continue;
        if (el.type === "image") {
            if (el.placeholder) {
                out.push({ level: "warn", text: "O casetă de poză e goală (nu apare în fișier).", id: el.id });
                continue;
            }
            const dpi = Math.round(imageDpi(el));
            if (dpi < 100) out.push({ level: "error", text: `Poză de ${dpi} DPI: va ieși neclară la print.`, id: el.id });
            else if (dpi < 150) out.push({ level: "warn", text: `Poză de ${dpi} DPI: acceptabilă doar de la distanță.`, id: el.id });
        }
        if (el.type === "text" && doc.safeMm > 0) {
            const b = aabb(el);
            const s = doc.safeMm;
            if (b.x < s - 0.5 || b.y < s - 0.5 || b.x + b.w > doc.wMm - s + 0.5 || b.y + b.h > doc.hMm - s + 0.5) {
                out.push({ level: "warn", text: `Textul „${el.text.slice(0, 24)}” iese din marginea de siguranță.`, id: el.id });
            }
        }
        const ng = bottomNoGoMm(doc.productId, doc.hMm);
        if (ng > 0 && (el.type === "text" || el.type === "svg") && aabb(el).y + aabb(el).h > doc.hMm - ng + 0.5) {
            out.push({ level: "warn", text: `„${el.type === "text" ? el.text.slice(0, 24) : el.name ?? "Iconița"}” e în zona de jos care intră în caseta roll-up-ului.`, id: el.id });
        }
    }
    if (doc.background.kind === "image") {
        const dpi = Math.round(doc.background.iw / ((doc.wMm + 2 * doc.bleedMm) / 25.4));
        if (dpi < 100) out.push({ level: "error", text: `Poza de fundal are ${dpi} DPI la acest format.` });
    }
    return out;
}

export default function Properties({ product, onChangeSize }: { product: EditorProduct | undefined; onChangeSize: () => void }) {
    const doc = useEditor((s) => s.doc)!;
    const selection = useEditor((s) => s.selection);
    const updateEls = useEditor((s) => s.updateEls);
    const els = selectedEls(doc, selection);
    if (!els.length) return <DocProps product={product} onChangeSize={onChangeSize} />;
    const el = els[0];
    const upd: Upd = (patch, key = true) => updateEls([el.id], patch, { history: key });
    const box = unionBox(els.map(aabb))!;
    return (
        <>
            {els.length === 1 ? (
                <>
                    {el.type === "text" && <TextProps el={el} upd={upd} />}
                    {el.type === "shape" && <ShapeProps el={el} upd={upd} />}
                    {el.type === "svg" && <SvgProps el={el} upd={upd} />}
                    {el.type === "image" && <ImageProps el={el} upd={upd} doc={doc} />}
                    <Arrange els={els} />
                    <Geometry el={el} upd={upd} />
                </>
            ) : (
                <>
                    <Section title="Selecție multiplă">
                        <p className="text-[12px] text-[var(--pe-muted)]">{els.length} elemente · {sizeLabel(box.w, box.h)}</p>
                        {els.every((e) => e.type === "text") && (
                            <div className="mt-2">
                                <FontPicker value={(els[0] as TextEl).fontFamily} onChange={(f) => updateEls(els.map((e) => e.id), (e) => ({ ...e, fontFamily: f, fontWeight: nearestWeight(fontByFamily(f), (e as TextEl).fontWeight) }) as El)} />
                            </div>
                        )}
                    </Section>
                    <Arrange els={els} />
                </>
            )}
        </>
    );
}
