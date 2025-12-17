import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "John Kaller - Home",
  description: "Full-stack product builder with 6 years of experience building early-stage companies.",
  metadataBase: new URL('https://ownerofjk.com/'),
  openGraph: {
    title: "John Kaller - Home",
    description: "Full-stack product builder with 6 years of experience building early-stage companies.",
    url: 'https://ownerofjk.com/',
    siteName: "homeofjk",
    images: [
      {
        url: '/strawhat.jpeg',
        width: 800,
        height: 600,
        alt: 'John Kaller Home',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: "homeofjk",
    description: "Full-stack product builder with 6 years of experience building early-stage companies.",
    images: ['/strawhat.jpeg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
