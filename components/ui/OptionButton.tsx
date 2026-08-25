"use client";
import React from "react";

interface OptionButtonProps {
  active: boolean;
  onClick: () => void;
  title: string;
  subtitle?: string;
  premium?: boolean;
}

export const OptionButton = ({ active, onClick, title, subtitle }: OptionButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full text-left p-3 rounded-lg border-2 transition-all text-sm ${
      active
        ? "border-amber-600 bg-amber-50 dark:bg-amber-900/40 dark:border-amber-500"
        : "border-gray-300 bg-white dark:bg-slate-800 dark:border-slate-700 hover:border-gray-400 dark:hover:border-slate-500"
    }`}
  >
    <div className="font-bold text-gray-800 dark:text-gray-100">{title}</div>
    {subtitle && (
      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
        {subtitle}
      </div>
    )}
  </button>
);
