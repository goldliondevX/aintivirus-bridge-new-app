"use client";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "@/configs/wagmi-config";

import { Buffer } from "buffer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

globalThis.Buffer = Buffer;

const queryClient = new QueryClient();

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="light">
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </WagmiProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
