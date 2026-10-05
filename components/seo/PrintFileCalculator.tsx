"use client";
import { useId, useState } from "react";
import { printFileDimensions } from "@/lib/seo/fileReadiness";

export default function PrintFileCalculator({width,height,ppi}:{width:number;height:number;ppi:number}) {
  const id=useId();
  const [values,setValues]=useState({width:String(width),height:String(height),pixelWidth:"3000",pixelHeight:"2000",ppi:String(ppi),bleed:"0"});
  const number=(s:string)=>Number(s.trim().replace(",","."));
  const result=printFileDimensions(number(values.width),number(values.height),number(values.pixelWidth),number(values.pixelHeight),number(values.ppi),number(values.bleed));
  const fields=[['width','Lățime finală (cm)'],['height','Înălțime finală (cm)'],['pixelWidth','Lățimea imaginii (pixeli)'],['pixelHeight','Înălțimea imaginii (pixeli)'],['ppi','Țintă aleasă pentru calcul (ppi)'],['bleed','Margine de tăiere pe fiecare latură (mm)']] as const;
  return <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
    <div className="grid gap-4 sm:grid-cols-2">{fields.map(([key,label])=><label key={key} htmlFor={`${id}-${key}`} className="text-sm font-semibold">{label}<input id={`${id}-${key}`} inputMode="decimal" value={values[key]} onChange={e=>setValues({...values,[key]:e.target.value})} className="mt-2 block w-full rounded-lg border border-slate-300 px-3 py-2 font-normal" /></label>)}</div>
    <div aria-live="polite" className="mt-6 rounded-xl bg-slate-50 p-4 text-sm">
      {result ? <><p><strong>Rezoluție efectivă: {result.minimumPpi.toFixed(1)} ppi</strong> pe axa cu densitatea mai mică.</p><p className="mt-2">Pentru ținta aleasă, formatul final are nevoie de cel puțin <strong>{result.requiredWidth.toLocaleString('ro-RO')} × {result.requiredHeight.toLocaleString('ro-RO')} pixeli</strong>.</p><p className="mt-2">Format cu marginea introdusă: {result.widthWithBleedMm.toLocaleString('ro-RO')} × {result.heightWithBleedMm.toLocaleString('ro-RO')} mm.</p></> : <p>Introdu dimensiuni și o țintă pozitive, dimensiuni întregi în pixeli și o margine de cel puțin 0 mm.</p>}
    </div>
    <p className="mt-4 text-xs leading-relaxed text-slate-600">Valorile inițiale sunt exemple de calcul, nu o cerință de producție. Calculatorul nu verifică fișierul și nu simulează decuparea sau întinderea pe șasiu. Confirmă rezoluția și marginile pentru produsul ales; modificarea valorii DPI dintr-un editor nu adaugă automat detalii fotografiei.</p>
  </div>;
}
