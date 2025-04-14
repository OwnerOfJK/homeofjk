import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ownerofjk",
  description: "build build build",
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
