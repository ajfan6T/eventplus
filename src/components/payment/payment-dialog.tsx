"use client";

import * as React from "react";
import {
  Smartphone,
  CreditCard,
  Landmark,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { formatINR } from "@/lib/utils";

type Method = "upi" | "card" | "netbanking";
type Phase = "form" | "processing" | "done";

const methodLabel: Record<Method, string> = {
  upi: "UPI",
  card: "Card",
  netbanking: "Net Banking",
};

const banks = ["State Bank of India", "Federal Bank", "HDFC Bank", "ICICI Bank", "South Indian Bank"];

/**
 * A self-contained, Razorpay-style MOCK checkout. No real gateway — it simulates
 * processing and returns a fake transaction id. Calls `onPaid` on success.
 */
export function PaymentDialog({
  amount,
  title,
  payee = "Eventplus",
  triggerLabel = "Pay now",
  triggerVariant = "gold",
  triggerSize = "sm",
  triggerClassName,
  onPaid,
}: {
  amount: number;
  title: string;
  payee?: string;
  triggerLabel?: string;
  triggerVariant?: ButtonProps["variant"];
  triggerSize?: ButtonProps["size"];
  triggerClassName?: string;
  onPaid?: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [method, setMethod] = React.useState<Method>("upi");
  const [phase, setPhase] = React.useState<Phase>("form");
  const [txnId, setTxnId] = React.useState("");
  const [succeeded, setSucceeded] = React.useState(false);

  function reset() {
    setPhase("form");
    setMethod("upi");
    setTxnId("");
  }

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) window.setTimeout(reset, 200);
  }

  function pay(e: React.FormEvent) {
    e.preventDefault();
    if (phase !== "form") return;
    setPhase("processing");
    // Simulated gateway round-trip.
    window.setTimeout(() => {
      setTxnId("pay_" + Math.random().toString(36).slice(2, 16).toUpperCase());
      setPhase("done");
      setSucceeded(true);
      onPaid?.();
    }, 1600);
  }

  // Once paid and the dialog is closed, the trigger becomes a "Paid" chip.
  if (succeeded && !open) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-semibold text-green-700">
        <ShieldCheck className="size-3" /> Paid
      </span>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant={triggerVariant} size={triggerSize} className={triggerClassName}>
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        {phase === "done" ? (
          <div className="flex flex-col items-center gap-4 py-4 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-green-100 text-green-700">
              <CheckCircle2 className="size-8" />
            </span>
            <DialogTitle className="font-serif text-2xl">Payment successful</DialogTitle>
            <DialogDescription className="text-base">
              {formatINR(amount)} paid to {payee} via {methodLabel[method]}.
            </DialogDescription>
            <div className="w-full rounded-2xl bg-cream-100 p-4 text-left text-sm">
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">For</span>
                <span className="max-w-[60%] truncate font-medium text-ink">{title}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-semibold text-maroon-700">{formatINR(amount)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Transaction ID</span>
                <span className="font-mono text-xs text-ink">{txnId}</span>
              </div>
            </div>
            <DialogClose asChild>
              <Button variant="outline" className="mt-1 w-full">
                Done
              </Button>
            </DialogClose>
            <p className="text-xs text-muted-foreground">A receipt has been sent to your email.</p>
          </div>
        ) : (
          <form onSubmit={pay}>
            <DialogHeader>
              <div className="flex items-center justify-between gap-3">
                <DialogTitle className="font-serif text-xl">Complete payment</DialogTitle>
                <Badge variant="muted" className="gap-1">
                  <Lock className="size-3" /> Demo
                </Badge>
              </div>
              <DialogDescription>
                Paying <span className="font-semibold text-ink">{formatINR(amount)}</span> to {payee}
                {" "}for <span className="text-ink">{title}</span>.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-5">
              <Tabs value={method} onValueChange={(v) => setMethod(v as Method)}>
                <TabsList className="grid h-auto w-full grid-cols-3 gap-1">
                  <TabsTrigger value="upi" className="flex-col gap-1 py-2 text-xs">
                    <Smartphone className="size-4" /> UPI
                  </TabsTrigger>
                  <TabsTrigger value="card" className="flex-col gap-1 py-2 text-xs">
                    <CreditCard className="size-4" /> Card
                  </TabsTrigger>
                  <TabsTrigger value="netbanking" className="flex-col gap-1 py-2 text-xs">
                    <Landmark className="size-4" /> Bank
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="upi" className="mt-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="pay-upi">UPI ID</Label>
                    <Input id="pay-upi" placeholder="yourname@okhdfcbank" defaultValue="anjali@okaxis" />
                  </div>
                </TabsContent>

                <TabsContent value="card" className="mt-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="pay-card">Card number</Label>
                      <Input id="pay-card" inputMode="numeric" placeholder="4111 1111 1111 1111" defaultValue="4111 1111 1111 1111" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="pay-exp">Expiry</Label>
                        <Input id="pay-exp" placeholder="MM/YY" defaultValue="09/28" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="pay-cvv">CVV</Label>
                        <Input id="pay-cvv" type="password" placeholder="123" defaultValue="123" />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="netbanking" className="mt-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="pay-bank">Select bank</Label>
                    <select
                      id="pay-bank"
                      className="flex h-11 w-full rounded-xl border border-input bg-cream-50 px-4 text-sm text-ink shadow-sm focus-visible:border-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                      defaultValue={banks[1]}
                    >
                      {banks.map((b) => (
                        <option key={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <Button type="submit" variant="gold" size="lg" className="mt-6 w-full" disabled={phase === "processing"}>
              {phase === "processing" ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Processing…
                </>
              ) : (
                <>Pay {formatINR(amount)}</>
              )}
            </Button>

            <p className="mt-3 inline-flex w-full items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="size-3.5 text-green-600" /> Demo checkout — no real payment is taken.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
