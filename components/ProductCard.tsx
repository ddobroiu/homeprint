"use client";
import { productCategoryLabel } from "@/lib/productCategoryLabel";
import { productHeroImage } from "@/lib/productHeroImages";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ProductVariantSelector from "./ProductVariantSelector";

interface ProductCardProps {
  product: {
    id: string;
    slug: string;
    routeSlug?: string;
    title: string;
    description?: string;
    price: number;
    images?: string[];
    category?: string;
    tags?: string[];
    metadata?: {
      category?: string;
      subcategory?: string;
      isSignage?: boolean;
      isMultiVariant?: boolean;
      variants?: Array<{
        type: 'afis' | 'canvas' | 'tapet' | 'autocolant';
        title: string;
        description: string;
        slug: string;
        price: number;
        route: string;
        configurator: string;
      }>;
      [key: string]: any; // Allow other properties
    };
  };
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  // State pentru modal și fallback imagine
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Verificăm dacă e produs multi-variant (Europosters)
  const isMultiVariant = product.metadata?.isMultiVariant === true;
  const variants = product.metadata?.variants || [];

  // LOGICA DE RUTARE: Determinăm link-ul corect bazat pe categorie
  const catRaw = String((product.metadata as any)?.category ?? product.category ?? "").toLowerCase();
  const isBanner = catRaw === "bannere" || catRaw === "banner";
  const isSemnalistica = catRaw === "semnalistică" || catRaw === "semnalistica";
  const isSignage = product.metadata?.isSignage === true;

  // Prefer routeSlug if it exists, otherwise build it based on category
  let href = product.routeSlug ? (product.routeSlug.startsWith('/') ? product.routeSlug : `/${product.routeSlug}`) : `/product/${product.slug}`;

  // Helper function to safely prepend category if not already present
  const getSafeHref = (prefix: string, slug: string) => {
    if (slug.startsWith(prefix.replace(/^\//, '')) || slug.startsWith(prefix)) {
      return slug.startsWith('/') ? slug : `/${slug}`;
    }
    return `${prefix}/${slug}`;
  };

  // Only apply category overrides if we don't have a specialized routeSlug from the catalog
  if (!product.routeSlug) {
    if (isSignage || isSemnalistica) { 
      href = getSafeHref('/semnalistica-product', product.slug);
    } else if (isBanner) { 
      href = getSafeHref('/banner-product', product.slug);
    } else if (catRaw === "banner-verso") {
      href = getSafeHref('/banner-verso', product.slug);
    } else if (catRaw === "afise") {
      href = getSafeHref('/afise', product.slug);
    } else if (catRaw === "autocolante") {
      href = getSafeHref('/autocolante', product.slug);
    } else if (catRaw === "flayere" || catRaw === "flyere") {
      href = getSafeHref('/flayere', product.slug);
    } else if (catRaw === "pliante") {
      href = getSafeHref('/pliante', product.slug);
    } else if (catRaw === "canvas") {
      href = getSafeHref('/canvas-product', product.slug);
    } else if (catRaw === "acrylic" || catRaw === "sticlă acrilică" || catRaw === "sticla acrilica") {
      href = getSafeHref('/acrylic-product', product.slug);
    } else if (catRaw === "tapet") {
      href = getSafeHref('/tapet', product.slug);
    } else if (catRaw === "stickere") {
      href = getSafeHref('/autocolante', product.slug);
    } else if (catRaw === "carton") {
      href = getSafeHref('/materiale/carton', product.slug);
    } else if (catRaw === "plexiglass" || catRaw === "plexiglas") {
      href = getSafeHref('/materiale/plexiglass', product.slug);
    } else if (catRaw === "alucobond") {
      href = getSafeHref('/materiale/alucobond', product.slug);
    } else if (catRaw === "polipropilena") {
      href = getSafeHref('/materiale/polipropilena', product.slug);
    } else if (catRaw === "pvc-forex") {
      href = getSafeHref('/materiale/pvc-forex', product.slug);
    } else if (catRaw === "fonduri-eu" || catRaw === "fonduri-pnrr") {
      href = `/fonduri-eu`; 
    }
  }

  // LOGICA IMAGINE ROBUSTĂ
  const imgs = product.images ?? [];
  const categoryPath = catRaw === "bannere" ? "banner" : catRaw;
  const configuratorImageWebp = productHeroImage(categoryPath);

  let img = configuratorImageWebp;
  if (imgs.length > 0) {
    img = imgs[0];
  }

  const finalImg = imgError ? configuratorImageWebp : img;

  // Handler pentru click
  const handleClick = (e: React.MouseEvent) => {
    if (isMultiVariant) {
      e.preventDefault();
      setShowVariantModal(true);
    }
  };

  const cardClass = "group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition duration-200 hover:border-blue-700/30 hover:shadow-[0_8px_24px_-12px_rgba(0,50,35,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4";
  const imageClass = "object-contain p-3 transition-transform duration-300 group-hover:scale-[1.025]";
  const CardContent = (
    <>
      <div className="relative aspect-[5/4] overflow-hidden bg-white">
        {finalImg.startsWith('http') ? (
          <img src={finalImg} alt={product.title} className={`absolute inset-0 h-full w-full ${imageClass}`} loading={priority ? "eager" : "lazy"} onError={() => setImgError(true)} />
        ) : (
          <Image src={finalImg} alt={product.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" className={imageClass} priority={priority} onError={() => setImgError(true)} />
        )}
        {isMultiVariant && <span className="absolute right-3 top-3 rounded-full border border-stone-200 bg-white/95 px-3 py-1 text-xs font-medium text-slate-600">{variants.length} variante</span>}
      </div>
      <div className="flex flex-1 flex-col px-5 pb-5 pt-3">
        <p className="mb-2 text-xs font-medium text-slate-500">{productCategoryLabel(product.metadata?.subcategory || product.metadata?.category || product.category || "Produs personalizat")}</p>
        <h3 className="text-lg font-semibold leading-snug text-[var(--design-ink)] transition-colors group-hover:text-blue-700">{product.title}</h3>
        {product.description && <div className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500" dangerouslySetInnerHTML={{ __html: product.description }} />}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-3 pt-5">
          {product.metadata?.isGuidedConfigurator ? <p className="text-sm text-slate-500">Preț în configurator</p> : <p className="whitespace-nowrap text-sm text-slate-500">de la <span className="text-lg font-semibold text-[var(--design-ink)]">{new Intl.NumberFormat('ro-RO', { maximumFractionDigits: 2 }).format(product.price)} lei</span></p>}
          <span className="flex items-center gap-2 text-sm font-medium text-[var(--design-accent)]">{isMultiVariant ? "Alege" : "Configurează"}<ArrowRight size={17} strokeWidth={1.7} /></span>
        </div>
      </div>
    </>
  );

  return (
    <>
      {isMultiVariant ? (
        <div
          onClick={handleClick}
          role="button"
          tabIndex={0}
          aria-label={`Alege varianta pentru ${product.title}`}
          onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setShowVariantModal(true); } }}
          className={cardClass}
        >
          {CardContent}
        </div>
      ) : (
        <Link
          href={href}
          className={cardClass}
        >
          {CardContent}
        </Link>
      )}

      {/* Modal pentru variante */}
      {showVariantModal && isMultiVariant && (
        <ProductVariantSelector
          productTitle={product.title}
          productImage={finalImg}
          variants={variants}
          onClose={() => setShowVariantModal(false)}
        />
      )}
    </>
  );
}