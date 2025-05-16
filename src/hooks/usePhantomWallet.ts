import {
    getPhantomProvider,
    PhantomProvider,
} from "@/utils/getPhantomProvider";
import { PublicKey } from "@solana/web3.js";
import { useState, useEffect, useCallback } from "react";

interface Props {
    publicKey: PublicKey | null;
    isConnected: boolean;
    handleDisconnect: () => Promise<void>;
    handleConnect: () => Promise<void>;
    provider: PhantomProvider | undefined;
}

export const usePhantomWallet = (): Props => {
    const [provider, setProvider] = useState<PhantomProvider>();
    const [publicKey, setPublicKey] = useState(provider?.publicKey || null);

    useEffect(() => {
        const provider = getPhantomProvider();
        setProvider(provider);
        setPublicKey(provider?.publicKey || null);
    }, []);

    useEffect(() => {
        if (!provider) return;

        // attempt to eagerly connect
        provider
            .connect({ onlyIfTrusted: true })
            .then(({ publicKey }) => {
                setPublicKey(publicKey);
            })
            .catch(() => {
                // fail silently
            });

        provider.on("connect", (publicKey: PublicKey) => {
            setPublicKey(publicKey);
        });

        provider.on("disconnect", () => {
            setPublicKey(null);
        });

        provider.on("accountChanged", (publicKey: PublicKey | null) => {
            if (publicKey) {
                setPublicKey(publicKey);
            } else {
                provider.connect().catch((error) => {
                    console.log(error);
                });
            }
        });

        return () => {
            provider.disconnect();
        };
    }, [provider]);

    /** Connect */
    const handleConnect = useCallback(async () => {
        if (!provider) return;

        try {
            await provider.connect();
        } catch (error) {
            console.log(error);
        }
    }, [provider]);

    /** Disconnect */
    const handleDisconnect = useCallback(async () => {
        if (!provider) return;

        try {
            await provider.disconnect();
        } catch (error) {
            console.log(error);
        }
    }, [provider]);

    return {
        publicKey,
        isConnected: !!publicKey,
        handleDisconnect,
        handleConnect,
        provider,
    };
};
