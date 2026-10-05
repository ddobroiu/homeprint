"use client";
import { useEffect, useState } from "react";

import { useCart } from "@/components/CartContext";
import { useToast } from "@/components/ToastProvider";
import { calculatePVCForexPrice, formatMoneyDisplay } from "@/lib/pricing";

import { AccordionStep } from "./ui/AccordionStep";
import { MobileConfiguratorSummary } from "./ui/MobileConfiguratorSummary";
import ContourProductGallery from "./ContourProductGallery";

export default function ChildPhotoConfigurator(){
 const {addItem}=useCart(); const {success}=useToast();
 const [step,setStep]=useState(1);
 const [height,setHeight]=useState(100); const [width,setWidth]=useState(70); const [quantity,setQuantity]=useState(1);
 const [notes,setNotes]=useState("");
 const [photo,setPhoto]=useState(""); const [preview,setPreview]=useState(""); const [filename,setFilename]=useState("");
 const [busy,setBusy]=useState(false); const [error,setError]=useState("");
 useEffect(()=>()=>{if(preview) URL.revokeObjectURL(preview);},[preview]);
 const cost=calculatePVCForexPrice({width_cm:width,height_cm:height,quantity,thickness_mm:3,contour_cut:true,designOption:"upload",stock_model:true});
 const total=Math.round((cost.finalPrice+50)*100)/100;
 const valid=Number.isFinite(width)&&Number.isFinite(height)&&width>=10&&height>=10&&width<=200&&height<=300&&Number.isInteger(quantity)&&quantity>=1;
 const ready=valid&&!!photo&&!busy;
 async function upload(file:File|undefined){
  setPhoto("");setFilename("");setPreview("");setError(""); if(!file)return;
  if(!["image/jpeg","image/png","image/webp"].includes(file.type)||file.size>20*1024*1024){setError("Alege o fotografie JPG, PNG sau WebP de maximum 20 MB.");return;}
  setBusy(true);
  try {const form=new FormData();form.append("file",file);const response=await fetch("/api/upload",{method:"POST",body:form});if(!response.ok)throw new Error("Fotografia nu a fost salvată. Încearcă din nou.");const result=await response.json();if(typeof result.url!=="string"||!/^https?:\/\//.test(result.url))throw new Error("Nu am primit un fișier salvat valid.");setPhoto(result.url);setFilename(file.name);setPreview(URL.createObjectURL(file));}
  catch(e){setError(e instanceof Error?e.message:"Încărcarea nu a reușit.");}finally{setBusy(false);}
 }
 function add(){if(!ready)return;addItem({id:`decor-foto-copil-${Date.now()}`,productId:"decor-foto-copil",slug:"decor-foto-copil",routeSlug:"configurator/decor-foto-copil",title:`Decor cu fotografia copilului · ${width} × ${height} cm`,image:"/products/decor-foto-copil/decor-pvc-fotografia-copilului-silueta-decupata.webp",width,height,quantity,price:total/quantity,metadata:{"Model ales":"Fotografia copilului decupată pe contur","Imagine":"/products/decor-foto-copil/decor-pvc-fotografia-copilului-silueta-decupata.webp","Material":"PVC imprimat 3 mm, material inclus","Dimensiune":`${width} × ${height} cm`,"Decupare":"Pe contur special (+20%)","Taxă decupare":cost.contourCutPrice,"Prelucrare fotografie și contur":50,"Indicații grafică":notes.trim(),"Grafică":"Fotografia copilului; fundal eliminat și contur pregătit manual",artworkUrl:photo,Fisier:photo,"Nume fișier":filename,contour_cut:true}});success("Decorul și fotografia au fost adăugate în coș.");}
 const input="mt-1 w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900";
 return <div data-child-photo-configurator className="brand-configurator grid items-start gap-8 pb-24 lg:grid-cols-2">
  <div className="lg:sticky lg:top-24"><ContourProductGallery images={[{"src": "/products/decor-foto-copil/decor-pvc-fotografia-copilului-silueta-decupata.webp", "alt": "Exemplu de fotografie a copilului imprimată pe PVC, vedere din față", "label": "Exemplu · vedere din față"}, {"src": "/products/decor-contur/decor-pvc-copil-lateral-3mm-contur.webp", "alt": "Exemplu de decor cu fotografia copilului din lateral, placă PVC subțire de 3 mm", "label": "Exemplu · vedere din lateral"}, {"src": "/products/decor-contur/decor-pvc-copil-detaliu-3mm-contur.webp", "alt": "Detaliu ilustrativ al marginii albe de PVC de 3 mm și al tăieturii pe contur", "label": "Detaliu · margine și contur"}]}/>{preview&&<div className="mt-5 rounded-2xl border bg-white p-4"><p className="mb-3 font-semibold text-slate-800">Imaginea ta încărcată</p><img src={preview} alt="Fișierul încărcat pentru această comandă" className="max-h-72 w-full object-contain"/></div>}<p className="mt-4 text-sm leading-relaxed text-slate-600">Imagini ilustrative pentru forma produsului și finisaj. Comanda ta se realizează din imaginea încărcată. Este o placă PVC de 3 mm, imprimată pe față și decupată pe contur, cu margine și spate albe; nu are volum de figurină. Eliminăm fundalul și pregătim conturul manual înainte de producție. Suportul și montajul nu sunt incluse.</p></div>
  <div><h1 className="text-3xl font-extrabold text-slate-900">Decor aniversar cu fotografia copilului</h1><p className="my-4 text-slate-600">Trimite fotografia copilului și alege dimensiunea decorului imprimat pe PVC de 3 mm, decupat după siluetă.</p>
  <div className="rounded-2xl border bg-white px-4">
   <AccordionStep stepNumber={1} title="Fotografia copilului" summary={photo?"Fotografie salvată":"Încarcă fotografia copilului"} isOpen={step===1} onClick={()=>setStep(1)}>
    <label className="mt-5 block rounded-xl border-2 border-dashed p-4 font-semibold">Încarcă fotografia copilului<input data-child-photo-upload type="file" accept="image/jpeg,image/png,image/webp" disabled={busy} onChange={e=>void upload(e.target.files?.[0])} className="mt-3 block max-w-full text-sm"/></label><p className="mt-2 text-sm text-slate-600">JPG, PNG sau WebP, maximum 20 MB. Pentru o siluetă completă, trimite o fotografie în care copilul apare întreg, fără mâini sau picioare tăiate din cadru.</p>{busy&&<p role="status">Se salvează fotografia…</p>}{photo&&<p role="status" className="mt-2 text-emerald-700">Fotografie salvată: {filename}</p>}{error&&<p role="alert" className="mt-2 text-red-700">{error}</p>}<button type="button" onClick={()=>setStep(2)} className="btn-outline mt-4 p-3">Continuă cu dimensiunea →</button>
   </AccordionStep>
   <AccordionStep stepNumber={2} title="Dimensiuni și cantitate" summary={`${width} × ${height} cm · ${quantity} buc.`} isOpen={step===2} onClick={()=>setStep(2)}>
    <div className="grid grid-cols-2 gap-2">{[50,80,100,120].map(h=><button type="button" key={h} onClick={()=>{setHeight(h);setWidth(h*0.7);}} className={`rounded-xl border-2 p-3 font-semibold ${height===h&&width===h*0.7?"border-emerald-600 bg-emerald-50":"border-slate-200"}`}>{h*0.7} × {h} cm</button>)}</div><p className="my-3 font-bold">Am nevoie de altă dimensiune</p><div className="grid grid-cols-2 gap-3"><label>Lățime (cm)<input type="number" min={10} max={200} value={width} onChange={e=>setWidth(Number(e.target.value))} className={input}/></label><label>Înălțime (cm)<input type="number" min={10} max={300} value={height} onChange={e=>setHeight(Number(e.target.value))} className={input}/></label></div><label className="mt-3 block">Cantitate<input type="number" min={1} step={1} value={quantity} onChange={e=>setQuantity(Number(e.target.value))} className={input}/></label><p className="mt-3 text-sm text-slate-600">Dimensiunea reprezintă lățimea și înălțimea maximă a decorului finit. Adaptăm compoziția fără să deformăm fotografia. Fără penalizare pentru suprafețe mici.</p><button type="button" onClick={()=>setStep(3)} className="btn-outline mt-4 p-3">Continuă cu personalizarea →</button>
   </AccordionStep>
   <AccordionStep stepNumber={3} title="Personalizare" summary={notes.trim()?"Indicații completate":"Indicații pentru grafică (opțional)"} isOpen={step===3} onClick={()=>setStep(3)} isLast>
    <label className="mt-3 block">Indicații pentru grafică<textarea rows={3} maxLength={2000} value={notes} onChange={e=>setNotes(e.target.value)} className={input}/></label><p className="mt-3 text-sm text-slate-600">Prelucrarea fotografiei și pregătirea conturului costă 50 lei o singură dată pentru această configurație, indiferent de numărul de exemplare identice.</p>
   </AccordionStep>
  </div><section className="mt-5 rounded-2xl border bg-white p-5"><dl className="space-y-3"><div className="flex justify-between gap-2"><dt>PVC imprimat · {quantity} buc.</dt><dd>{formatMoneyDisplay(cost.basePrice)}</dd></div><div className="flex justify-between gap-2"><dt>Decupare pe contur · 20% din PVC</dt><dd>{formatMoneyDisplay(cost.contourCutPrice)}</dd></div><div className="flex justify-between gap-2"><dt>Prelucrare fotografie și contur</dt><dd>50 lei</dd></div><div className="flex justify-between border-t pt-3 text-xl font-bold"><dt>Total</dt><dd data-child-photo-total={total}>{formatMoneyDisplay(total)}</dd></div></dl><p className="mt-3 text-sm text-slate-600">Materialul și imprimarea sunt incluse. Cei 20% nu se aplică taxei de prelucrare sau transportului.</p><button data-child-photo-add type="button" onClick={add} disabled={!ready} className="mt-5 w-full rounded-xl bg-emerald-600 p-4 font-bold text-white disabled:bg-slate-300">Adaugă în coș</button>{!ready&&<p role="status" className="mt-3 text-sm">{!valid?"Verifică dimensiunile și cantitatea.":busy?"Așteaptă salvarea fotografiei.":"Încarcă fotografia pentru a continua."}</p>}</section>
  </div><MobileConfiguratorSummary total={total} onAdd={add} disabled={!ready}/>
 </div>;
}
