import { NextResponse } from "next/server";
import { quickPrintQuote } from "@/lib/quickPrintQuote";
import type { QuickPrintSelection } from "@/lib/quickPrintProducts";

export async function POST(request: Request) {
  try {
    const value = await request.json() as QuickPrintSelection | null;
    if (!value || typeof value !== "object") return NextResponse.json({error: "Configurație invalidă."}, {status: 400});
    const quote = quickPrintQuote(value);
    return NextResponse.json(quote, {status: "error" in quote ? 400 : 200});
  } catch {
    return NextResponse.json({error: "Nu am putut calcula prețul. Încearcă din nou."}, {status: 400});
  }
}
