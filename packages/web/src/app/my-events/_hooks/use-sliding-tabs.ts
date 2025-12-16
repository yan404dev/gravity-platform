"use client";

import { useState, useRef, useEffect } from "react";

type TabType = "created" | "registered";

export function useSlidingTabs() {
    const [activeTab, setActiveTab] = useState<TabType>("created");
    const [slideStyle, setSlideStyle] = useState({
        width: 0,
        transform: "translateX(0)",
    });

    const createdRef = useRef<HTMLButtonElement>(null);
    const registeredRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const updateSlidePosition = () => {
            if (activeTab === "created" && createdRef.current) {
                setSlideStyle({
                    width: createdRef.current.offsetWidth,
                    transform: "translateX(0)",
                });
            } else if (
                activeTab === "registered" &&
                registeredRef.current &&
                createdRef.current
            ) {
                setSlideStyle({
                    width: registeredRef.current.offsetWidth,
                    transform: `translateX(${createdRef.current.offsetWidth}px)`,
                });
            }
        };

        // Small timeout to ensure DOM is ready/layout is settled
        const timeoutId = setTimeout(updateSlidePosition, 0);
        window.addEventListener("resize", updateSlidePosition);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener("resize", updateSlidePosition);
        }
    }, [activeTab]);

    return {
        activeTab,
        setActiveTab,
        slideStyle,
        createdRef,
        registeredRef,
    };
}
