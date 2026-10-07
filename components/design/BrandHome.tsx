import { EDITORIAL_POSTS } from "@/lib/blogPosts";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, FileCheck2, MapPin, SlidersHorizontal } from "lucide-react";
import { CONFIGURATORS_REGISTRY, ALL_CONFIGURATORS } from "@/lib/configurators-registry";
import { getFromPrice } from "@/lib/seo/fromPrice";
import { brandDesign as design, brandKey, brandEditorial as editorial } from "@/lib/brandDesign";
import ProductCollection, { ProductCard, type DesignProduct } from "./ProductCollection";
import StudioHome from "./StudioHome";
import AiChatWidget from "@/components/AiChatWidget";

export function designProducts(localBase?: string): DesignProduct[] {
  return (localBase ? CONFIGURATORS_REGISTRY : ALL_CONFIGURATORS).map(product => {
    const from = getFromPrice([product.id]);
    return { id: product.id, name: product.name, image: product.image || "/placeholder.png", href: localBase ? `${localBase}/${product.slug || product.id}` : product.url, category: product.category, price: from?.text, basis: from?.basis };
  });
}

export function DesignSteps() {
  return <ol className="design-steps">{design.steps.map((step, index) => <li key={step.title}><span className="design-step-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>;
}

export default function BrandHome() { return <StudioHome products={designProducts()} />; }
