import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "../../styles/globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Kittaby - Arabic Alphabet for Kids",
  description: "A magical journey to learn the Arabic alphabet.",
  // Add the icons configuration here
  icons: {
    icon: "/kittaby.png",
    shortcut: "/kittaby.png",
    apple: "/kittaby.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} antialiased bg-kid-bg text-foreground font-sans`}>
        {children}
      </body>
    </html>
  );
}