import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./markdown.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Умный поиск по базе Земелах",
  description: "Умный поиск",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <script src="https://cdn.amplitude.com/script/b5dfe188b09294626d09495d89f35653.js"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.amplitude.add(window.sessionReplay.plugin({sampleRate: 1}));
            window.amplitude.init('b5dfe188b09294626d09495d89f35653', {"fetchRemoteConfig":true,"autocapture":true});
          `
        }} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
