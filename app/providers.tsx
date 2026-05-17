"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { NeonAuthUIProvider } from "@neondatabase/auth/react";
import { authClient } from "@/lib/auth/client";

export function Providers({ children }: { children: ReactNode }) {
    const router = useRouter();

    return (
        <NeonAuthUIProvider
            authClient={authClient as any}
            navigate={router.push}
            replace={router.replace}
            onSessionChange={() => router.refresh()}
            redirectTo="/dashboard"
            Link={Link}
            defaultTheme="dark"
        >
            {children}
        </NeonAuthUIProvider>
    );
}