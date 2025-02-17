import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";

import "./globals.css";
import "react-tooltip/dist/react-tooltip.css";

import AppQueryProvider from "@/utils/query-provider";
import ReduxProvider from "@/store/redux-provider";

const montserrat = Montserrat({
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quays",
  description: "Quays",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <NextTopLoader showSpinner={false} color="#000034" />
        <Toaster
          containerStyle={{
            zIndex: 99999,
          }}
          toastOptions={{
            style: {
              zIndex: 99999,
              fontSize: "14px",
            },
            duration: 4000,
          }}
        />
        <AppQueryProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </AppQueryProvider>
      </body>
    </html>
  );
}
