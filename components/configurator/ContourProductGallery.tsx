"use client";
import Image from "next/image";
import { useState } from "react";
type GalleryImage={src:string;alt:string;label:string};
export default function ContourProductGallery({images}:{images:GalleryImage[]}){
 const [selected,setSelected]=useState(0);
 const current=images[selected]||images[0];
 return <div data-contour-gallery><div className="relative aspect-square overflow-hidden rounded-3xl border border-slate-200 bg-white"><Image src={current.src} alt={current.alt} fill priority sizes="(max-width:1024px) 100vw,50vw" className="object-contain p-5"/></div><p className="mt-3 text-sm font-semibold text-slate-700" aria-live="polite">{current.label}</p><div className="mt-3 grid grid-cols-3 gap-3">{images.map((image,index)=><button data-contour-thumbnail type="button" key={image.src} onClick={()=>setSelected(index)} aria-pressed={selected===index} aria-label={`Vezi ${image.label.toLowerCase()}`} className={`overflow-hidden rounded-xl border-2 bg-white p-2 text-left ${selected===index?"border-emerald-600 ring-2 ring-emerald-100":"border-slate-200 hover:border-emerald-400"}`}><Image src={image.src} alt="" width={150} height={150} className="aspect-square w-full object-contain"/><span className="mt-2 block text-xs font-semibold text-slate-700">{image.label}</span></button>)}</div></div>;
}
