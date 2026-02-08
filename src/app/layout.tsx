import type { Metadata } from "next";
import { Inter, Share_Tech, Cinzel } from "next/font/google"; // 1. Import Share_Tech and Cinzel
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// 2. Configure Share Tech font
const shareTech = Share_Tech({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-share-tech" // We will use this variable in Tailwind
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel"
});

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Creative Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* 3. Add shareTech.variable to the body class list */}
      <body className={`${inter.className} ${shareTech.variable} ${cinzel.variable} bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}