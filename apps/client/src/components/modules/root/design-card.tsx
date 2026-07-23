"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import type { DesignRecord } from "@/types/design";
import ViewDesignModal from "@/components/modules/dashboard/view-design-modal";

const reveal = {
    rest: { opacity: 0, y: 28 },
    hover: { opacity: 1, y: 0 },
};

const gradient = {
    rest: { opacity: 0 },
    hover: { opacity: 1 },
};

export default function DesignCard({ design }: { design: DesignRecord }) {
    return (
        <ViewDesignModal design={design}>
            <motion.button
                type="button"
                initial="rest"
                animate="rest"
                whileHover="hover"
                whileFocus="hover"
                className="group relative block w-full overflow-hidden bg-zinc-100 text-left"
                aria-label={`View ${design.title}`}
            >
                <Image
                    src={design.url}
                    alt={design.title}
                    width={1200}
                    height={900}
                    sizes="(min-width: 640px) 33vw, 100vw"
                    quality={72}
                    loading="lazy"
                    fetchPriority="low"
                    className="block h-auto w-full transform-gpu transition-transform duration-500 ease-out group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
                />
                <motion.div
                    variants={gradient}
                    transition={{ duration: 0.25 }}
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/0 to-transparent"
                />
                <motion.div
                    variants={reveal}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-6"
                >
                    <div className="min-w-0">
                        <h2 className="truncate text-lg font-medium tracking-tight sm:text-xl">{design.title}</h2>
                        {design.description && (
                            <p className="mt-1 line-clamp-2 max-w-xl text-xs leading-5 text-white/75 sm:text-sm">{design.description}</p>
                        )}
                    </div>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-zinc-950">
                        <ArrowUpRight className="size-4" />
                    </span>
                </motion.div>
            </motion.button>
        </ViewDesignModal>
    );
}
