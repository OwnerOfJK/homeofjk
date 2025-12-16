import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "John Kaller - Portfolio",
  description: "Building software & exploring ideas",
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
