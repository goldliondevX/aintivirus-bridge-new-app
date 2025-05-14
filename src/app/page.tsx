"use client";
import {
  Button,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { useState } from "react";
import { NumericFormat } from "react-number-format";

export default function Home() {
  const [amount, setAmount] = useState("");
  console.log("amount", amount);

  return (
    <section className="flex w-full flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="flex flex-col w-full max-w-lg justify-center text-center gap-4">
        <div className="flex gap-4">
          <Button color="primary">Connect to MetaMask</Button>
          <Button color="primary">Connect to Phantom</Button>
        </div>
        <Card className="flex w-full">
          <CardBody className="h-full">
            <div className="flex flex-col gap-4">
              <Select label="From">
                <SelectItem>Ethereum</SelectItem>
                <SelectItem>Solana</SelectItem>
              </Select>
              <Select label="To">
                <SelectItem>Ethereum</SelectItem>
                <SelectItem>Solana</SelectItem>
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
            </div>
          </CardBody>
        </Card>
        <Button fullWidth color="primary">
          Connect Wallet
        </Button>
      </div>
    </section>
  );
}
