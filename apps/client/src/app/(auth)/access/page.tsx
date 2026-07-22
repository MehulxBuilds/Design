"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound } from "lucide-react";
import { toast } from "sonner";
import { useKeyMe } from "@/hooks/use-key";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Access() {
    const [key, setKey] = useState("");
    const access = useKeyMe();
    const router = useRouter();

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const value = key.trim();
        if (!value) return;

        try {
            await access.mutateAsync({ key: value });
            toast.success("Access granted");
            router.push("/dashboard");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Invalid access key");
        }
    };

    return (
        <main className="flex min-h-svh items-center justify-center bg-zinc-50 p-4 dark:bg-zinc-950">
            <section className="w-full max-w-md rounded-3xl border bg-background p-8 shadow-xl">
                <div className="mb-8 flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                    <KeyRound className="size-5" />
                </div>
                <h1 className="text-2xl font-semibold tracking-tight">Connect your access key</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Your key acts as your wallet and is stored on this device.
                </p>

                <form className="mt-8 space-y-5" onSubmit={submit}>
                    <div className="space-y-2">
                        <Label htmlFor="access-key">Access key</Label>
                        <Input
                            id="access-key"
                            type="password"
                            autoComplete="off"
                            value={key}
                            onChange={(event) => setKey(event.target.value)}
                            placeholder="dk_..."
                            disabled={access.isPending}
                        />
                    </div>
                    <Button className="w-full" type="submit" disabled={!key.trim() || access.isPending}>
                        {access.isPending ? "Checking key..." : "Grant access"}
                    </Button>
                </form>
            </section>
        </main>
    );
}
