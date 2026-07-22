"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import type { AccessKeyRecord } from "@/types/key";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const maskedKey = (key: string) => `${key.slice(0, 6)}••••••••${key.slice(-4)}`;

const ViewKeyModal = ({ accessKey, children }: { accessKey: AccessKeyRecord; children: React.ReactNode }) => {
    const [copied, setCopied] = useState(false);
    const copy = async () => {
        await navigator.clipboard.writeText(accessKey.key);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="bg-white text-zinc-950 sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Access key</DialogTitle>
                    <DialogDescription>Created {new Date(accessKey.createdAt).toLocaleString()}</DialogDescription>
                </DialogHeader>
                <div className="rounded-xl border bg-zinc-50 p-4">
                    <div className="flex items-center gap-3">
                        <code className="min-w-0 flex-1 break-all text-sm">{maskedKey(accessKey.key)}</code>
                        <Button variant="outline" size="icon" onClick={copy} aria-label="Copy access key">
                            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                        </Button>
                    </div>
                    <p className="mt-3 text-xs text-zinc-500">Status: {accessKey.block ? "Blocked" : "Active"}</p>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ViewKeyModal;
