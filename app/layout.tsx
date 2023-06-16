import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="!scroll-smooth">
      <body
        className={[inter.className, "text-gray-900 antialiased"].join(" ")}
      >
        {children}
      </body>
    </html>
  );
}
