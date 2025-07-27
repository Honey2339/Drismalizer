import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.drismalizer.xyz"),
  title: "Drismalizer — Drizzle ORM Visualizer",
  description:
    "Paste your Drizzle ORM schema and get a visual representation instantly. Built for devs who hate tables but love diagrams.",
  keywords: [
    "Drizzle ORM",
    "ORM visualizer",
    "Drismalizer",
    "ts-morph",
    "Next.js",
    "drizzle schemas",
  ],
  authors: [{ name: "Honey", url: "https://www.drismalizer.xyz" }],
  openGraph: {
    title: "Drismalizer",
    description: "Drizzle ORM to diagram tool.",
    url: "https://www.drismalizer.xyz",
    siteName: "Drismalizer",
    images: [
      {
        url: "/drismaBanner.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Drismalizer — Drizzle ORM Visualizer",
    description: "Drizzle ORM to diagram tool.",
    images: ["/drismaBanner.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
