import { http, createConfig } from "wagmi";
import BridgeConfig from "./bridge-config";
import { metaMask } from "wagmi/connectors";

const { wagmiChain: chain } = BridgeConfig.ethereum;

export const wagmiConfig = createConfig({
  chains: [chain],
  connectors: [metaMask()],
  transports: {
    [chain.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
