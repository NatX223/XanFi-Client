import { useEffect, useState } from "react";
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
import { config } from "../utils/connection/wagmiConfig";
import { OktoProvider, BuildType } from 'okto-sdk-react';
import { GoogleOAuthProvider } from '@react-oauth/google';

const queryClient = new QueryClient();

const DinamikoApp = ({ Component, pageProps }: AppProps) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    setIsDarkTheme(isDarkMode);
  }, [isDarkMode]);

  return (
    <WagmiProvider config={config}>
      <NextNProgress />
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
        avatar={BlockieAvatar}
        theme={isDarkTheme ? darkTheme() : lightTheme()}>
          <GoogleOAuthProvider clientId = {process.env.GOOGLE_CLIENT_ID || ""}>
          <OktoProvider apiKey={process.env.OKTO_CLIENT_API || ""} buildType={BuildType.SANDBOX}>
                  <div className="flex flex-col min-h-screen bg-primary">
          <Header />
          <main className="relative flex flex-col flex-1">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
        <Toaster />
        </OktoProvider>
        </GoogleOAuthProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default DinamikoApp;