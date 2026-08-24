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
  title: "Markdown Editor | Bookchaowalit",
  description: "Split-pane Markdown editor with a lightweight live preview.",
  keywords: ["markdown","editor","preview","md"],
  authors: [{ name: "Bookchaowalit", url: "https://bookchaowalit.com" }],
  creator: "Bookchaowalit",
  publisher: "Bookchaowalit",
  metadataBase: new URL("https://bookchaowalit.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Markdown Editor | Bookchaowalit",
    description: "Split-pane Markdown editor with a lightweight live preview.",
    siteName: "Bookchaowalit",
  },
  twitter: {
    card: "summary_large_image",
    title: "Markdown Editor | Bookchaowalit",
    description: "Split-pane Markdown editor with a lightweight live preview.",
    creator: "@bookchaowalit",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* THESIS: make the source/result loop feel like a physical proofing bench.
OWN-WORLD: warm paper, ink green, registration red, and blue editorial marks split one draft into two plates.
STORY: type a source, watch its proof change, then copy the draft when the shape reads correctly.
FIRST VIEWPORT: the thesis, local boundary, source/proof controls, and first live content appear before any footer.
FORM: ruled paper panels, plate labels, and editorial type define every control and state.
SEED: 4922a2b3 · assigned direction 7 · operate mode.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance */}
        {children}
      </body>
    </html>
  );
}
