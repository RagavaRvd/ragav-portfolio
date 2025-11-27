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
  title: "Ragavendiran G | Full-Stack Engineer & Technical Lead",
  description:
    "Full-stack engineering lead with 8.5+ years of experience in MERN/MEAN, Node.js, React, AWS, microservices, and scalable SaaS architecture. Explore my projects, tech stack, achievements, and AI-powered interactive portfolio.",
  keywords: [
    "Ragavendiran",
    "Ragav",
    "Full Stack Developer",
    "Technical Lead",
    "Node.js Developer",
    "React Developer",
    "Next.js Portfolio",
    "AWS Engineer",
    "MERN Developer",
    "MEAN Developer",
    "Software Engineer Portfolio",
    "Full Stack Engineer",
    "Microservices",
    "SaaS Architect",
  ],
  authors: [{ name: "Ragavendiran G", url: "https://ragavarvd.github.io/ragav-portfolio" }],
  openGraph: {
    title: "Ragavendiran G | Full-Stack Engineer & Technical Lead",
    description:
      "Explore my full-stack engineering journey, projects, cloud expertise, and AI-powered interactive portfolio.",
    url: "https://ragavarvd.github.io/ragav-portfolio",
    siteName: "Ragavendiran Portfolio",
    type: "website",
    images: [
      {
        url: "https://ragavarvd.github.io/ragav-portfolio/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ragavendiran Portfolio Preview",
      },
    ],
  },
  metadataBase: new URL("https://ragavarvd.github.io"),
  robots: "index, follow",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
