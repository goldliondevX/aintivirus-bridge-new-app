"use client";
import bs58 from "bs58";
import { fromBytes, pad, parseUnits } from "viem";

import { useAccount, useSwitchChain } from "wagmi";
import { EndpointId } from "@layerzerolabs/lz-definitions";
import BridgeConfig from "@/configs/bridge-config";
import { wagmiConfig } from "@/configs/wagmi-config";
import { useEthereum, useSolana } from "@/hooks";
import { Button, Progress } from "@heroui/react";
import Link from "next/link";
import {
    getEthereumExplorerTxLink,
    getLayerZeroScanLink,
    getSolanaExplorerTxLink,
} from "@/utils";

const { solana, ethereum } = BridgeConfig;

interface SendButtonProps {
    fromEid: string;
    toEid: string;
    amount: string;
}

function SendButton(props: SendButtonProps) {
    const { fromEid, toEid, amount } = props;

    const amountIn = parseUnits(amount ? amount.replace(/,/g, "") : "0", 6);

    const account = useAccount();
    const { chains: metamaskChains, switchChain } = useSwitchChain();
    const [metamaskChain] = metamaskChains;
    const shouldSwitchMetamaskChain =
        fromEid == ethereum.eid.toString() &&
        account!.isConnected &&
        !wagmiConfig.chains.find((c) => c.id === account!.chainId);

    const {
        address: ethereumAddress,
        hash: ethereumHash,
        isPending: isEthereumPending,
        sendToSolana,
        tokenBalance: ethMax,
    } = useEthereum();
    const {
        address: solanaAddress,
        hash: solanaHash,
        sendToEthereum,
        isPending: isSolanaPending,
        tokenBalance: solMax,
    } = useSolana();

    const isMetaMaskConnected = !!ethereumAddress;
    const isPhantomConnected = !!solanaAddress;

    let disabled = true;
    let label = "Loading...";

    if (!fromEid && !toEid) {
        label = "Select chains";
    } else if (!isMetaMaskConnected && !isPhantomConnected) {
        label = "Connect wallets";
    } else if (!isMetaMaskConnected) {
        label = "Connect MetaMask";
    } else if (!isPhantomConnected) {
        label = "Connect Phantom";
    } else if (amountIn == 0n) {
        label = "Enter an amount";
    } else if (
        fromEid == EndpointId.ETHEREUM_V2_MAINNET.toString() &&
        amountIn > ethMax
    ) {
        label = "Not enough tokens";
    } else if (
        fromEid == EndpointId.SOLANA_V2_MAINNET.toString() &&
        amountIn > solMax
    ) {
        label = "Not enough tokens";
    } else {
        disabled = false;
        label = "Send";
    }

    const submit = async () => {
        if (fromEid == solana.eid.toString() && toEid == ethereum.eid.toString()) {
            console.log("SOL to ETH")
            const to = ethereumAddress!;
            sendToEthereum(to, amountIn);
        } else if (
            fromEid == ethereum.eid.toString() &&
            toEid == solana.eid.toString()
        ) {
            console.log("ETH to SOL")
            const to = fromBytes(pad(bs58.decode(solanaAddress!)), "hex");
            sendToSolana(to, amountIn);
        } else {
            console.log("should never print this");
        }
    };

    return (
        <>
            <div>
                {shouldSwitchMetamaskChain ? (
                    <Button
                        color="primary"
                        key={metamaskChain.id}
                        onPress={() => switchChain({ chainId: metamaskChain.id })}
                        fullWidth
                    >
                        Switch Metamask to {metamaskChain.name}
                    </Button>
                ) : (
                    <Button
                        disabled={disabled}
                        onPress={submit}
                        type="submit"
                        color="primary"
                        key="send"
                        fullWidth
                    >
                        {label}
                    </Button>
                )}
                {(isSolanaPending || isEthereumPending) && (
                    <Progress isIndeterminate aria-label="Loading..." size="sm" />
                )}
            </div>
            {ethereumHash && (
                <>
                    <div>
                        <Link
                            href={getEthereumExplorerTxLink(ethereumHash)}
                            className="hover:underline"
                            rel="noopener"
                            target="_blank"
                        >
                            {getEthereumExplorerTxLink(ethereumHash)}
                        </Link>
                    </div>
                    <div>
                        <Link
                            href={getLayerZeroScanLink(ethereumHash)}
                            className="hover:underline"
                            rel="noopener"
                            target="_blank"
                        >
                            {getLayerZeroScanLink(ethereumHash)}
                        </Link>
                    </div>
                </>
            )}
            {solanaHash && (
                <>
                    <div>
                        <Link
                            href={getSolanaExplorerTxLink(solanaHash)}
                            className="hover:underline"
                            rel="noopener"
                            target="_blank"
                        >
                            {getSolanaExplorerTxLink(solanaHash)}
                        </Link>
                    </div>
                    <div>
                        <Link
                            href={getLayerZeroScanLink(solanaHash)}
                            className="hover:underline"
                            rel="noopener"
                            target="_blank"
                        >
                            {getLayerZeroScanLink(solanaHash)}
                        </Link>
                    </div>
                </>
            )}
        </>
    );
}

export default SendButton;
