"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Check } from "lucide-react";

export default function FeaturesSection() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        // Feature 1
        gsap.from(".feat-1-left", {
            scrollTrigger: { trigger: ".feat-1-left", start: "top 80%" },
            x: -50, opacity: 0, duration: 0.8, ease: "power3.out"
        });
        gsap.from(".feat-1-right", {
            scrollTrigger: { trigger: ".feat-1-right", start: "top 80%" },
            x: 50, opacity: 0, duration: 0.8, ease: "power3.out"
        });

        // Feature 2
        gsap.from(".feat-2-left", {
            scrollTrigger: { trigger: ".feat-2-left", start: "top 80%" },
            x: -50, opacity: 0, duration: 0.8, ease: "power3.out"
        });
        gsap.from(".feat-2-right", {
            scrollTrigger: { trigger: ".feat-2-right", start: "top 80%" },
            x: 50, opacity: 0, duration: 0.8, ease: "power3.out"
        });

        // Feature 3
        gsap.from(".feat-3-left", {
            scrollTrigger: { trigger: ".feat-3-left", start: "top 80%" },
            x: -50, opacity: 0, duration: 0.8, ease: "power3.out"
        });
        gsap.from(".feat-3-right", {
            scrollTrigger: { trigger: ".feat-3-right", start: "top 80%" },
            x: 50, opacity: 0, duration: 0.8, ease: "power3.out"
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="features" className="py-24 md:py-32 px-6 overflow-hidden bg-primary">
            <div className="max-w-7xl mx-auto space-y-32">

                {/* Feature Row 1: Onboard drivers fast */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Mockup */}
                    <div className="feat-1-left order-2 lg:order-1 relative aspect-square bg-gradient-to-br from-surface to-[#0D0D0D] border border-white/5 rounded-[3rem] flex items-center justify-center p-8 overflow-hidden">
                        <div className="w-full max-w-sm bg-[#0D0D0D] border border-white/10 rounded-[2rem] p-6 flex flex-col gap-6 shadow-2xl relative z-10">
                            <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                <span className="text-white font-medium">Driver Roster</span>
                                <button className="px-3 py-1.5 bg-accent text-white text-xs font-bold rounded-lg hover:-translate-y-[1px] transition-transform">
                                    Bulk Upload CSV
                                </button>
                            </div>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-surface border border-white/5">
                                        <div className="w-10 h-10 rounded-full bg-white/10 shrink-0"></div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-2 w-2/3 rounded bg-white/20"></div>
                                            <div className="h-1.5 w-1/3 rounded bg-white/10"></div>
                                        </div>
                                        <div className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-muted uppercase">Synced</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Content */}
                    <div className="feat-1-right order-1 lg:order-2 space-y-6 lg:pl-8">
                        <h2 className="text-4xl md:text-5xl font-sans font-bold tracking-tight text-white mb-4">
                            Offline-first <span className="text-accent">architecture</span>
                        </h2>
                        <p className="text-lg text-muted leading-relaxed max-w-md">
                            Built for patchy networks. Our applications cache data locally and sync intelligently when connection is restored, ensuring operations never stop.
                        </p>
                        <ul className="space-y-4 pt-4 text-white">
                            {["Local data caching", "Optimistic UI updates", "Intelligent background sync"].map((feat, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center shrink-0">
                                        <div className="w-2 h-2 rounded-full bg-success"></div>
                                    </div>
                                    <span className="font-medium">{feat}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Feature Row 2: See live activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Content */}
                    <div className="feat-2-left space-y-6 lg:pr-8">
                        <h2 className="text-4xl md:text-5xl font-sans font-bold tracking-tight text-white mb-4">
                            Real-time visibility
                        </h2>
                        <p className="text-lg text-muted leading-relaxed max-w-md">
                            Monitor your entire operational footprint instantly across distributed environments. No more guessing where bottlenecks are occurring.
                        </p>
                    </div>

                    {/* Right: Mockup */}
                    <div className="feat-2-right relative aspect-square bg-gradient-to-tr from-surface to-[#0D0D0D] border border-white/5 rounded-[3rem] flex items-center justify-center overflow-hidden">
                        {/* Dot Grid Map */}
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

                        <div className="relative w-64 h-64 rounded-full border border-red-500/20 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full border border-red-500/10 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                            <div className="w-32 h-32 rounded-full border border-red-500/40 flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full border border-red-500/30 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] m-16"></div>
                                <div className="w-6 h-6 bg-red-500 rounded-full drop-shadow-[0_0_20px_rgba(239,68,68,1)] z-10 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        {/* Status Badge */}
                        <div className="absolute top-8 left-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0D0D0D]/90 backdrop-blur-md border border-white/10 font-mono text-xs text-muted tracking-widest z-20 shadow-2xl">
                            <span className="w-2 h-2 rounded-full bg-success shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                            NODE STATUS — Active • Optimized routing active
                        </div>
                    </div>
                </div>

                {/* Feature Row 3: Share delivery status */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Mockup */}
                    <div className="feat-3-left order-2 lg:order-1 relative aspect-square bg-gradient-to-tl from-surface to-[#0D0D0D] border border-white/5 rounded-[3rem] flex items-center justify-center p-8 overflow-hidden">
                        <div className="w-full max-w-sm bg-surface border border-white/10 rounded-[2rem] p-8 shadow-2xl relative z-10">
                            <div className="flex justify-between items-start mb-8">
                                <div className="w-14 h-14 bg-[#0D0D0D] rounded-[1rem] flex items-center justify-center border border-white/5">
                                    <div className="w-6 h-6 border-2 border-white/20 rounded-md"></div>
                                </div>
                                <span className="bg-success/10 text-success text-xs px-3 py-1.5 rounded border border-success/20 font-bold uppercase tracking-wider">
                                    Active
                                </span>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <div className="text-xs text-muted font-mono tracking-widest mb-1">UPTIME</div>
                                    <div className="text-4xl font-sans font-bold text-white tracking-tight">99.9%</div>
                                </div>
                                <div className="h-px w-full bg-white/5"></div>
                                <div className="text-base text-muted leading-relaxed">
                                    <span className="text-white font-medium">Core systems</span> are fully operational.
                                </div>
                            </div>

                            {/* Abstract Map Mini */}
                            <div className="mt-8 h-24 rounded-xl bg-[#0D0D0D] border border-white/5 relative overflow-hidden flex items-center">
                                <svg width="100%" height="100%" className="absolute inset-0 opacity-20">
                                    <path d="M 20 80 Q 150 20 300 50" stroke="#E8533A" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                                </svg>
                                <div className="absolute right-8 w-3 h-3 rounded-full bg-accent shadow-[0_0_10px_rgba(232,83,58,0.8)]"></div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Content */}
                    <div className="feat-3-right order-1 lg:order-2 space-y-6 lg:pl-8">
                        <h2 className="text-4xl md:text-5xl font-sans font-bold tracking-tight text-white mb-4">
                            Accessible <span className="text-muted font-normal">interfaces</span>
                        </h2>
                        <p className="text-lg text-muted leading-relaxed max-w-md">
                            We build intuitive tools that require zero training to use, reducing the barrier to entry for digital transformation in local markets.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}
