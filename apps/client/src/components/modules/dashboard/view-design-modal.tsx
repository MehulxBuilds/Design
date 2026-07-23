"use client";

import type { DesignRecord } from "@/types/design";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

const ViewDesignModal = ({ design, children }: { design: DesignRecord; children: React.ReactNode }) => (
    <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="overflow-hidden bg-white p-0 text-zinc-950 sm:max-w-3xl">
            <div className="max-h-[70vh] bg-zinc-100">
                <Image
                    src={design.url}
                    alt={design.title}
                    width={1200}
                    height={900}
                    sizes="(min-width: 640px) 768px, 100vw"
                    quality={80}
                    className="h-auto max-h-[70vh] w-full object-contain"
                />
            </div>
            <DialogHeader className="px-6 pb-6">
                <DialogTitle>{design.title}</DialogTitle>
                <DialogDescription>{design.description || "No description"}</DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
);

export default ViewDesignModal;
