import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "CUTSTAR | AI Music Edit Engine",
  description:
    "Cutstar turns songs and footage into beat-synced, viral-optimized short-form edits within a day.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
