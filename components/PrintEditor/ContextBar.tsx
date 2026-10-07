"use client";
// Bara contextuală (ca în Canva): se schimbă după ce e selectat — text, formă / element, poză,
// mai multe elemente sau nimic. Setările rare rămân în panoul din dreapta („Mai multe setări”).
import React, { useMemo, useState } from "react";
import {
    AlignCenter, AlignCenterHorizontal, AlignCenterVertical, AlignEndHorizontal, AlignEndVertical, AlignLeft, AlignRight, AlignStartHorizontal, AlignStartVertical,
    ArrowDownToLine, ArrowUpToLine, Bold, CaseSensitive, ChevronDown, ChevronUp, CircleCheck, Copy, Crop, FlipHorizontal2, FlipVertical2, Group, ImageUp, Italic, Layers,
    List, ListOrdered, Lock, Minus, PaintBucket, Plus, Ruler, Search, SlidersHorizontal, Sparkles, Square, Strikethrough, Trash2, TriangleAlert, Underline, Ungroup, Unlock,
    Blend, MoveHorizontal, MoveVertical, LetterText, Maximize2,
} from "lucide-react";
import { mmToPt, ptToMm, sizeLabel } from "@/lib/editor/doc";
import { EDITOR_FONTS, FONT_CATEGORIES, fontByFamily, nearestWeight, type FontCategory } from "@/lib/editor/fonts";
import { imageDpi, libraryElement } from "@/lib/editor/render";
import type { EditorDoc, EditorProduct, El, ImageEl, Paint, ShapeEl, SvgEl, TextEl } from "@/lib/editor/types";
import { align, distribute, setBackground } from "./actions";
import { preflight } from "./Properties";
import { selectedEls, useEditor } from "./store";
import { ColorInput, PaintInput, Popover, Segmented, Slider, Swatch, Toggle, cx } from "./ui";

type Upd = (patch: Partial<El> | ((el: El) => El), key?: string | boolean) => void;

const st = () => useEditor.getState();

// ---------------- piese mici ----------------
function Btn({ title, onClick, active, disabled, children, className, wide }: { title: string; onClick?: () => void; active?: boolean; disabled?: boolean; children: React.ReactNode; className?: string; wide?: boolean }) {
    return (
        <button type="button" title={title} aria-label={title} aria-pressed={active} disabled={disabled} onClick={onClick} className={cx("pe-icon-btn shrink-0", wide && "gap-1.5 px-2.5", className)}>
            {children}
        </button>
    );
}
const Sep = () => <span className="pe-ctx-sep" aria-hidden />;
const I = "h-[18px] w-[18px]";

/** Butonul care deschide un meniu (Popover) din bară. */
function PopBtn({ title, icon, label, children, width, active, align: al }: { title: string; icon: React.ReactNode; label?: string; children: React.ReactNode | ((close: () => void) => React.ReactNode); width?: number; active?: boolean; align?: "start" | "end" }) {
    return (
        <Popover
            title={title}
            width={width}
            align={al}
            trigger={({ open, toggle }) => (
                <button type="button" title={title} aria-label={title} aria-expanded={open} onClick={toggle} className={cx("pe-icon-btn shrink-0", label && "gap-1.5 px-2.5", (open || active) && "is-active")}>
                    {icon}
                    {label && <span className="text-[13px]">{label}</span>}
                </button>
            )}
        >
            {children}
        </Popover>
    );
}

// ---------------- font ----------------
const RECENT_KEY = "pe-recent-fonts";
function readRecent(): string[] {
    try {
        const v = JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
        return Array.isArray(v) ? v.filter((x) => typeof x === "string").slice(0, 5) : [];
    } catch {
        return [];
    }
}
function pushRecent(f: string) {
    try {
        localStorage.setItem(RECENT_KEY, JSON.stringify([f, ...readRecent().filter((x) => x !== f)].slice(0, 5)));
    } catch {
        /* fără localStorage: doar nu ținem minte */
    }
}

/** Încarcă fonturile (grosimea de bază) ca numele din listă să apară în fontul lor. */
let previewsRequested = false;
function loadPreviews() {
    if (previewsRequested || typeof document === "undefined" || !document.fonts) return;
    previewsRequested = true;
    for (const f of EDITOR_FONTS) document.fonts.load(`${f.weights.includes(400) ? 400 : f.weights[0]} 18px "${f.family}"`, f.family).catch(() => undefined);
}

export function FontMenu({ value, onChange, compact }: { value: string; onChange: (f: string) => void; compact?: boolean }) {
    const [q, setQ] = useState("");
    const [cat, setCat] = useState<FontCategory | "toate">("toate");
    const list = EDITOR_FONTS.filter((f) => (cat === "toate" || f.category === cat) && f.family.toLowerCase().includes(q.toLowerCase()));
    return (
        <Popover
            title="Font"
            width={300}
            trigger={({ open, toggle }) => (
                <button type="button" onClick={toggle} aria-expanded={open} title="Font" className={cx("flex h-[34px] shrink-0 items-center justify-between gap-2 rounded-[var(--pe-radius-sm)] border bg-[var(--pe-surface)] px-2.5 text-left transition hover:border-[var(--pe-brand-muted)]", open ? "border-[var(--pe-brand)]" : "border-[var(--pe-border)]", compact ? "w-[132px]" : "w-[176px]")}>
                    <span className="truncate text-[14px]" style={{ fontFamily: `"${value}"` }}>
                        {value}
                    </span>
                    <ChevronDown className="h-3.5 w-3.5 shrink-0 text-[var(--pe-subtle)]" />
                </button>
            )}
        >
            {(close) => {
                loadPreviews();
                const recent = readRecent().filter((f) => EDITOR_FONTS.some((x) => x.family === f));
                const pick = (f: string) => {
                    pushRecent(f);
                    onChange(f);
                    close();
                };
                const row = (family: string) => {
                    const f = fontByFamily(family);
                    return (
                        <button key={family} type="button" onClick={() => pick(family)} className={cx("flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left hover:bg-[var(--pe-hover)]", family === value && "bg-[var(--pe-brand-soft)]")}>
                            <span className="truncate text-[18px] leading-tight text-[var(--pe-text)]" style={{ fontFamily: `"${family}"`, fontWeight: f.weights.includes(400) ? 400 : f.weights[0] }}>
                                {family}
                            </span>
                            {family === value ? <CircleCheck className="h-4 w-4 shrink-0 text-[var(--pe-brand)]" /> : <span className="ml-2 shrink-0 text-[10px] text-[var(--pe-subtle)]">{f.weights.length > 1 ? `${f.weights.length} grosimi` : ""}</span>}
                        </button>
                    );
                };
                return (
                    <div className="-m-1">
                        <label className="flex items-center gap-2 rounded-lg border border-[var(--pe-border)] bg-[var(--pe-surface-2)] px-2 py-1.5">
                            <Search className="h-4 w-4 text-[var(--pe-subtle)]" />
                            <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Caută un font" className="w-full bg-transparent text-[13px] outline-none" />
                        </label>
                        <div className="pe-noscrollbar mt-2 flex gap-1 overflow-x-auto">
                            {[{ id: "toate" as const, label: "Toate" }, ...FONT_CATEGORIES].map((c) => (
                                <button key={c.id} type="button" onClick={() => setCat(c.id)} className={cx("shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold", cat === c.id ? "bg-[var(--pe-brand)] text-[var(--pe-on-brand)]" : "bg-[var(--pe-hover)] text-[var(--pe-text-2)]")}>
                                    {c.label}
                                </button>
                            ))}
                        </div>
                        {!q && cat === "toate" && recent.length > 0 && (
                            <>
                                <div className="pe-section-label mb-1 mt-3 px-2">Folosite recent</div>
                                {recent.map(row)}
                                <div className="pe-section-label mb-1 mt-3 px-2">Toate fonturile</div>
                            </>
                        )}
                        <div className="mt-1 max-h-[300px] overflow-y-auto pe-scroll">{list.map((f) => row(f.family))}</div>
                        {!list.length && <p className="px-2 py-6 text-center text-[12px] text-[var(--pe-muted)]">Niciun font cu „{q}”.</p>}
                        <p className="mt-2 border-t border-[var(--pe-border)] px-2 pt-2 text-[10.5px] text-[var(--pe-subtle)]">Toate au ă â î ș ț · licență liberă pentru print</p>
                    </div>
                );
            }}
        </Popover>
    );
}

const SIZE_PRESETS = [6, 8, 10, 12, 14, 18, 24, 32, 48, 64, 96, 128, 192, 256, 384, 512, 768, 1024, 1536, 2048];

function FontSize({ el, upd }: { el: TextEl; upd: Upd }) {
    const pt = Math.round(mmToPt(el.fontSize) * 10) / 10;
    return (
        <div className="flex h-[34px] shrink-0 items-center rounded-[var(--pe-radius-sm)] border border-[var(--pe-border)] bg-[var(--pe-surface)]">
            <button type="button" title="Micșorează textul" className="flex h-full w-7 items-center justify-center rounded-l-[var(--pe-radius-sm)] text-[var(--pe-text-2)] hover:bg-[var(--pe-hover)]" onClick={() => upd({ fontSize: el.fontSize / 1.1 }, "fs")}>
                <Minus className="h-3.5 w-3.5" />
            </button>
            <Popover
                title="Mărime (pt)"
                width={150}
                trigger={({ toggle }) => (
                    <input
                        key={pt}
                        defaultValue={pt}
                        inputMode="decimal"
                        aria-label="Mărimea fontului (pt)"
                        onFocus={(e) => e.target.select()}
                        onDoubleClick={toggle}
                        className="h-full w-[52px] border-x border-[var(--pe-border)] bg-transparent text-center text-[13px] font-semibold outline-none"
                        onBlur={(e) => {
                            const v = parseFloat(e.target.value.replace(",", "."));
                            if (v > 0) upd({ fontSize: ptToMm(v) });
                        }}
                        onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
                    />
                )}
            >
                {(close) => (
                    <div className="pe-scroll -m-1 max-h-[260px] overflow-y-auto">
                        {SIZE_PRESETS.map((s) => (
                            <button key={s} type="button" onClick={() => { upd({ fontSize: ptToMm(s) }); close(); }} className="block w-full rounded-md px-2 py-1 text-left text-[13px] hover:bg-[var(--pe-hover)]">
                                {s}
                            </button>
                        ))}
                    </div>
                )}
            </Popover>
            <button type="button" title="Mărește textul" className="flex h-full w-7 items-center justify-center rounded-r-[var(--pe-radius-sm)] text-[var(--pe-text-2)] hover:bg-[var(--pe-hover)]" onClick={() => upd({ fontSize: el.fontSize * 1.1 }, "fs")}>
                <Plus className="h-3.5 w-3.5" />
            </button>
        </div>
    );
}

// ---------------- meniuri comune ----------------
function Transparency({ els }: { els: El[] }) {
    const v = Math.round(els[0].opacity * 100);
    return (
        <PopBtn title="Transparență" icon={<Blend className={I} />} width={260}>
            <Slider label="Opacitate" value={v} min={0} max={100} unit="%" commitKey="opacity" onChange={(x, k) => st().updateEls(els.map((e) => e.id), { opacity: x / 100 } as Partial<El>, { history: k })} />
        </PopBtn>
    );
}

function Position({ els }: { els: El[] }) {
    const multi = els.length > 1;
    return (
        <PopBtn title="Poziție și straturi" icon={<Layers className={I} />} label="Poziție" width={300}>
            <div className="pe-section-label mb-1.5">Ordine</div>
            <div className="grid grid-cols-2 gap-1.5">
                <button type="button" className="pe-btn pe-btn-secondary h-9 justify-start text-[12px]" onClick={() => st().reorder("top")}><ArrowUpToLine className="h-4 w-4" />În față</button>
                <button type="button" className="pe-btn pe-btn-secondary h-9 justify-start text-[12px]" onClick={() => st().reorder("bottom")}><ArrowDownToLine className="h-4 w-4" />În spate</button>
                <button type="button" className="pe-btn pe-btn-secondary h-9 justify-start text-[12px]" onClick={() => st().reorder("up")}><ChevronUp className="h-4 w-4" />Un nivel sus</button>
                <button type="button" className="pe-btn pe-btn-secondary h-9 justify-start text-[12px]" onClick={() => st().reorder("down")}><ChevronDown className="h-4 w-4" />Un nivel jos</button>
            </div>
            <div className="pe-section-label mb-1.5 mt-3">{multi ? "Aliniază între ele" : "Aliniază în pagină"}</div>
            <AlignGrid count={els.length} />
            <button type="button" className="pe-btn pe-btn-ghost mt-2 h-8 w-full text-[12px]" onClick={() => st().setPanel("straturi")}>
                Toate straturile →
            </button>
        </PopBtn>
    );
}

function AlignGrid({ count }: { count: number }) {
    return (
        <>
            <div className="grid grid-cols-6 gap-1">
                <Btn title="Stânga" onClick={() => align("left")}><AlignStartVertical className="h-4 w-4" /></Btn>
                <Btn title="Centru orizontal" onClick={() => align("hcenter")}><AlignCenterVertical className="h-4 w-4" /></Btn>
                <Btn title="Dreapta" onClick={() => align("right")}><AlignEndVertical className="h-4 w-4" /></Btn>
                <Btn title="Sus" onClick={() => align("top")}><AlignStartHorizontal className="h-4 w-4" /></Btn>
                <Btn title="Centru vertical" onClick={() => align("vcenter")}><AlignCenterHorizontal className="h-4 w-4" /></Btn>
                <Btn title="Jos" onClick={() => align("bottom")}><AlignEndHorizontal className="h-4 w-4" /></Btn>
            </div>
            {count >= 3 && (
                <div className="mt-1.5 grid grid-cols-2 gap-1.5">
                    <button type="button" className="pe-btn pe-btn-secondary h-8 text-[12px]" onClick={() => distribute("h")}><MoveHorizontal className="h-4 w-4" />Distribuie orizontal</button>
                    <button type="button" className="pe-btn pe-btn-secondary h-8 text-[12px]" onClick={() => distribute("v")}><MoveVertical className="h-4 w-4" />Distribuie vertical</button>
                </div>
            )}
        </>
    );
}

function Flip({ els }: { els: El[] }) {
    return (
        <PopBtn title="Oglindește" icon={<FlipHorizontal2 className={I} />} width={220}>
            <div className="grid gap-1.5">
                <button type="button" className="pe-btn pe-btn-secondary h-9 justify-start text-[12px]" onClick={() => st().updateEls(els.map((e) => e.id), (e) => ({ ...e, flipX: !e.flipX }) as El)}><FlipHorizontal2 className="h-4 w-4" />Oglindește orizontal</button>
                <button type="button" className="pe-btn pe-btn-secondary h-9 justify-start text-[12px]" onClick={() => st().updateEls(els.map((e) => e.id), (e) => ({ ...e, flipY: !e.flipY }) as El)}><FlipVertical2 className="h-4 w-4" />Oglindește vertical</button>
            </div>
        </PopBtn>
    );
}

function Tail({ els }: { els: El[] }) {
    const locked = els.every((e) => e.locked);
    return (
        <>
            <Btn title={locked ? "Deblochează" : "Blochează poziția"} active={locked} onClick={() => st().updateEls(els.map((e) => e.id), { locked: !locked } as Partial<El>)}>
                {locked ? <Lock className={I} /> : <Unlock className={I} />}
            </Btn>
            <Btn title="Duplică (Ctrl+D)" onClick={() => st().duplicate()}><Copy className={I} /></Btn>
            <Btn title="Șterge (Delete)" onClick={() => st().removeSelected()} className="hover:!bg-[var(--pe-danger-soft)] hover:!text-[var(--pe-danger)]"><Trash2 className={I} /></Btn>
        </>
    );
}

function PaintBtn({ title, value, onChange, letter, allowNone, commitKey }: { title: string; value: Paint | null; onChange: (p: Paint | null, key: string) => void; letter?: string; allowNone?: boolean; commitKey: string }) {
    return (
        <Popover
            title={title}
            width={264}
            trigger={({ open, toggle }) => (
                <button type="button" title={title} aria-label={title} aria-expanded={open} onClick={toggle} className={cx("pe-icon-btn shrink-0", open && "is-active")}>
                    <Swatch paint={value} letter={letter} />
                </button>
            )}
        >
            <PaintInput value={value} allowNone={allowNone} commitKey={commitKey} onChange={onChange} />
        </Popover>
    );
}

// ---------------- moduri ----------------
function TextBar({ el, upd, compact }: { el: TextEl; upd: Upd; compact: boolean }) {
    const font = fontByFamily(el.fontFamily);
    const bold = el.fontWeight >= 600;
    const alignNext = el.align === "left" ? "center" : el.align === "center" ? "right" : "left";
    const AlignIcon = el.align === "left" ? AlignLeft : el.align === "center" ? AlignCenter : AlignRight;
    const listNext = !el.list ? "bullet" : el.list === "bullet" ? "number" : undefined;
    const panel = useEditor((s) => s.panel);
    return (
        <>
            <FontMenu value={el.fontFamily} compact={compact} onChange={(f) => upd({ fontFamily: f, fontWeight: nearestWeight(fontByFamily(f), el.fontWeight), italic: el.italic && !!fontByFamily(f).italic })} />
            <FontSize el={el} upd={upd} />
            <PaintBtn title="Culoarea textului" letter="A" value={el.fill} commitKey="fill" onChange={(p, k) => p && upd({ fill: p }, k)} />
            <Sep />
            <Btn title="Bold (Ctrl+B)" active={bold} disabled={font.weights.length < 2} onClick={() => upd({ fontWeight: nearestWeight(font, bold ? 400 : 700) })}><Bold className={I} /></Btn>
            <Btn title="Italic (Ctrl+I)" active={!!el.italic} disabled={!font.italic} onClick={() => upd({ italic: !el.italic })}><Italic className={I} /></Btn>
            <Btn title="Subliniat (Ctrl+U)" active={!!el.underline} onClick={() => upd({ underline: !el.underline })}><Underline className={I} /></Btn>
            <Btn title="Tăiat" active={!!el.strike} onClick={() => upd({ strike: !el.strike })}><Strikethrough className={I} /></Btn>
            <Btn title="Majuscule" active={!!el.uppercase} onClick={() => upd({ uppercase: !el.uppercase })}><CaseSensitive className={I} /></Btn>
            <Sep />
            <Btn title={`Aliniere: ${el.align === "left" ? "stânga" : el.align === "center" ? "centru" : "dreapta"}`} onClick={() => upd({ align: alignNext })}><AlignIcon className={I} /></Btn>
            <Btn title={!el.list ? "Listă cu buline" : el.list === "bullet" ? "Listă numerotată" : "Fără listă"} active={!!el.list} onClick={() => upd({ list: listNext })}>{el.list === "number" ? <ListOrdered className={I} /> : <List className={I} />}</Btn>
            <PopBtn title="Spațiere" icon={<LetterText className={I} />} width={280}>
                <Slider label="Spațiere între litere" value={el.letterSpacing} min={-100} max={800} step={5} commitKey="ls" onChange={(v, k) => upd({ letterSpacing: v }, k)} />
                <Slider label="Înălțimea rândului" value={el.lineHeight} min={0.7} max={2.5} step={0.05} commitKey="lh" onChange={(v, k) => upd({ lineHeight: v }, k)} />
                <Toggle label="Potrivește textul în casetă" checked={!!el.autoFit} onChange={(v) => upd({ autoFit: v, curve: v ? 0 : el.curve })} />
            </PopBtn>
            <Btn title="Efecte (umbră, contur, neon, curbat, gradient)" wide active={panel === "efecte"} onClick={() => st().setPanel(panel === "efecte" ? null : "efecte")}>
                <Sparkles className={I} />
                <span className="text-[13px]">Efecte</span>
            </Btn>
            <Sep />
            <Position els={[el]} />
            <Transparency els={[el]} />
            <Tail els={[el]} />
        </>
    );
}

function ShapeBar({ el, upd }: { el: ShapeEl; upd: Upd }) {
    const base = Math.min(el.w, el.h);
    const isLine = el.shape === "line";
    return (
        <>
            {!isLine && <PaintBtn title="Culoare de umplere" value={el.fill} allowNone commitKey="fill" onChange={(p, k) => upd({ fill: p }, k)} />}
            <PopBtn title={isLine ? "Linie" : "Contur"} icon={<Square className={I} />} label={isLine ? "Linie" : "Contur"} width={270} active={!!el.stroke}>
                {!isLine && <Toggle label="Contur" checked={!!el.stroke} onChange={(v) => upd({ stroke: v ? { color: "#14211c", width: base * 0.03 } : null })} />}
                {el.stroke && (
                    <div className="mt-2 space-y-2">
                        <ColorInput value={el.stroke.color} commitKey="stroke-c" onChange={(c, k) => c && upd({ stroke: { ...el.stroke!, color: c } }, k)} />
                        <Slider label="Grosime" value={el.stroke.width} min={0.1} max={isLine ? Math.max(5, el.w * 0.1) : Math.max(1, base * 0.3)} step={0.1} unit="mm" commitKey="stroke-w" onChange={(v, k) => upd((x) => ({ ...x, stroke: { ...(x as ShapeEl).stroke!, width: v }, ...(isLine ? { h: v, y: x.y + x.h / 2 - v / 2 } : {}) }) as El, k)} />
                        <Segmented value={el.stroke.dash ?? "solid"} onChange={(v) => upd({ stroke: { ...el.stroke!, dash: v } })} options={[{ value: "solid", label: "Plină" }, { value: "dash", label: "Întreruptă" }, { value: "dot", label: "Puncte" }]} />
                    </div>
                )}
            </PopBtn>
            {el.shape === "rect" && (
                <PopBtn title="Colțuri rotunjite" icon={<Maximize2 className={I} />} width={260}>
                    <Slider label="Colțuri rotunjite" value={el.radius ?? 0} min={0} max={base / 2} step={Math.max(0.1, base / 200)} unit="mm" commitKey="radius" onChange={(v, k) => upd({ radius: v }, k)} />
                </PopBtn>
            )}
            {(el.shape === "star" || el.shape === "polygon") && (
                <PopBtn title={el.shape === "star" ? "Colțuri" : "Laturi"} icon={<Maximize2 className={I} />} width={260}>
                    <Slider label={el.shape === "star" ? "Colțuri" : "Laturi"} value={el.points ?? 5} min={3} max={24} commitKey="points" onChange={(v, k) => upd({ points: v }, k)} />
                </PopBtn>
            )}
            <Sep />
            <Flip els={[el]} />
            <Position els={[el]} />
            <Transparency els={[el]} />
            <Tail els={[el]} />
        </>
    );
}

function SvgBar({ el, upd }: { el: SvgEl; upd: Upd }) {
    const lib = libraryElement(el.ref);
    return (
        <>
            <PaintBtn title="Culoare" value={{ kind: "solid", color: el.color }} commitKey="c" onChange={(p, k) => p && upd({ color: p.kind === "solid" ? p.color : p.stops[0].color }, k)} />
            {lib?.svg.includes("{{c2}}") && <PaintBtn title="A doua culoare" value={{ kind: "solid", color: el.color2 ?? lib.c2 ?? "#111111" }} commitKey="c2" onChange={(p, k) => p && upd({ color2: p.kind === "solid" ? p.color : p.stops[0].color }, k)} />}
            {lib?.group === "iconite" && (
                <PopBtn title="Grosimea liniei" icon={<SlidersHorizontal className={I} />} width={260}>
                    <Slider label="Grosimea liniei" value={el.strokeScale ?? 1} min={0.4} max={2.5} step={0.05} commitKey="sw" onChange={(v, k) => upd({ strokeScale: v }, k)} />
                </PopBtn>
            )}
            <Sep />
            <Flip els={[el]} />
            <Position els={[el]} />
            <Transparency els={[el]} />
            <Tail els={[el]} />
        </>
    );
}

function ImageBar({ el, upd }: { el: ImageEl; upd: Upd }) {
    const base = Math.min(el.w, el.h);
    const f = el.filters ?? {};
    const setF = (k: keyof NonNullable<ImageEl["filters"]>, v: number, key: string) => upd({ filters: { ...f, [k]: v } }, key);
    const dpi = el.placeholder ? null : Math.round(imageDpi(el));
    const replace = () => {
        st().setReplaceTarget(el.id);
        st().setPanel("incarcari");
    };
    if (el.placeholder)
        return (
            <>
                <button type="button" className="pe-btn pe-btn-primary h-[34px] shrink-0" onClick={replace}>
                    <ImageUp className="h-4 w-4" /> Alege poza
                </button>
                <span className="shrink-0 px-2 text-[12px] text-[var(--pe-muted)]">sau trage o poză peste casetă</span>
                <Sep />
                <Position els={[el]} />
                <Tail els={[el]} />
            </>
        );
    return (
        <>
            <PopBtn title="Decupează / încadrează" icon={<Crop className={I} />} label="Decupează" width={280}>
                <Slider label="Zoom în casetă" value={Math.round((el.zoom ?? 1) * 100)} min={100} max={400} unit="%" commitKey="zoom" onChange={(v, k) => upd({ zoom: v / 100 }, k)} />
                <Slider label="Mută orizontal" value={Math.round((el.ox ?? 0) * 100)} min={-100} max={100} commitKey="ox" onChange={(v, k) => upd({ ox: v / 100 }, k)} />
                <Slider label="Mută vertical" value={Math.round((el.oy ?? 0) * 100)} min={-100} max={100} commitKey="oy" onChange={(v, k) => upd({ oy: v / 100 }, k)} />
                <button type="button" className="pe-btn pe-btn-secondary mt-1 h-8 w-full text-[12px]" onClick={() => upd({ h: el.w / (el.iw / el.ih), zoom: 1, ox: 0, oy: 0 })}>
                    Fără decupaj (proporții originale)
                </button>
            </PopBtn>
            <Flip els={[el]} />
            <PopBtn title="Ajustări" icon={<SlidersHorizontal className={I} />} label="Ajustează" width={280}>
                <Slider label="Luminozitate" value={f.brightness ?? 100} min={30} max={180} unit="%" commitKey="f-b" onChange={(v, k) => setF("brightness", v, k)} />
                <Slider label="Contrast" value={f.contrast ?? 100} min={30} max={180} unit="%" commitKey="f-c" onChange={(v, k) => setF("contrast", v, k)} />
                <Slider label="Saturație" value={f.saturate ?? 100} min={0} max={200} unit="%" commitKey="f-s" onChange={(v, k) => setF("saturate", v, k)} />
                <Slider label="Alb-negru" value={f.grayscale ?? 0} min={0} max={100} unit="%" commitKey="f-g" onChange={(v, k) => setF("grayscale", v, k)} />
                <button type="button" className="pe-btn pe-btn-ghost h-8 w-full text-[12px]" onClick={() => upd({ filters: {} })}>Resetează ajustările</button>
            </PopBtn>
            <PopBtn title="Colțuri și ramă" icon={<Maximize2 className={I} />} width={270}>
                <Segmented value={el.mask === "circle" ? "circle" : "rect"} onChange={(v) => upd({ mask: v === "circle" ? "circle" : "none" })} options={[{ value: "rect", label: "Dreptunghi" }, { value: "circle", label: "Cerc / oval" }]} />
                <div className="mt-2">{el.mask !== "circle" && <Slider label="Colțuri rotunjite" value={el.radius ?? 0} min={0} max={base / 2} step={Math.max(0.1, base / 200)} unit="mm" commitKey="radius" onChange={(v, k) => upd({ radius: v }, k)} />}</div>
                <Toggle label="Ramă" checked={!!el.border} onChange={(v) => upd({ border: v ? { color: "#ffffff", width: base * 0.03 } : null })} />
                {el.border && (
                    <div className="mt-1 space-y-1">
                        <ColorInput value={el.border.color} commitKey="b-c" onChange={(c, k) => c && upd({ border: { ...el.border!, color: c } }, k)} />
                        <Slider label="Grosime ramă" value={el.border.width} min={0.1} max={base * 0.2} step={0.1} unit="mm" commitKey="b-w" onChange={(v, k) => upd({ border: { ...el.border!, width: v } }, k)} />
                    </div>
                )}
            </PopBtn>
            <Transparency els={[el]} />
            <Btn title="Înlocuiește poza" wide onClick={replace}>
                <ImageUp className={I} />
                <span className="text-[13px]">Înlocuiește</span>
            </Btn>
            {dpi !== null && (
                <span title="Rezoluția pozei la mărimea de print" className={cx("shrink-0 rounded-full px-2 py-1 text-[11px] font-bold", dpi >= 150 ? "bg-[var(--pe-ok-soft)] text-[var(--pe-ok)]" : dpi >= 100 ? "bg-[var(--pe-warn-soft)] text-[var(--pe-warn)]" : "bg-[var(--pe-danger-soft)] text-[var(--pe-danger)]")}>
                    {dpi} DPI
                </span>
            )}
            <Sep />
            <Position els={[el]} />
            <Tail els={[el]} />
        </>
    );
}

function MultiBar({ els }: { els: El[] }) {
    const grouped = els.every((e) => e.groupId && e.groupId === els[0].groupId);
    const allText = els.every((e) => e.type === "text");
    return (
        <>
            <span className="shrink-0 rounded-full bg-[var(--pe-brand-soft)] px-2.5 py-1 text-[12px] font-bold text-[var(--pe-brand-strong)]">{els.length} selectate</span>
            {allText && <FontMenu compact value={(els[0] as TextEl).fontFamily} onChange={(f) => st().updateEls(els.map((e) => e.id), (e) => ({ ...e, fontFamily: f, fontWeight: nearestWeight(fontByFamily(f), (e as TextEl).fontWeight) }) as El)} />}
            {allText && <PaintBtn title="Culoarea textului" letter="A" value={(els[0] as TextEl).fill} commitKey="fill-multi" onChange={(p, k) => p && st().updateEls(els.map((e) => e.id), { fill: p } as Partial<El>, { history: k })} />}
            <Sep />
            <PopBtn title="Aliniază" icon={<AlignCenterVertical className={I} />} label="Aliniază" width={270}>
                <AlignGrid count={els.length} />
            </PopBtn>
            {grouped ? (
                <Btn title="Degrupează (Ctrl+Shift+G)" wide onClick={() => st().ungroup()}><Ungroup className={I} /><span className="text-[13px]">Degrupează</span></Btn>
            ) : (
                <Btn title="Grupează (Ctrl+G)" wide onClick={() => st().group()}><Group className={I} /><span className="text-[13px]">Grupează</span></Btn>
            )}
            <Position els={els} />
            <Transparency els={els} />
            <Tail els={els} />
        </>
    );
}

function DocBar({ doc, product, onOpenFormat }: { doc: EditorDoc; product?: EditorProduct; onOpenFormat: () => void }) {
    const showGuides = useEditor((s) => s.showGuides);
    const bg = doc.background;
    const bgPaint: Paint | null = bg.kind === "solid" || bg.kind === "linear" || bg.kind === "radial" ? bg : null;
    const issues = useMemo(() => preflight(doc), [doc]);
    const errors = issues.filter((i) => i.level === "error").length;
    return (
        <>
            <Popover
                title="Fundal"
                width={264}
                trigger={({ open, toggle }) => (
                    <button type="button" onClick={toggle} aria-expanded={open} title="Culoarea fundalului" className={cx("pe-icon-btn shrink-0 gap-2 px-2.5", open && "is-active")}>
                        <Swatch paint={bgPaint} />
                        <span className="text-[13px]">Fundal</span>
                    </button>
                )}
            >
                <PaintInput value={bgPaint} commitKey="bg" onChange={(p, k) => p && setBackground(p, k)} />
                <button type="button" className="pe-btn pe-btn-ghost mt-2 h-8 w-full text-[12px]" onClick={() => st().setPanel("fundal")}>
                    <PaintBucket className="h-4 w-4" /> Modele și poze de fundal →
                </button>
            </Popover>
            <Sep />
            <button type="button" onClick={onOpenFormat} className="pe-icon-btn shrink-0 gap-1.5 px-2.5" title="Schimbă produsul sau dimensiunea">
                <Ruler className={I} />
                <span className="text-[13px]">
                    {product?.label ?? "Design"} · {sizeLabel(doc.wMm, doc.hMm)}
                </span>
                <span className="ml-0.5 rounded-md bg-[var(--pe-hover)] px-1.5 py-0.5 text-[11px] font-bold text-[var(--pe-text-2)]">Redimensionează</span>
            </button>
            <Btn title="Ghidaje: tăiere, margine de siguranță" active={showGuides} wide onClick={() => st().toggle("showGuides")}>
                <span className="inline-block h-3.5 w-3.5 rounded-[3px] border-[1.5px] border-dashed border-current" />
                <span className="text-[13px]">Ghidaje</span>
            </Btn>
            <Sep />
            <button type="button" onClick={() => st().toggle("showProps")} className={cx("shrink-0 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-bold", issues.length === 0 ? "bg-[var(--pe-ok-soft)] text-[var(--pe-ok)]" : errors ? "bg-[var(--pe-danger-soft)] text-[var(--pe-danger)]" : "bg-[var(--pe-warn-soft)] text-[var(--pe-warn)]")} title="Verificarea fișierului pentru tipar">
                {issues.length === 0 ? <CircleCheck className="h-4 w-4" /> : <TriangleAlert className="h-4 w-4" />}
                {issues.length === 0 ? "Gata de tipar" : `${issues.length} ${issues.length === 1 ? "observație" : "observații"}`}
            </button>
        </>
    );
}

export default function ContextBar({ product, onOpenFormat, isMobile }: { product?: EditorProduct; onOpenFormat: () => void; isMobile: boolean }) {
    const doc = useEditor((s) => s.doc)!;
    const selection = useEditor((s) => s.selection);
    const showProps = useEditor((s) => s.showProps);
    const preview = useEditor((s) => s.preview);
    const els = selectedEls(doc, selection);
    const el = els[0];
    const upd: Upd = (patch, key = true) => el && st().updateEls([el.id], patch, { history: key });
    if (preview) return null;
    let body: React.ReactNode;
    if (!els.length) body = <DocBar doc={doc} product={product} onOpenFormat={onOpenFormat} />;
    else if (els.length > 1) body = <MultiBar els={els} />;
    else if (el.type === "text") body = <TextBar el={el} upd={upd} compact={isMobile} />;
    else if (el.type === "shape") body = <ShapeBar el={el} upd={upd} />;
    else if (el.type === "svg") body = <SvgBar el={el} upd={upd} />;
    else body = <ImageBar el={el} upd={upd} />;
    return (
        <div className={cx("pe-ctx flex h-[50px] shrink-0 items-center", isMobile ? "border-t" : "")} data-mode={!els.length ? "none" : els.length > 1 ? "multi" : el.type}>
            <div key={!els.length ? "none" : els.length > 1 ? "multi" : el.id} className="pe-noscrollbar pe-anim-fade flex min-w-0 flex-1 items-center gap-1 overflow-x-auto px-2 sm:px-3">
                {body}
            </div>
            {!isMobile && (
                <div className="flex shrink-0 items-center border-l border-[var(--pe-border)] px-2">
                    <Btn title={showProps ? "Ascunde setările avansate" : "Mai multe setări (poziție exactă, umbră, verificare print)"} wide active={showProps} onClick={() => st().toggle("showProps")}>
                        <SlidersHorizontal className={I} />
                        <span className="text-[13px]">Setări</span>
                    </Btn>
                </div>
            )}
        </div>
    );
}

// ---------------- panoul „Efecte” (stânga) ----------------
type FxId = "none" | "shadow" | "lift" | "outline" | "hollow" | "neon" | "highlight" | "curve" | "gradient";

function fxOf(el: TextEl): FxId[] {
    const out: FxId[] = [];
    const fillColor = el.fill.kind === "solid" ? el.fill.color : null;
    if (el.shadow) {
        if (el.shadow.dx === 0 && el.shadow.dy === 0 && el.shadow.blur > 0) out.push("neon");
        else if (el.shadow.blur > el.fontSize * 0.1) out.push("lift");
        else out.push("shadow");
    }
    if (el.stroke) out.push(fillColor === "transparent" ? "hollow" : "outline");
    if (el.bg) out.push("highlight");
    if (el.curve && Math.abs(el.curve) > 0.5) out.push("curve");
    if (el.fill.kind !== "solid") out.push("gradient");
    return out.length ? out : ["none"];
}

function FxPreview({ id }: { id: FxId }) {
    const base: React.CSSProperties = { fontFamily: "Anton, Impact, sans-serif", fontSize: 26, lineHeight: 1, color: "var(--pe-text)" };
    const styles: Record<FxId, React.CSSProperties> = {
        none: base,
        shadow: { ...base, textShadow: "3px 3px 0 rgba(0,0,0,.35)" },
        lift: { ...base, textShadow: "0 6px 10px rgba(0,0,0,.35)" },
        outline: { ...base, color: "#ffd60a", WebkitTextStroke: "1.5px #14211c" },
        hollow: { ...base, color: "transparent", WebkitTextStroke: "1.5px var(--pe-text)" },
        neon: { ...base, color: "#e9fbff", textShadow: "0 0 4px #00e5ff, 0 0 10px #00e5ff" },
        highlight: { ...base, background: "#ffd60a", padding: "1px 6px", borderRadius: 4 },
        curve: base,
        gradient: { ...base, background: "linear-gradient(90deg,#ff5f6d,#ffc371)", WebkitBackgroundClip: "text", color: "transparent" },
    };
    if (id === "curve")
        return (
            <svg width="64" height="34" viewBox="0 0 64 34" aria-hidden>
                <path id="pe-fx-arc" d="M4 30 Q32 -2 60 30" fill="none" />
                <text fontFamily="Anton, Impact, sans-serif" fontSize="15" fill="currentColor">
                    <textPath href="#pe-fx-arc" startOffset="50%" textAnchor="middle">Aa Aa</textPath>
                </text>
            </svg>
        );
    return <span style={styles[id]}>Aa</span>;
}

const FX: Array<{ id: FxId; label: string }> = [
    { id: "none", label: "Fără" },
    { id: "shadow", label: "Umbră" },
    { id: "lift", label: "Ridicat" },
    { id: "outline", label: "Contur" },
    { id: "hollow", label: "Gol" },
    { id: "neon", label: "Neon" },
    { id: "highlight", label: "Evidențiat" },
    { id: "curve", label: "Curbat" },
    { id: "gradient", label: "Gradient" },
];

export function EffectsPanel() {
    const doc = useEditor((s) => s.doc)!;
    const selection = useEditor((s) => s.selection);
    const el = selectedEls(doc, selection).find((e) => e.type === "text") as TextEl | undefined;
    if (!el)
        return (
            <div className="px-4 py-4">
                <h2 className="pe-panel-title">Efecte</h2>
                <div className="mt-6 flex flex-col items-center rounded-[var(--pe-radius)] border border-dashed border-[var(--pe-border-strong)] bg-[var(--pe-surface-2)] px-4 py-8 text-center">
                    <Sparkles className="h-7 w-7 text-[var(--pe-brand)]" />
                    <p className="mt-2 text-[13px] font-semibold text-[var(--pe-text)]">Selectează un text</p>
                    <p className="mt-1 text-[12px] text-[var(--pe-muted)]">Umbră, contur, neon, text curbat sau gradient — pentru orice text de pe planșă.</p>
                </div>
            </div>
        );
    const upd: Upd = (patch, key = true) => st().updateEls([el.id], patch, { history: key });
    const fs = el.fontSize;
    const active = fxOf(el);
    const solidColor = el.fill.kind === "solid" && el.fill.color !== "transparent" ? el.fill.color : el.fill.kind === "solid" ? "#14211c" : el.fill.stops[0].color;
    const apply = (id: FxId) => {
        const reset: Partial<TextEl> = { shadow: null, stroke: null, bg: null, curve: 0, fill: { kind: "solid", color: solidColor } };
        const map: Record<FxId, Partial<TextEl>> = {
            none: reset,
            shadow: { ...reset, shadow: { color: "#000000", blur: 0, dx: fs * 0.05, dy: fs * 0.05, opacity: 0.4 } },
            lift: { ...reset, shadow: { color: "#000000", blur: fs * 0.25, dx: 0, dy: fs * 0.08, opacity: 0.35 } },
            outline: { ...reset, stroke: { color: "#ffffff", width: 5 } },
            hollow: { ...reset, fill: { kind: "solid", color: "transparent" }, stroke: { color: solidColor, width: 3 } },
            neon: { ...reset, fill: { kind: "solid", color: "#e9fbff" }, shadow: { color: "#00e5ff", blur: fs * 0.3, dx: 0, dy: 0, opacity: 1 } },
            highlight: { ...reset, bg: { color: "#ffd60a", padding: 20, radius: 12 } },
            curve: { ...reset, curve: 40, autoFit: false },
            gradient: { ...reset, fill: { kind: "linear", angle: 0, stops: [{ offset: 0, color: "#ff5f6d" }, { offset: 1, color: "#ffc371" }] } },
        };
        upd(map[id] as Partial<El>);
    };
    return (
        <div className="pb-6">
            <div className="px-4 pb-3 pt-4">
                <h2 className="pe-panel-title">Efecte</h2>
                <p className="mt-1 text-[12px] text-[var(--pe-muted)]">Pentru textul selectat. Se reglează mai jos.</p>
            </div>
            <div className="grid grid-cols-3 gap-2.5 px-4">
                {FX.map((f) => (
                    <button key={f.id} type="button" onClick={() => apply(f.id)} className="pe-card group text-center">
                        <div className={cx("pe-card-media flex h-[64px] items-center justify-center bg-[var(--pe-surface-2)]", active.includes(f.id) && "!shadow-[0_0_0_2px_var(--pe-brand)]")}>
                            <FxPreview id={f.id} />
                        </div>
                        <div className={cx("mt-1 text-[11.5px] font-semibold", active.includes(f.id) ? "text-[var(--pe-brand)]" : "text-[var(--pe-text-2)]")}>{f.label}</div>
                    </button>
                ))}
            </div>
            <div className="mt-4 space-y-4 border-t border-[var(--pe-border)] px-4 pt-4">
                {el.shadow && (
                    <div>
                        <div className="pe-section-label mb-2">{active.includes("neon") ? "Neon" : "Umbră"}</div>
                        <ColorInput value={el.shadow.color} commitKey="shadow-color" onChange={(c, k) => c && upd({ shadow: { ...el.shadow!, color: c } }, k)} />
                        <div className="mt-2">
                            <Slider label={active.includes("neon") ? "Intensitate" : "Estompare"} value={el.shadow.blur} min={0} max={fs * 0.6} step={fs / 200} unit="mm" commitKey="shadow-blur" onChange={(v, k) => upd({ shadow: { ...el.shadow!, blur: v } }, k)} />
                            {!active.includes("neon") && <Slider label="Deplasare" value={el.shadow.dy} min={-fs * 0.3} max={fs * 0.3} step={fs / 200} unit="mm" commitKey="shadow-d" onChange={(v, k) => upd({ shadow: { ...el.shadow!, dy: v, dx: el.shadow!.dx === 0 ? 0 : v } }, k)} />}
                            <Slider label="Opacitate" value={Math.round(el.shadow.opacity * 100)} min={0} max={100} unit="%" commitKey="shadow-op" onChange={(v, k) => upd({ shadow: { ...el.shadow!, opacity: v / 100 } }, k)} />
                        </div>
                    </div>
                )}
                {el.stroke && (
                    <div>
                        <div className="pe-section-label mb-2">Contur</div>
                        <ColorInput value={el.stroke.color} commitKey="stroke-c" onChange={(c, k) => c && upd({ stroke: { ...el.stroke!, color: c } }, k)} />
                        <div className="mt-2">
                            <Slider label="Grosime" value={el.stroke.width} min={0.5} max={20} step={0.5} unit="%" commitKey="stroke-w" onChange={(v, k) => upd({ stroke: { ...el.stroke!, width: v } }, k)} />
                        </div>
                    </div>
                )}
                {el.bg && (
                    <div>
                        <div className="pe-section-label mb-2">Evidențiere</div>
                        <ColorInput value={el.bg.color} commitKey="bg-c" onChange={(c, k) => c && upd({ bg: { ...el.bg!, color: c } }, k)} />
                        <div className="mt-2">
                            <Slider label="Spațiu interior" value={el.bg.padding} min={0} max={80} unit="%" commitKey="bg-p" onChange={(v, k) => upd({ bg: { ...el.bg!, padding: v } }, k)} />
                            <Slider label="Colțuri rotunjite" value={el.bg.radius} min={0} max={80} unit="%" commitKey="bg-r" onChange={(v, k) => upd({ bg: { ...el.bg!, radius: v } }, k)} />
                        </div>
                    </div>
                )}
                {active.includes("curve") && (
                    <div>
                        <div className="pe-section-label mb-2">Curbură</div>
                        <Slider label="Curbură" value={el.curve ?? 0} min={-100} max={100} commitKey="curve" onChange={(v, k) => upd({ curve: Math.abs(v) < 2 ? 0 : v }, k)} />
                    </div>
                )}
                {el.fill.kind !== "solid" && (
                    <div>
                        <div className="pe-section-label mb-2">Gradient</div>
                        <PaintInput value={el.fill} commitKey="fill" onChange={(p, k) => p && upd({ fill: p }, k)} />
                    </div>
                )}
            </div>
        </div>
    );
}
