import type { Metadata } from "next";

// Coșul e personal și gol pentru roboți: nu se indexează (la fel ca /checkout).
export const metadata: Metadata = {
    robots: { index: false, follow: true },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
    return children;
}
