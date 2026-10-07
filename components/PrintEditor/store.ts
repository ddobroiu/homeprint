"use client";
// Starea editorului (zustand): documentul, selecția, istoricul (undo / redo), vizualizarea.
import { create } from "zustand";
import { cloneWithNewIds, normalizeEl, uid } from "@/lib/editor/doc";
import type { EditorDoc, El } from "@/lib/editor/types";

const HISTORY_LIMIT = 80;

export type Panel = "sabloane" | "text" | "elemente" | "imagini" | "incarcari" | "fundal" | "straturi" | "efecte" | null;

type HistoryOpts = { history?: boolean | string };

type State = {
    doc: EditorDoc | null;
    selection: string[];
    editingTextId: string | null;
    past: EditorDoc[];
    future: EditorDoc[];
    lastCommitKey: string | null;
    lastCommitAt: number;
    gestureStart: EditorDoc | null;
    zoom: number;
    zoomReq: { factor: number; n: number } | null;
    requestZoom: (factor: number) => void;
    panel: Panel;
    showGuides: boolean;
    showRulers: boolean;
    preview: boolean;
    clipboard: El[];
    fontEpoch: number;
    dirty: boolean;
    /** poza care va fi înlocuită de următoarea poză aleasă („Înlocuiește”) */
    replaceTargetId: string | null;
    setReplaceTarget: (id: string | null) => void;
    /** panoul din dreapta (setări avansate) deschis */
    showProps: boolean;

    setDoc: (doc: EditorDoc, opts?: HistoryOpts & { resetHistory?: boolean }) => void;
    update: (fn: (doc: EditorDoc) => EditorDoc, opts?: HistoryOpts) => void;
    updateEls: (ids: string[], patch: Partial<El> | ((el: El) => El), opts?: HistoryOpts) => void;
    addEls: (els: El[], opts?: { select?: boolean }) => void;
    removeSelected: () => void;
    select: (ids: string[], additive?: boolean) => void;
    setEditingText: (id: string | null) => void;
    beginGesture: () => void;
    endGesture: () => void;
    undo: () => void;
    redo: () => void;
    setZoom: (z: number) => void;
    setPanel: (p: Panel) => void;
    toggle: (k: "showGuides" | "showRulers" | "preview" | "showProps") => void;
    copy: (cut?: boolean) => void;
    paste: () => void;
    duplicate: () => void;
    reorder: (dir: "up" | "down" | "top" | "bottom") => void;
    moveTo: (id: string, index: number) => void;
    group: () => void;
    ungroup: () => void;
    bumpFonts: () => void;
    markSaved: () => void;
};

function pushPast(past: EditorDoc[], doc: EditorDoc): EditorDoc[] {
    const next = [...past, doc];
    return next.length > HISTORY_LIMIT ? next.slice(next.length - HISTORY_LIMIT) : next;
}

/** Selecția extinsă la grupuri întregi. */
export function expandGroups(doc: EditorDoc, ids: string[]): string[] {
    const groups = new Set(doc.elements.filter((e) => ids.includes(e.id) && e.groupId).map((e) => e.groupId));
    if (!groups.size) return ids;
    return doc.elements.filter((e) => ids.includes(e.id) || (e.groupId && groups.has(e.groupId))).map((e) => e.id);
}

export const useEditor = create<State>((set, get) => {
    // istoric: `history: true` = pas nou; `history: "cheie"` = pași grupați (slidere, tastare)
    const commit = (prev: EditorDoc | null, opts?: HistoryOpts) => {
        const h = opts?.history ?? true;
        if (!prev || h === false) return {};
        const s = get();
        if (typeof h === "string" && s.lastCommitKey === h && Date.now() - s.lastCommitAt < 1200) {
            return { lastCommitAt: Date.now(), future: [] };
        }
        return { past: pushPast(s.past, prev), future: [], lastCommitKey: typeof h === "string" ? h : null, lastCommitAt: Date.now() };
    };

    return {
        doc: null,
        selection: [],
        editingTextId: null,
        past: [],
        future: [],
        lastCommitKey: null,
        lastCommitAt: 0,
        gestureStart: null,
        zoom: 1,
        zoomReq: null,
        requestZoom: (factor) => set({ zoomReq: { factor, n: (get().zoomReq?.n ?? 0) + 1 } }),
        panel: "sabloane",
        showGuides: true,
        showRulers: true,
        preview: false,
        clipboard: [],
        fontEpoch: 0,
        dirty: false,
        replaceTargetId: null,
        setReplaceTarget: (id) => set({ replaceTargetId: id }),
        showProps: false,

        setDoc: (doc, opts) => {
            const prev = get().doc;
            if (opts?.resetHistory) {
                set({ doc, past: [], future: [], selection: [], editingTextId: null, dirty: false });
                return;
            }
            set({ doc, dirty: true, ...commit(prev, opts) });
        },
        update: (fn, opts) => {
            const prev = get().doc;
            if (!prev) return;
            const next = fn(prev);
            if (next === prev) return;
            set({ doc: next, dirty: true, ...(get().gestureStart ? {} : commit(prev, opts)) });
        },
        updateEls: (ids, patch, opts) => {
            const idSet = new Set(ids);
            get().update(
                (doc) => ({
                    ...doc,
                    elements: doc.elements.map((el) => {
                        if (!idSet.has(el.id)) return el;
                        const next = typeof patch === "function" ? patch(el) : ({ ...el, ...patch } as El);
                        return normalizeEl(next);
                    }),
                }),
                opts,
            );
        },
        addEls: (els, opts) => {
            get().update((doc) => ({ ...doc, elements: [...doc.elements, ...els.map(normalizeEl)] }));
            if (opts?.select !== false) set({ selection: els.map((e) => e.id), editingTextId: null });
        },
        removeSelected: () => {
            const { selection, doc } = get();
            if (!doc || !selection.length) return;
            const ids = new Set(selection);
            get().update((d) => ({ ...d, elements: d.elements.filter((e) => !ids.has(e.id) || e.locked) }));
            set({ selection: [], editingTextId: null });
        },
        select: (ids, additive) => {
            const doc = get().doc;
            if (!doc) return;
            let next = expandGroups(doc, ids);
            if (additive) {
                const cur = new Set(get().selection);
                const allIn = next.every((id) => cur.has(id));
                next = allIn ? [...cur].filter((id) => !next.includes(id)) : [...new Set([...cur, ...next])];
            }
            set({ selection: next, editingTextId: get().editingTextId && next.includes(get().editingTextId!) ? get().editingTextId : null });
        },
        setEditingText: (id) => set({ editingTextId: id }),
        beginGesture: () => set({ gestureStart: get().doc }),
        endGesture: () => {
            const { gestureStart, doc } = get();
            if (gestureStart && doc && gestureStart !== doc) {
                set({ past: pushPast(get().past, gestureStart), future: [], lastCommitKey: null });
            }
            set({ gestureStart: null });
        },
        undo: () => {
            const { past, doc, future } = get();
            if (!past.length || !doc) return;
            const prev = past[past.length - 1];
            const ids = new Set(prev.elements.map((e) => e.id));
            set({ doc: prev, past: past.slice(0, -1), future: [doc, ...future], selection: get().selection.filter((id) => ids.has(id)), editingTextId: null, lastCommitKey: null, dirty: true });
        },
        redo: () => {
            const { past, doc, future } = get();
            if (!future.length || !doc) return;
            const next = future[0];
            const ids = new Set(next.elements.map((e) => e.id));
            set({ doc: next, past: pushPast(past, doc), future: future.slice(1), selection: get().selection.filter((id) => ids.has(id)), editingTextId: null, lastCommitKey: null, dirty: true });
        },
        setZoom: (z) => set({ zoom: Math.max(0.02, Math.min(64, z)) }),
        setPanel: (p) => set({ panel: p }),
        toggle: (k) => set({ [k]: !get()[k] } as Partial<State>),
        copy: (cut) => {
            const { doc, selection } = get();
            if (!doc || !selection.length) return;
            set({ clipboard: doc.elements.filter((e) => selection.includes(e.id)) });
            if (cut) get().removeSelected();
        },
        paste: () => {
            const { clipboard } = get();
            if (!clipboard.length) return;
            const doc = get().doc!;
            const off = Math.min(doc.wMm, doc.hMm) * 0.02;
            const els = cloneWithNewIds(clipboard).map((e) => ({ ...e, x: e.x + off, y: e.y + off, locked: false }));
            set({ clipboard: els });
            get().addEls(els);
        },
        duplicate: () => {
            const { doc, selection } = get();
            if (!doc || !selection.length) return;
            const off = Math.min(doc.wMm, doc.hMm) * 0.02;
            const els = cloneWithNewIds(doc.elements.filter((e) => selection.includes(e.id))).map((e) => ({ ...e, x: e.x + off, y: e.y + off, locked: false }));
            get().addEls(els);
        },
        reorder: (dir) => {
            const { selection } = get();
            if (!selection.length) return;
            const sel = new Set(selection);
            get().update((doc) => {
                const els = [...doc.elements];
                const picked = els.filter((e) => sel.has(e.id));
                const rest = els.filter((e) => !sel.has(e.id));
                if (dir === "top") return { ...doc, elements: [...rest, ...picked] };
                if (dir === "bottom") return { ...doc, elements: [...picked, ...rest] };
                // un pas: mută peste / sub vecinul care nu e selectat
                const idx = els.map((e, i) => (sel.has(e.id) ? i : -1)).filter((i) => i >= 0);
                if (dir === "up") {
                    for (let k = idx.length - 1; k >= 0; k--) {
                        const i = idx[k];
                        if (i < els.length - 1 && !sel.has(els[i + 1].id)) [els[i], els[i + 1]] = [els[i + 1], els[i]];
                    }
                } else {
                    for (const i of idx) if (i > 0 && !sel.has(els[i - 1].id)) [els[i], els[i - 1]] = [els[i - 1], els[i]];
                }
                return { ...doc, elements: els };
            });
        },
        moveTo: (id, index) => {
            get().update((doc) => {
                const els = doc.elements.filter((e) => e.id !== id);
                const el = doc.elements.find((e) => e.id === id);
                if (!el) return doc;
                els.splice(Math.max(0, Math.min(els.length, index)), 0, el);
                return { ...doc, elements: els };
            });
        },
        group: () => {
            const { selection } = get();
            if (selection.length < 2) return;
            const g = uid();
            get().updateEls(selection, { groupId: g } as Partial<El>);
        },
        ungroup: () => {
            const { selection } = get();
            get().updateEls(selection, { groupId: undefined } as Partial<El>);
            set({ selection: selection.slice(0, 1) });
        },
        bumpFonts: () => set({ fontEpoch: get().fontEpoch + 1 }),
        markSaved: () => set({ dirty: false }),
    };
});

export function selectedEls(doc: EditorDoc | null, selection: string[]): El[] {
    if (!doc) return [];
    const s = new Set(selection);
    return doc.elements.filter((e) => s.has(e.id));
}

// doar în dezvoltare: acces din consolă / testele automate de interfață
if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") (window as unknown as { __pe?: typeof useEditor }).__pe = useEditor;
