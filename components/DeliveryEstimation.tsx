"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce"; // Local hook
import { Truck } from "lucide-react";

type Props = {
    county?: string;
};

export default function DeliveryEstimation({ county }: Props) {
    const [loading, setLoading] = useState(true);
    const [label, setLabel] = useState("");
    const [debouncedCounty] = useDebounce(county, 500);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        // Apelăm API-ul de estimare (presupunând că există ruta /api/eta)
        fetch(`/api/eta?county=${debouncedCounty || ""}`, { signal })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok && data.label) {
                    setLabel(data.label);
                } else {
                    // Fallback dacă nu primim un răspuns clar
                    setLabel("2-3 zile lucrătoare");
                }
                setLoading(false);
            })
            .catch((err) => {
                if (err.name !== "AbortError") {
                    // În caz de eroare, afișăm un termen standard
                    setLabel("2-4 zile lucrătoare");
                }
                setLoading(false);
            });

        return () => {
            controller.abort();
        };
    }, [debouncedCounty]);

    return (
        <div className="text-[11px] sm:text-xs flex items-center gap-1.5 bg-gradient-to-r from-amber-50/50 to-teal-50/50 border border-amber-100 rounded-xl px-3 py-2 shadow-sm whitespace-nowrap">
            <Truck className="w-4 h-4 text-amber-600 shrink-0" strokeWidth={2.5} />
            <span className="text-slate-500 font-bold">Livrare estimată:</span>
            {loading ? (
                <span className="animate-pulse bg-slate-200 h-3 w-16 rounded"></span>
            ) : (
                <span className="font-extrabold text-amber-700">{label}</span>
            )}
        </div>
    );
}
