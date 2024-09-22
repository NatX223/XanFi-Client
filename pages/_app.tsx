import { useEffect, useState } from "react";
import { ConnectKitProvider } from "@particle-network/connectkit";
import type { AppProps } from "next/app";
import "../utils/fontawesome";
import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
  darkTheme, lightTheme
} from '@rainbow-me/rainbowkit';
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import { useDarkMode } from "usehooks-ts";
import { WagmiProvider } from 'wagmi';
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import "~~/styles/globals.css";
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { config } from "../utils/connection/connectKitConfig";

const queryClient = new QueryClient();

const DinamikoApp = ({ Component, pageProps }: AppProps) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    setIsDarkTheme(isDarkMode);
  }, [isDarkMode]);

  return (
    <ConnectKitProvider config={config}>
      <NextNProgress />
                  <div className="flex flex-col min-h-screen bg-primary">
          <Header />
          <main className="relative flex flex-col flex-1">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
        <Toaster />
    </ConnectKitProvider>
  );
};

export default DinamikoApp;