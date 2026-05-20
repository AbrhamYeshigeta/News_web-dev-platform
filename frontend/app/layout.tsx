import type { Metadata } from "next";
import { Noto_Sans_Ethiopic, Outfit } from "next/font/google";
import "./globals.css";

const notoSansEthiopic = Noto_Sans_Ethiopic({
  variable: "--font-noto-ethiopic",
  subsets: ["ethiopic"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "NEWSFLOW - የሀገር ውስጥ እና የአለም አቀፍ ዜናዎች",
  description: "NEWSFLOW - ፈጣን፣ ትክክለኛ እና ተዓማኒ የዜና ምንጭ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="am"
      className={`${notoSansEthiopic.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#FAFBFD] text-slate-900">{children}</body>
    </html>
  );
}

