import { SafeAny } from "@/types/common";
import {
  PublicKey,
  Transaction,
  VersionedTransaction,
  SendOptions,
} from "@solana/web3.js";

type PhantomEvent = "connect" | "disconnect" | "accountChanged";

type PhantomRequestMethod =
  | "connect"
  | "disconnect"
  | "signAndSendTransaction"
  | "signAndSendTransactionV0"
  | "signAndSendTransactionV0WithLookupTable"
  | "signTransaction"
  | "signAllTransactions"
  | "signMessage";

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

type DisplayEncoding = "utf8" | "hex";

export interface PhantomProvider {
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  signAndSendTransaction: (
    transaction: Transaction | VersionedTransaction,
    opts?: SendOptions
  ) => Promise<{ signature: string; publicKey: PublicKey }>;
  signTransaction: (
    transaction: Transaction | VersionedTransaction
  ) => Promise<Transaction | VersionedTransaction>;
  signAllTransactions: (
    transactions: (Transaction | VersionedTransaction)[]
  ) => Promise<(Transaction | VersionedTransaction)[]>;
  signMessage: (
    message: Uint8Array | string,
    display?: DisplayEncoding
  ) => Promise<SafeAny>;
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, handler: (args: SafeAny) => void) => void;
  request: (method: PhantomRequestMethod, params: SafeAny) => Promise<unknown>;
}

/**
 * Retrieves the Phantom Provider from the window object
 * @returns {PhantomProvider | undefined} a Phantom provider if one exists in the window
 */
export const getPhantomProvider = (): PhantomProvider | undefined => {
  if ("phantom" in window) {
    const provider = (
      window as typeof window & {
        phantom?: { solana?: PhantomProvider & { isPhantom?: boolean } };
      }
    ).phantom?.solana;

    if (provider?.isPhantom) {
      return provider;
    }
  }

  window.open("https://phantom.app/", "_blank");
};
