"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScrollContainer({ children }: { children: React.ReactNode }) {
    const wrapper = useRef<HTMLDivElement>(null);
    const content = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!wrapper.current || !content.current) return;

        const desktop = window.matchMedia("(min-width: 1024px)");
        let lenis: Lenis | undefined;

        const initialize = () => {
            lenis?.destroy();

            lenis = new Lenis({
                wrapper: wrapper.current!,
                content: content.current!,
                eventsTarget: desktop.matches ? window : wrapper.current!,
                autoRaf: true,
                smoothWheel: true,
                lerp: 0.12,
                wheelMultiplier: 0.9,
            });
        };

        initialize();
        desktop.addEventListener("change", initialize);

        return () => {
            desktop.removeEventListener("change", initialize);
            lenis?.destroy();
        };
    }, []);

    return (
        <div
            ref={wrapper}
            data-lenis-nested
            className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
            <div ref={content}>{children}</div>
        </div>
    );
}
