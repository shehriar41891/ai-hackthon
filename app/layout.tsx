import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Ecosona Hackathon",
  description: "Progressive prompt engineering and prompt injection challenges",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
