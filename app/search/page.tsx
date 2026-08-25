"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Filter, X, SlidersHorizontal, Grid3X3, List, ChevronDown } from "lucide-react";
import SearchBox from "@/components/SearchBox";
import ProductCard from "@/components/ProductCard";
import ProductCardCompact from "@/components/ProductCardCompact";

type SearchResult = {
  id: string;
  slug: string;
  title: string;
  description: string;
  images?: string[];
  category: string;
  tags?: string[];
  priceBase?: number;
  score: number;
};

type SearchResponse = {
  results: SearchResult[];
  total: number;
  query: string;
  category: string;
};

const CATEGORIES = [
  { key: "toate", label: "Toate" },
  { key: "bannere", label: "Bannere" },
  { key: "afise", label: "Afișe" },
  { key: "autocolante", label: "Autocolante" },
  { key: "pliante", label: "Pliante" },
  { key: "flayere", label: "Flyere" },
  { key: "canvas", label: "Canvas" },
  { key: "tapet", label: "Tapet" },
  { key: "carton", label: "Carton" },
  { key: "alucobond", label: "Alucobond" },
  { key: "plexiglass", label: "Plexiglass" },
  { key: "polipropilena", label: "Polipropilena" },
  { key: "pvc-forex", label: "PVC Forex" },
];

const SORT_OPTIONS = [
  { key: "relevance", label: "Relevanță" },
  { key: "price_asc", label: "Preț: crescător" },
  { key: "price_desc", label: "Preț: descrescător" },
  { key: "title", label: "Nume A-Z" },
];

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // State
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "toate");
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({
    min: searchParams.get("price_min") || "",
    max: searchParams.get("price_max") || ""
  });

  // Search function
  const performSearch = async () => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("q", query);
      params.set("limit", "50");
      if (category !== "toate") params.set("category", category);

      const response = await fetch(`/api/search?${params.toString()}`);
      const data: SearchResponse = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Update URL and search when parameters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category !== "toate") params.set("category", category);
    if (sortBy !== "relevance") params.set("sort", sortBy);
    if (priceRange.min) params.set("price_min", priceRange.min);
    if (priceRange.max) params.set("price_max", priceRange.max);

    const newUrl = `/search${params.toString() ? `?${params.toString()}` : ""}`;
    window.history.replaceState(null, "", newUrl);

    performSearch();
  }, [query, category, sortBy, priceRange]);

  // Initial search from URL params
  useEffect(() => {
    if (query) {
      performSearch();
    }
  }, []);

  // Filter and sort results
  const filteredAndSortedResults = useMemo(() => {
    let filtered = [...results];

    // Price filtering
    if (priceRange.min || priceRange.max) {
      const min = parseFloat(priceRange.min) || 0;
      const max = parseFloat(priceRange.max) || Infinity;
      filtered = filtered.filter(item => {
        const price = item.priceBase || 0;
        return price >= min && price <= max;
      });
    }

    // Sorting
    switch (sortBy) {
      case "price_asc":
        filtered.sort((a, b) => (a.priceBase || 0) - (b.priceBase || 0));
        break;
      case "price_desc":
        filtered.sort((a, b) => (b.priceBase || 0) - (a.priceBase || 0));
        break;
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "relevance":
      default:
        filtered.sort((a, b) => b.score - a.score);
        break;
    }

    return filtered;
  }, [results, priceRange, sortBy]);

  const handleClearFilters = () => {
    setQuery("");
    setCategory("toate");
    setSortBy("relevance");
    setPriceRange({ min: "", max: "" });
    setResults([]);
  };

  const hasActiveFilters = category !== "toate" || priceRange.min || priceRange.max || sortBy !== "relevance";

  return (
    <main className="min-h-screen bg-background py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-7xl font-black text-white mb-8 tracking-tighter uppercase italic leading-none">
            Caută <span className="text-green-500 neon-text-green">Produse</span>
          </h1>
          
          {/* Main Search */}
          <div className="mb-10 max-w-2xl relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-amber-500/20 rounded-[2rem] blur opacity-25 group-focus-within:opacity-100 transition duration-1000 group-focus-within:duration-200"></div>
            <SearchBox 
              placeholder="Caută bannere, afișe, autocolante..."
              className="w-full relative bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[1.5rem] focus-within:border-green-500/50 transition-all duration-300"
              autoFocus
            />
          </div>

          {/* Quick Stats */}
          {query && (
            <div className="text-sm font-black uppercase tracking-[0.2em] italic text-slate-500">
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-green-500 border-t-transparent"></div>
                  Scanăm catalogul...
                </div>
              ) : (
                <span className="flex items-center gap-2">
                  <span className="text-green-500">{filteredAndSortedResults.length}</span> rezultate pentru <span className="text-white">&quot;{query}&quot;</span>
                  {category !== "toate" && (
                    <span className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-slate-800"></span>
                      în <span className="text-green-500">{CATEGORIES.find(c => c.key === category)?.label}</span>
                    </span>
                  )}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Filters & Controls */}
        <div className="glass-card p-6 lg:p-8 mb-10 border-white/5 bg-slate-900/40">
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 lg:gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setCategory(cat.key)}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 italic border ${
                    category === cat.key
                      ? "bg-green-600 text-white border-green-500 shadow-[0_0_20px_rgba(22,163,74,0.3)]"
                      : "bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 w-full lg:w-auto">
              {/* Sort */}
              <div className="relative flex-1 lg:flex-none">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full lg:w-auto appearance-none px-6 py-3 border border-white/5 rounded-xl bg-white/5 text-xs font-black uppercase tracking-widest text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none italic cursor-pointer pr-12"
                >
                  {SORT_OPTIONS.map(option => (
                    <option key={option.key} value={option.key} className="bg-slate-950 text-white">
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
              </div>

              {/* View Toggle */}
              <div className="flex border border-white/5 rounded-xl overflow-hidden bg-white/5 p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2.5 rounded-lg transition-all ${viewMode === "grid" ? "bg-green-600 text-white shadow-lg" : "text-slate-500 hover:text-white"}`}
                >
                  <Grid3X3 size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2.5 rounded-lg transition-all ${viewMode === "list" ? "bg-green-600 text-white shadow-lg" : "text-slate-500 hover:text-white"}`}
                >
                  <List size={18} />
                </button>
              </div>

              {/* Advanced Filters Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all italic ${
                  showFilters || hasActiveFilters
                    ? "bg-green-600/10 border-green-500/50 text-green-400"
                    : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                <SlidersHorizontal size={14} />
                Filtre
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 italic group-focus-within:text-green-500 transition-colors">
                  Preț minim (RON)
                </label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full px-5 py-3 border border-white/5 rounded-xl bg-white/5 text-sm text-white focus:ring-1 focus:ring-green-500 focus:border-transparent outline-none transition-all placeholder:text-slate-700 font-medium"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                />
              </div>
              <div className="group">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 italic group-focus-within:text-green-500 transition-colors">
                  Preț maxim (RON)
                </label>
                <input
                  type="number"
                  placeholder="1000"
                  className="w-full px-5 py-3 border border-white/5 rounded-xl bg-white/5 text-sm text-white focus:ring-1 focus:ring-green-500 focus:border-transparent outline-none transition-all placeholder:text-slate-700 font-medium"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                />
              </div>
              <div className="flex items-end">
                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    className="flex items-center gap-3 px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-red-500 hover:text-red-400 transition-colors italic group"
                  >
                    <X size={16} className="group-hover:rotate-90 transition-transform" />
                    Resetează filtrele
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {!query ? (
          <div className="text-center py-32 lg:py-48">
            <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto mb-10 border border-white/10 group">
              <Search className="text-slate-700 group-hover:text-green-500 transition-colors duration-500" size={48} />
            </div>
            <h3 className="text-3xl lg:text-5xl font-black text-white mb-6 tracking-tighter uppercase italic leading-none">
              Începe să <span className="text-green-500">cauți</span>
            </h3>
            <p className="text-slate-400 max-w-md mx-auto font-medium italic leading-relaxed">
              Caută după numele produsului, categorie sau cuvinte cheie pentru a găsi exact ce îți trebuie.
            </p>
          </div>
        ) : filteredAndSortedResults.length > 0 ? (
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-24"
            : "space-y-6 mb-24"
          }>
            {filteredAndSortedResults.map((result) => {
              // Transform result to match ProductCard expected props
              const productForCard = {
                id: result.id,
                slug: result.slug,
                title: result.title,
                description: result.description,
                images: result.images || [],
                priceBase: result.priceBase || 0,
                metadata: { category: result.category },
                tags: result.tags || []
              };

              return viewMode === "grid" ? (
                <ProductCard key={result.id} product={productForCard as any} />
              ) : (
                <ProductCardCompact key={result.id} product={productForCard as any} />
              );
            })}
          </div>
        ) : isLoading ? (
          <div className="text-center py-32 lg:py-48">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500 mx-auto mb-10 shadow-[0_0_20px_rgba(34,197,94,0.3)]"></div>
            <p className="text-slate-400 font-black uppercase tracking-[0.2em] italic">Analizăm rezultatele...</p>
          </div>
        ) : (
          <div className="text-center py-32 lg:py-48 bg-slate-900/20 rounded-[3rem] border border-white/5">
            <X className="mx-auto h-20 w-20 text-slate-800 mb-8" />
            <h3 className="text-3xl lg:text-5xl font-black text-white mb-6 uppercase tracking-tighter italic">
              Niciun rezultat <span className="text-red-500">găsit</span>
            </h3>
            <p className="text-slate-400 max-w-md mx-auto mb-12 font-medium italic px-4">
              Nu am găsit produse pentru &quot;{query}&quot;. 
              Încearcă să modifici termenul de căutare sau să folosești filtre diferite.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center px-4">
              <button
                onClick={handleClearFilters}
                className="btn-premium w-full sm:w-auto"
              >
                Resetează căutarea
              </button>
              <button
                onClick={() => router.push("/shop")}
                className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-[0.2em] italic text-xs hover:bg-white hover:text-slate-950 transition-all shadow-xl w-full sm:w-auto"
              >
                Vezi toate produsele
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-black py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Se încarcă căutarea...</p>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}