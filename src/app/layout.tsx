import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Page Builder Pro - Drag & Drop Website Builder",
  description: "Professional drag and drop website builder with header, footer, and template management. Build beautiful websites without coding.",
  keywords: ["Page Builder", "Drag and Drop", "Website Builder", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
  authors: [{ name: "Page Builder Team" }],
  openGraph: {
    title: "Page Builder Pro",
    description: "Professional drag and drop website builder",
    url: "https://localhost:3000",
    siteName: "Page Builder Pro",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Page Builder Pro",
    description: "Professional drag and drop website builder",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
