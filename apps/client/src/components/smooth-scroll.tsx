"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
    useEffect(() => {
        const lenis = new Lenis({
            autoRaf: true,
            smoothWheel: true,
            anchors: true,
            duration: 1.15,
            easing: (value) => Math.min(1, 1.001 - Math.pow(2, -10 * value)),
            prevent: (node) =>
                node.hasAttribute("data-lenis-nested") ||
                node.hasAttribute("data-lenis-gallery-page"),
        });

        return () => lenis.destroy();
    }, []);

    return null;
}
