"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navigation, HeartPulse, Wallet } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function ProductsPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Hero Section Stagger
        gsap.from(".prod-hero-anim", {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out"
        });

        // Product Cards Stagger
        gsap.from(".prod-card-anim", {
            scrollTrigger: {
                trigger: ".prod-cards-container",
                start: "top 85%",
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out"
        });

        // Manifesto Strip
        gsap.from(".manifesto-anim", {
            scrollTrigger: {
                trigger: ".manifesto-section",
                start: "top 90%",
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out"
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="min-h-screen py-24 px-6 flex flex-col items-center bg-[#0D0D0D]">
            <div className="max-w-4xl w-full">

                {/* HERO SECTION */}
                <div className="mb-12 mt-4 md:mt-8">
                    <div className="prod-hero-anim text-[10px] font-mono uppercase tracking-widest text-[#666666] mb-3">
                        What We're Building
                    </div>
                    <h1 className="text-3xl md:text-5xl font-sans font-bold text-white tracking-tight leading-tight mb-4">
                        <span className="prod-hero-anim inline-block">Intelligent tools</span> <br className="hidden md:block" />
                        <span className="prod-hero-anim inline-block font-serif italic text-[#E8533A]">for Africa.</span>
                    </h1>
                    <p className="prod-hero-anim text-base text-[#999999] max-w-2xl leading-relaxed">
                        Every product CareBot AI builds solves a real problem for real people across the continent. Built for African realities, not adapted from foreign markets.
                    </p>
                </div>

                {/* PRODUCT CARDS */}
                <div className="prod-cards-container flex flex-col gap-4 mb-24">

                    {/* NaijFleet */}
                    <div className="prod-card-anim w-full">
                        <div className="group relative w-full rounded-[1.5rem] bg-[#1A1A1A] p-5 md:p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center border-l-4 border-l-[#E8533A]/50 hover:border-l-[#E8533A] overflow-hidden">
                            {/* Subtle radial glow on hover */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(232,83,58,0.1)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                            {/* Left Side: Identity */}
                            <div className="relative z-10 w-full sm:w-[35%] flex flex-col items-start gap-3">
                                <div className="w-10 h-10 bg-[#0D0D0D] border border-white/5 rounded-xl flex items-center justify-center">
                                    <Navigation className="text-[#E8533A]" size={18} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-sans font-bold text-white mb-1">NaijFleet</h2>
                                    <div className="flex flex-col items-start gap-1">
                                        <div className="inline-flex items-center gap-1.5 bg-[#22C55E]/10 border border-[#22C55E]/20 px-2 py-0.5 rounded-full text-[#22C55E] text-[9px] font-bold uppercase tracking-wider">
                                            <div className="w-1 h-1 rounded-full bg-[#22C55E] animate-pulse"></div>
                                            Live
                                        </div>
                                        <span className="text-[9px] font-mono text-[#666666] uppercase tracking-widest leading-none mt-1">Fleet Mgmt</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Detail */}
                            <div className="relative z-10 w-full sm:w-[65%] flex flex-col items-start sm:border-l border-white/5 sm:pl-6">
                                <h3 className="text-base md:text-lg font-bold text-white mb-1.5 leading-snug">
                                    Fleet visibility for operators who mean business.
                                </h3>
                                <p className="text-[#999999] text-sm leading-relaxed mb-4 max-w-lg">
                                    Real-time driver tracking, dispatch control, and shareable delivery links — built specifically for Nigerian logistics teams.
                                </p>
                                <Link href="/products/naijfleet" className="inline-flex items-center justify-center px-4 py-2 bg-white text-[#0D0D0D] text-xs font-bold rounded-full hover:bg-white/90 transition-colors w-fit">
                                    Explore NaijFleet →
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Naija Wellness Hub */}
                    <div className="prod-card-anim w-full">
                        <div className="group relative w-full rounded-[1.5rem] bg-[#1A1A1A] p-5 md:p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center border-l-4 border-l-[#22C55E]/50 hover:border-l-[#22C55E] overflow-hidden">
                            {/* Subtle radial glow on hover */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(34,197,94,0.1)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                            {/* Left Side: Identity */}
                            <div className="relative z-10 w-full sm:w-[35%] flex flex-col items-start gap-3">
                                <div className="w-10 h-10 bg-[#0D0D0D] border border-white/5 rounded-xl flex items-center justify-center">
                                    <HeartPulse className="text-[#22C55E]" size={18} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-sans font-bold text-white mb-1">Wellness Hub</h2>
                                    <div className="flex flex-col items-start gap-1">
                                        <div className="inline-flex items-center gap-1.5 bg-[#F59E0B]/10 border border-[#F59E0B]/20 px-2 py-0.5 rounded-full text-[#F59E0B] text-[9px] font-bold uppercase tracking-wider">
                                            Coming Soon
                                        </div>
                                        <span className="text-[9px] font-mono text-[#666666] uppercase tracking-widest leading-none mt-1">Health & Wellness</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Detail */}
                            <div className="relative z-10 w-full sm:w-[65%] flex flex-col items-start sm:border-l border-white/5 sm:pl-6">
                                <h3 className="text-base md:text-lg font-bold text-white mb-1.5 leading-snug">
                                    Connecting Nigerians to care that actually shows up.
                                </h3>
                                <p className="text-[#999999] text-sm leading-relaxed mb-4 max-w-lg">
                                    A platform that intelligently connects patients to localized health networks — reliably and transparently.
                                </p>
                                <Link href="/products/wellness" className="inline-flex items-center justify-center px-4 py-2 bg-[#2A2A2A] text-[#E0E0E0] text-xs font-bold rounded-full hover:bg-white/10 border border-white/5 transition-colors w-fit">
                                    Read App Overview →
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Owo Mi */}
                    <div className="prod-card-anim w-full">
                        <div className="group relative w-full rounded-[1.5rem] bg-[#1A1A1A] p-5 md:p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center border-l-4 border-l-[#F59E0B]/50 hover:border-l-[#F59E0B] overflow-hidden">
                            {/* Subtle radial glow on hover */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(245,158,11,0.1)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                            {/* Left Side: Identity */}
                            <div className="relative z-10 w-full sm:w-[35%] flex flex-col items-start gap-3">
                                <div className="w-10 h-10 bg-[#0D0D0D] border border-white/5 rounded-xl flex items-center justify-center">
                                    <Wallet className="text-[#F59E0B]" size={18} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-sans font-bold text-white mb-1">Owo Mi</h2>
                                    <div className="flex flex-col items-start gap-1">
                                        <div className="inline-flex items-center gap-1.5 bg-[#F59E0B]/10 border border-[#F59E0B]/20 px-2 py-0.5 rounded-full text-[#F59E0B] text-[9px] font-bold uppercase tracking-wider">
                                            Coming Soon
                                        </div>
                                        <span className="text-[9px] font-mono text-[#666666] uppercase tracking-widest leading-none mt-1">Finance & Invoicing</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Detail */}
                            <div className="relative z-10 w-full sm:w-[65%] flex flex-col items-start sm:border-l border-white/5 sm:pl-6">
                                <h3 className="text-base md:text-lg font-bold text-white mb-1.5 leading-snug">
                                    Business finance tools built for Nigerian SMBs.
                                </h3>
                                <p className="text-[#999999] text-sm leading-relaxed mb-4 max-w-lg">
                                    Invoicing, quotes, and business management in a Progressive Web App designed for how Nigerian businesses actually operate.
                                </p>
                                <Link href="/products/owomi" className="inline-flex items-center justify-center px-4 py-2 bg-[#2A2A2A] text-[#E0E0E0] text-xs font-bold rounded-full hover:bg-white/10 border border-white/5 transition-colors w-fit">
                                    Read App Overview →
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* BOTTOM MANIFESTO STRIP */}
            <div className="manifesto-section w-[100vw] bg-[#111111] py-16 px-6 border-t border-white/5 mt-8 flex justify-center">
                <div className="max-w-4xl text-left w-full">
                    <div className="manifesto-anim text-[10px] font-mono uppercase tracking-widest text-[#666666] mb-4">
                        More Coming
                    </div>
                    <h2 className="manifesto-anim text-2xl md:text-4xl font-sans font-bold text-white leading-tight mb-4 max-w-3xl">
                        We build one product at a time. Each one complete, considered, and built to last.
                    </h2>
                    <p className="manifesto-anim text-sm md:text-base text-[#999999] leading-relaxed max-w-2xl">
                        CareBot AI is not a feature factory. Every product in our ecosystem solves a distinct, real problem for African businesses and individuals.
                    </p>
                </div>
            </div>

        </div>
    );
}
