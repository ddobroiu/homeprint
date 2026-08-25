"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingCart } from "lucide-react";
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
  const configuratorImageWebp = `/products/${categoryPath}/1.webp`;

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

    const CardContent = (
    <>
      {/* Etichetă categorie - deasupra imaginii, stil editorial */}
      <div className="flex items-center gap-2 px-5 pt-5">
        <span className="text-[10px] font-bold text-amber-700 uppercase tracking-[0.2em]">
          {product.metadata?.category || product.category || "Produs"}
        </span>
        {product.metadata?.subcategory && (
          <>
            <span className="w-1 h-1 rounded-full bg-stone-300"></span>
            <span className="text-[10px] text-stone-400 uppercase tracking-[0.15em] font-semibold">{product.metadata.subcategory}</span>
          </>
        )}
      </div>

      {/* Imagine */}
      <div className="relative aspect-[5/4] overflow-hidden mx-5 mt-3 rounded-xl bg-stone-100 group">
        {finalImg.startsWith('http') ? (
          <img
            src={finalImg}
            alt={`${product.title} - Tipar digital și personalizare online ${catRaw ? `din categoria ${catRaw}` : ''}`}
            title={`${product.title} | HomePrint România`}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            loading={priority ? "eager" : "lazy"}
            onError={() => setImgError(true)}
          />
        ) : (
          <Image
            src={finalImg}
            alt={`${product.title} - Tipar digital și personalizare online ${catRaw ? `din categoria ${catRaw}` : ''}`}
            title={`${product.title} | HomePrint România`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            loading={priority ? undefined : "lazy"}
            priority={priority}
            onError={() => setImgError(true)}
          />
        )}

        {/* Badge Multi-Variant */}
        {isMultiVariant && (
          <div className="absolute top-3 right-3 bg-stone-900/90 backdrop-blur text-white px-2.5 py-1 rounded-full z-10 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></div>
            <span className="text-[9px] font-bold uppercase tracking-widest">4 variante</span>
          </div>
        )}
      </div>

      {/* Conținut */}
      <div className="px-5 pt-4 pb-5 flex flex-col flex-1 relative">
        <div className="mb-auto">
          <h3 className="text-lg leading-snug text-stone-900 group-hover:text-amber-700 transition-colors duration-300">
            {product.title}
          </h3>
          {product.description && (
            <div
              className="mt-2 text-sm text-stone-500 line-clamp-2 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          )}
          {!product.description && (
            <p className="mt-2 text-sm text-stone-500 line-clamp-2 leading-relaxed">
              Materiale publicitare de înaltă performanță pentru afacerea ta.
            </p>
          )}
        </div>

        {/* Footer Card */}
        <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between group/btn cursor-pointer">
          <div>
            <span className="text-[10px] text-stone-400 uppercase tracking-widest font-semibold block">De la</span>
            <span className="text-base font-bold text-stone-900 tracking-tight">{product.price} RON</span>
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-amber-700 group-hover:text-amber-800 transition-colors flex items-center gap-1.5">
            {isMultiVariant ? "Alege" : "Configurează"}
            <ArrowRight size={14} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </>
  );

  return (
    <>
      {isMultiVariant ? (
        <div
          onClick={handleClick}
          className="group flex flex-col bg-[#FBF7F1] border border-stone-200 rounded-2xl overflow-hidden hover:border-amber-300 hover:shadow-[0_12px_32px_-16px_rgba(120,53,15,0.25)] transition-all duration-500 h-full cursor-pointer"
        >
          {CardContent}
        </div>
      ) : (
        <Link
          href={href}
          className="group flex flex-col bg-[#FBF7F1] border border-stone-200 rounded-2xl overflow-hidden hover:border-amber-300 hover:shadow-[0_12px_32px_-16px_rgba(120,53,15,0.25)] transition-all duration-500 h-full"
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