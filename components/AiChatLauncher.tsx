"use client";
import { Bot } from "lucide-react";
export default function AiChatLauncher({ className = "", iconOnly = false }: { className?: string; iconOnly?: boolean }) {
  return <button type="button" onClick={() => window.dispatchEvent(new Event("shopprint:open-chat"))} className={className} aria-label="Deschide chatul AI Homeprint" title="Chat AI Homeprint"><Bot size={iconOnly ? 26 : 18} />{!iconOnly && <span>Chat AI</span>}</button>;
}
