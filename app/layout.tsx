"use client";

import "./globals.css";
import Navigation from "@/components/navbar";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showNavbar =
    !pathname.startsWith("/admin") && !pathname.startsWith("/tenant");

  return (
    <html lang="en" suppressHydrationWarning className={"bg-stone-900"}>
      <body className="antialiased">
        {showNavbar && <Navigation />}
        {children}
      </body>
    </html>
  );
}
