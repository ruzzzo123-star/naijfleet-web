"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Radar, ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            // Glitch effect on the 404 text
            gsap.to(".glitch-text", {
                x: () => Math.random() * 4 - 2,
                y: () => Math.random() * 4 - 2,
                opacity: () => Math.random() * 0.5 + 0.5,
                duration: 0.1,
                repeat: -1,
                yoyo: true,
                ease: "none",
            });

            // Standard fade-up animation
            gsap.from(".nf-anim", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out"
            });

            // Continuous slow pulse on the radar icon
            gsap.to(".radar-icon", {
                rotate: 360,
                duration: 4,
                repeat: -1,
                ease: "linear"
            });

            // Pulse the background ring
            gsap.to(".radar-ring", {
                scale: 2,
                opacity: 0,
                duration: 2,
                repeat: -1,
                ease: "power2.out"
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="min-h-[80vh] flex flex-col items-center justify-center px-6 relative overflow-hidden bg-[#0D0D0D]">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#E8533A]/5 blur-[100px] rounded-full pointer-events-none"></div>

            {/* Radar Animation Area */}
            <div className="nf-anim relative w-24 h-24 mb-10 flex items-center justify-center">
                <div className="radar-ring absolute inset-0 border border-[#E8533A] rounded-full opacity-50"></div>
                <div className="radar-ring absolute inset-0 border border-[#E8533A] rounded-full opacity-50" style={{ animationDelay: '1s' }}></div>
                <div className="w-16 h-16 bg-[#1A1A1A] border border-white/10 rounded-full flex items-center justify-center text-[#E8533A] z-10 shadow-[0_0_30px_rgba(232,83,58,0.2)]">
                    <Radar className="radar-icon w-8 h-8 opacity-80" />
                </div>
            </div>

            {/* Typography */}
            <div className="text-center relative z-10">
                <div className="nf-anim inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8533A]/10 border border-[#E8533A]/20 mb-6 font-mono text-xs text-[#E8533A] tracking-widest uppercase">
                    <Terminal size={12} />
                    <span>Route Invalid</span>
                </div>

                <h1 className="nf-anim text-7xl md:text-9xl font-sans font-bold text-white mb-4 tracking-tighter relative">
                    <span className="glitch-text inline-block">404</span>
                </h1>

                <h2 className="nf-anim text-2xl md:text-3xl font-drama italic text-muted max-w-xl mx-auto mb-12">
                    Signal lost. The infrastructure you are looking for does not exist on this network.
                </h2>
            </div>

            {/* CTAs */}
            <div className="nf-anim flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto relative z-10">
                <Link
                    href="/"
                    className="flex-1 group relative overflow-hidden flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#0A0A0A] font-bold rounded-full transition-transform duration-300 hover:scale-[1.03] active:scale-95"
                    style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="relative z-10">Return to Base</span>
                    <span className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                </Link>

                <Link
                    href="/products"
                    className="flex-1 group relative overflow-hidden flex items-center justify-center gap-2 px-6 py-4 bg-transparent border border-white/20 text-white font-bold rounded-full transition-transform duration-300 hover:scale-[1.03] active:scale-95 hover:bg-white/5"
                    style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
                >
                    <span className="relative z-10">View Products</span>
                </Link>
            </div>
        </div>
    );
}
