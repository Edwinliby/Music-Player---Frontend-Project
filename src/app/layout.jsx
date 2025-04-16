import { Analytics } from "@vercel/analytics/react"
import localFont from "next/font/local";
import "./globals.css";

const neueMontreal = localFont({
  src: [
    {
      path: "./fonts/NeueMontreal-Bold.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/NeueMontreal-Medium.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/NeueMontreal-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-neue-montreal",
});

export const metadata = {
  title: "Wave Player",
  description: "Stream your favorite songs, discover new artists, and vibe nonstop — all in one place.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Wave Player" />
      </head>
      <body
        className={`${neueMontreal.variable} antialiased`}
      >
        <Analytics />
        {children}
      </body>
    </html>
  );
}