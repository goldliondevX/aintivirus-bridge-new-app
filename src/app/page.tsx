"use client";
import BridgeConfig from "@/configs/bridge-config";
import SendButton from "@/elements/send-button";
import { usePhantomWallet } from "@/hooks";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import { useDisconnect } from "wagmi";
import { useAccount, useConnect } from "wagmi";

export default function Home() {
  const account = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [connector] = connectors;
  const { publicKey, handleDisconnect, handleConnect } = usePhantomWallet();

  const { solana, ethereum } = BridgeConfig;
  const solanaAddress = !!publicKey ? publicKey.toBase58() : undefined;
  const ethereumAddress = !!account ? account.address : undefined;

  const [fromEid, setFromEid] = useState(solana.eid.toString());
  const [toEid, setToEid] = useState(ethereum.eid.toString());
  const [amount, setAmount] = useState("");

  const chains = [
    { ...ethereum, address: ethereumAddress, key: ethereum.eid },
    { ...solana, address: solanaAddress, key: solana.eid },
  ];

  const eids = chains.map(({ eid }) => eid.toString());

  const handleFromEidChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFromEid = event.target.value as string;
    setFromEid(newFromEid);
    const another = newFromEid == eids[0] ? eids[1] : eids[0];
    setToEid(another);
  };

  const handleToEidChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newToEid = event.target.value as string;
    setToEid(newToEid);
    const another = newToEid == eids[0] ? eids[1] : eids[0];
    setFromEid(another);
  };

  return (
    <section className="flex w-full flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="flex flex-col w-full max-w-lg justify-center text-center gap-4">
        <Card className="flex w-full px-2 py-4">
          <CardHeader className="flex items-center justify-center">
            <h1 className="text-xl">Aintivirus Bridge</h1>
          </CardHeader>
          <CardBody className="h-full ">
            <div className="flex flex-col gap-4">
              <Select
                label="From"
                onChange={handleFromEidChange}
                selectedKeys={[fromEid]}
              >
                {chains.map((chain) => (
                  <SelectItem key={chain.key}>{chain.name}</SelectItem>
                ))}
              </Select>
              <Select
                label="To"
                onChange={handleToEidChange}
                selectedKeys={[toEid]}
              >
                {chains.map((chain) => (
                  <SelectItem key={chain.key}>{chain.name}</SelectItem>
                ))}
              </Select>
              <NumericFormat
                customInput={Input}
                id="amount"
                name="amount"
                label="Amount"
                onChange={(e) => setAmount(e.target.value)}
                allowNegative={false}
                thousandSeparator
                decimalScale={6}
              />
              <div className="flex gap-4">
                {!account.isConnected && (
                  <Button
                    key={connector.uid}
                    color="primary"
                    onPress={() => connect({ connector })}
                    className="w-full"
                  >
                    Connect to MetaMask
                  </Button>
                )}
                {account.isConnected && (
                  <Button
                    className="w-full"
                    color="default"
                    onPress={() => disconnect()}
                  >
                    Disconnect MetaMask
                  </Button>
                )}
                {!publicKey && (
                  <Button
                    color="primary"
                    key={"sol-connect"}
                    onPress={handleConnect}
                    className="w-full"
                  >
                    Connect to Phantom
                  </Button>
                )}
                {publicKey && (
                  <Button
                    color="default"
                    key={"sol-disconnect"}
                    onPress={handleDisconnect}
                    className="w-full"
                  >
                    Disconnect Phantom
                  </Button>
                )}
              </div>
              <SendButton amount={amount} fromEid={fromEid} toEid={toEid} />
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
