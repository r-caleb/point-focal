import localFont from "next/font/local";
import "./globals.css";
import Head from "next/head";
import ReduxProvider from "@/redux/provider";

export const cooper = localFont({
  src: [
    {
      path: "../public/fonts/CooperHewitt-Book.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/CooperHewitt-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/CooperHewitt-Semibold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/CooperHewitt-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/CooperHewitt-LightItalic.woff",
      weight: "300",
      style: "italic",
    },
  ],
  fallback: ["system-ui", "arial"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta charset="utf-8" />
        <link rel="icon" href="/images/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Le Ministère du Numérique de la RDC, parce qu'on ne peut aller loin sans vision et que la vision seule ne suffit pas, il faut l'action"
        />
        <meta name="theme-color" content="#fff" />
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
          integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
          crossOrigin="anonymous"
        />
      </Head>
      <body className={`${cooper.className} antialiased`}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
