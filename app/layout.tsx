import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { UserButton } from "@neondatabase/auth/react";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Event Planner",
  description: "Event Planner Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>
          <header className="border-b border-border bg-surface/90 backdrop-blur">
            <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
              <Link href="/" className="text-sm font-semibold tracking-wide">
                Event Planner
              </Link>

              <nav className="flex items-center gap-4">
                <Link href="/events" className="text-sm text-muted-foreground">
                  Events
                </Link>

                <Link href="/dashboard" className="text-sm text-muted-foreground">
                  Dashboard
                </Link>

                <UserButton size="icon" />
              </nav>
            </div>
          </header>

          <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}