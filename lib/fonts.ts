import localFont from "next/font/local";

/** Dubai — used sitewide via `--font-dubai` on `<html>` and optional `.font-dubai` / `fontDubai.className` */
export const fontDubai = localFont({
  src: [
    { path: "../public/font/Dubai-Light.ttf", weight: "300", style: "normal" },
    { path: "../public/font/Dubai-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/font/Dubai-Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/font/Dubai-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-dubai",
  display: "swap",
});
