import Toaster from "@/components/Common/Toaster/Toaster";
import MainLayout from "@/components/Layouts/MainLayout/MainLayout";
import { GlobalContextProvider } from "@/contexts/GlobalAppContext";
import { PostContextProvider } from "@/contexts/PostContext";
import "@/styles/globals.css";
import "@/styles/normalise.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalContextProvider>
      <PostContextProvider>
        <MainLayout>
          <Component {...pageProps} />
          <Toaster />
        </MainLayout>
      </PostContextProvider>
    </GlobalContextProvider>
  );
}
