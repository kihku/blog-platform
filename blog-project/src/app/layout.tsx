import type { Metadata } from "next";
import Header from "@/components/header";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Open_Sans } from "next/font/google";

import "./globals.css";
import { CookiesProvider } from "next-client-cookies/server";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Language Buddy",
  description: "Language learning platform for everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={openSans.className} data-theme="light" lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
          integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>

      <body className={`antialiased`}>
        <CookiesProvider>
          <AntdRegistry>
            <Header />
            {children}
          </AntdRegistry>
        </CookiesProvider>
      </body>
    </html>
  );
}
