"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function PhilosophySection() {
    const sectionRef = useRef<HTMLElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.to(bgRef.current, {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }
        });

        gsap.from(".phil-text", {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 60%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative py-40 md:py-64 overflow-hidden flex items-center justify-center">
            {/* Parallax Background */}
            <div
                ref={bgRef}
                className="absolute top-[-20%] left-0 w-full h-[140%] bg-cover bg-center bg-no-repeat z-0 scale-110"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1620050811210-671e3d0d8bb6?q=80&w=2670&auto=format&fit=crop')" }} // Dramatic city traffic / night
            />

            {/* Dark Gradient Overlays */}
            <div className="absolute inset-0 bg-[#0D0D0D]/80 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-[#0D0D0D] z-10" />

            {/* Content */}
            <div className="relative z-20 max-w-4xl mx-auto px-6 text-center space-y-8">
                <h2 className="phil-text font-drama italic text-5xl md:text-7xl text-white leading-tight">
                    We didn't build our products for Silicon Valley.
                </h2>
                <p className="phil-text text-xl md:text-2xl text-muted leading-relaxed max-w-3xl mx-auto font-sans">
                    Foreign software assumes perfect conditions. We build for reality. When connectivity drops, our systems adapt. Built for Nigeria, designed for the rest of Africa.
                </p>
            </div>
        </section>
    );
}
