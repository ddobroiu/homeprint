"use client";

import { signOut } from "next-auth/react";

type SignOutButtonProps = {
    className?: string;
    label?: string;
};

export default function SignOutButton({
    className = "rounded-md px-4 py-2 bg-amber-600 text-white font-semibold hover:bg-amber-500",
    label = "Delogare",
}: SignOutButtonProps) {
    return (
        <button onClick={() => signOut({ callbackUrl: "/" })} className={className}>
            {label}
        </button>
    );
}

