// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NouaTaCasa - Găsește locuința visurilor tale",
  description: "Cea mai modernă platformă de imobiliare din România.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body className={`${inter.className} bg-gray-50 min-h-screen flex flex-col`}>
        {/* Navbar-ul va rămâne fix pe toate paginile */}
        <Navbar />
        
        {/* Conținutul principal al fiecărei pagini */}
        <main className="flex-grow">
          {children}
        </main>
        
        {/* Opțional: Aici poți adăuga un <Footer /> mai târziu */}
      </body>
    </html>
  );
}