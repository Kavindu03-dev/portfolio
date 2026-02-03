import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google"; // 1. Import Anton
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// 2. Configure Anton font
const anton = Anton({ 
  subsets: ["latin"], 
  weight: "400",
  variable: "--font-anton" // We will use this variable in Tailwind
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
      {/* 3. Add anton.variable to the body class list */}
      <body className={`${inter.className} ${anton.variable} bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}