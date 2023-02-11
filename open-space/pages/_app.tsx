import MainLayout from "@/components/Layouts/MainLayout/MainLayout";
import "@/styles/globals.css";
import "@/styles/normalise.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}
