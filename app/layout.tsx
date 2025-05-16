import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Provider } from "./provider";

export const metadata: Metadata = {
  title: "던파 봉인된 자물쇠 확률 계산기, 통계 시뮬레이터 던락",
  description: "봉인된 자물쇠의 확률을 여러가지 통계 기법을 통해 알아보세요!",
  openGraph: {
    url: process.env.NEXT_SERVICE_URL ?? "",
    title: "던파 봉인된 자물쇠 확률 계산기, 통계 시뮬레이터 던락",
    type: "website",
    description: "봉인된 자물쇠의 확률을 여러가지 통계 기법을 통해 알아보세요!",
    images: [
      {
        url: process.env.NEXT_SERVICE_URL ?? "",
        width: 800,
        height: 600,
        alt: "Og Image Alt",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Provider>{children}</Provider>
        <Analytics />
      </body>
    </html>
  );
}
