"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, CheckCircle2, TrendingUp, ShieldCheck, MapPin, Truck, AlertCircle, Clock, Navigation, Wallet, HeartPulse, Check, X } from "lucide-react";

interface NodeData {
    id: number;
    status: 'success' | 'warning' | 'idle';
    x: number;
    y: number;
    topLineWidth: string;
    bottomLineWidth: string;
}

const nodes: NodeData[] = [
    { id: 1, status: 'success', x: 65, y: 40, topLineWidth: '40%', bottomLineWidth: '70%' },
    { id: 2, status: 'warning', x: 80, y: 30, topLineWidth: '40%', bottomLineWidth: '50%' },
    { id: 3, status: 'idle', x: 85, y: 55, topLineWidth: '40%', bottomLineWidth: '60%' },
    // extra inactive nodes for the map background
    { id: 4, status: 'idle', x: 50, y: 35, topLineWidth: '0%', bottomLineWidth: '0%' },
    { id: 5, status: 'idle', x: 55, y: 60, topLineWidth: '0%', bottomLineWidth: '0%' },
];

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function NaijFleetProductPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Dashboard Mockup State
    const [activeId, setActiveId] = useState<number>(1);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const interval = setInterval(() => {
            setActiveId(prev => (prev === 1 ? 2 : prev === 2 ? 3 : 1));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const getStatusColor = (status: string, glow: boolean = false) => {
        switch (status) {
            case 'success': return glow ? 'rgba(34, 197, 94, 0.2)' : '#22C55E';
            case 'warning': return glow ? 'rgba(239, 68, 68, 0.2)' : '#EF4444';
            case 'idle': return glow ? 'rgba(255, 255, 255, 0.05)' : '#888888';
            default: return '#fff';
        }
    };

    const activeChartHeights = {
        1: [30, 60, 45, 80, 55, 40, 95],
        2: [80, 40, 70, 30, 90, 60, 40],
        3: [20, 30, 25, 40, 20, 35, 25]
    }[activeId] || [0, 0, 0, 0, 0, 0, 0];

    // Comparison Section State
    const [activeFeature, setActiveFeature] = useState(0);

    const comparisonFeatures = [
        {
            title: "Fleet Visibility",
            desc: "See every vehicle instantly on a live map.",
            rideHailing: { title: "One-off view", desc: "You only see the single rider assigned to your request." },
            naijfleet: { title: "Bird's-eye map", desc: "Track your entire fleet, their statuses, and idle times in one dashboard." }
        },
        {
            title: "Dispatcher Control",
            desc: "Manage assignments exactly how you need.",
            rideHailing: { title: "Random assignment", desc: "The app chooses who takes your package. You have zero input." },
            naijfleet: { title: "Full assignment control", desc: "Manually assign jobs to specific drivers or auto-route based on zones." }
        },
        {
            title: "Batched Deliveries",
            desc: "Send riders on efficient multi-stop routes.",
            rideHailing: { title: "Point A to B", desc: "Drivers only take one package at a time." },
            naijfleet: { title: "Optimized multi-drop", desc: "Load up a van with 20 parcels and NaijFleet optimizes the perfect delivery route." }
        },
        {
            title: "Customer Tracking",
            desc: "Professional tracking links for your buyers.",
            rideHailing: { title: "App friction", desc: "Customers have to download an app or use a clunky generic tracker." },
            naijfleet: { title: "Branded ETA links", desc: "Send SMS updates with beautiful tracking links bearing your business name." }
        }
    ];

    useGSAP(() => {
        const ctx = gsap.context(() => {
            // Hero Stagger
            gsap.from(".nf-hero-anim", {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.08,
                ease: "power3.out"
            });

            // Standard fade up for sections
            gsap.utils.toArray(".nf-fade-anim").forEach((el) => {
                gsap.from(el as Element, {
                    scrollTrigger: {
                        trigger: el as Element,
                        start: "top 85%",
                    },
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out"
                });
            });

            // Independent Card stagger per container
            gsap.utils.toArray(".nf-cards-container").forEach((container) => {
                const cards = (container as HTMLElement).querySelectorAll(".nf-card-wrapper");
                if (cards.length > 0) {
                    gsap.from(cards, {
                        scrollTrigger: {
                            trigger: container as Element,
                            start: "top 85%",
                        },
                        y: 40,
                        opacity: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power3.out"
                    });
                }
            });

            // Table row stagger
            const tableRows = gsap.utils.toArray(".nf-tr-anim");
            if (tableRows.length > 0) {
                gsap.from(tableRows, {
                    scrollTrigger: {
                        trigger: ".nf-table-container",
                        start: "top 80%",
                    },
                    y: 20,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.08,
                    ease: "power3.out"
                });
            }

            // Alternating Feature slides
            gsap.utils.toArray(".nf-feature-slide").forEach((el) => {
                const element = el as HTMLElement;
                const isRight = element.classList.contains('slide-right');
                gsap.from(element, {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 80%",
                    },
                    x: isRight ? 40 : -40,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                });
            });

            // Philosophy text word reveal
            const words = gsap.utils.toArray(".nf-phil-word");
            if (words.length > 0) {
                gsap.from(words, {
                    scrollTrigger: {
                        trigger: ".nf-philosophy-strip",
                        start: "top 80%",
                    },
                    opacity: 0.2,
                    duration: 0.5,
                    stagger: 0.03,
                    ease: "power2.inOut"
                });
            }

            // Pulsing dot animations for mockups
            gsap.to(".nf-pulse-dot", {
                scale: 1.5,
                opacity: 0,
                duration: 2,
                repeat: -1,
                ease: "sine.inOut"
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const philStatement1 = "Most logistics software focuses on: global enterprises with unlimited budgets and stable infrastructure.".split(" ");
    const philStatement2 = "We focus on: operators running real businesses on ".split(" ");
    const philStatement3 = "Nigerian roads.".split(" ");

    return (
        <div ref={containerRef} className="bg-[#0D0D0D] overflow-hidden selection:bg-[#E8533A]/30 selection:text-white relative">

            {/* GLOBAL NOISE */}
            <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.05]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }}></div>


            {/* HERO SECTION */}
            <div className="relative pt-[120px] md:pt-[160px] pb-16 md:pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
                {/* Radial Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#E8533A]/20 blur-[100px] md:blur-[120px] rounded-full pointer-events-none -z-10"></div>

                <div className="nf-hero-anim text-[10px] md:text-xs font-mono tracking-widest text-[#888888] mb-6 uppercase">
                    CAREBOT AI → PRODUCTS → NAIJFLEET
                </div>

                <div className="nf-hero-anim inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 mb-8">
                    <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></div>
                    <span className="text-[#22C55E] text-[10px] md:text-xs font-mono uppercase tracking-widest">Live</span>
                </div>

                <h1 className="nf-hero-anim text-4xl md:text-7xl font-sans font-bold text-white tracking-tight leading-tight mb-6 max-w-4xl">
                    Dispatch control meets <br className="hidden md:block" />
                    <span className="font-drama italic text-[#E8533A] text-5xl md:text-8xl font-light">Simplicity.</span>
                </h1>

                <p className="nf-hero-anim text-lg md:text-xl text-[#888888] mb-8 max-w-2xl leading-relaxed">
                    Get real-time driver locations and remove delivery guesswork — NaijFleet keeps your operation on track.
                </p>

                <div className="nf-hero-anim flex flex-wrap justify-center gap-3 mb-10">
                    <div className="bg-[#1A1A1A] rounded-full px-4 md:px-5 py-2 border border-white/5 font-mono text-[10px] md:text-xs text-[#E0E0E0] uppercase tracking-wider flex items-center gap-2">
                        Purpose-built for Nigeria <span className="text-[#E8533A]">●</span>
                    </div>
                    <div className="bg-[#1A1A1A] rounded-full px-4 md:px-5 py-2 border border-white/5 font-mono text-[10px] md:text-xs text-[#E0E0E0] uppercase tracking-wider flex items-center gap-2">
                        Live Now <span className="text-[#E8533A]">●</span>
                    </div>
                </div>

                <div className="nf-hero-anim flex flex-col sm:flex-row gap-4 mb-20 w-full justify-center">
                    <Link href="https://onboarding.naijfleet.app" className="group relative overflow-hidden px-8 py-4 bg-[#E8533A] text-white font-bold rounded-full transition-transform duration-300 hover:scale-[1.03] active:scale-95 shrink-0" style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}>
                        <span className="relative z-10">Start free trial</span>
                        <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                    </Link>
                    <Link href="https://calendly.com/carebot-ai-ng/30min" target="_blank" rel="noopener noreferrer" className="group px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-colors shrink-0 hover:-translate-y-[1px] duration-200">
                        Book a live demo
                    </Link>
                </div>

                {/* Interactive Dashboard Mockup */}
                <div className="nf-hero-anim w-full">
                    <div className="text-center text-[#E8533A] font-bold tracking-widest text-xs mb-4 animate-pulse">
                        [ NAIJFLEET DASHBOARD ]
                    </div>
                    {isClient ? (
                        <div className="w-full max-w-5xl bg-[#0A0A0A] rounded-[2rem] border border-white/5 shadow-2xl font-mono select-none flex flex-col relative overflow-hidden text-left mx-auto">
                            {/* Top Bar */}
                            <div className="flex justify-between items-center px-6 py-4 border-b border-white/[0.02]">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-white/10"></div>
                                    <div className="w-3 h-3 rounded-full bg-white/10"></div>
                                    <div className="w-3 h-3 rounded-full bg-white/10"></div>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] md:text-xs tracking-widest text-[#22C55E] uppercase font-bold">
                                    <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                                    SECURE UPLINK
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4 p-4 h-auto md:h-[450px]">

                                {/* Left Panel */}
                                <div className="w-full md:w-[35%] flex flex-col gap-4">
                                    {/* List Items (First 3 nodes) */}
                                    <div className="flex flex-col gap-3 flex-1">
                                        {nodes.slice(0, 3).map((node) => {
                                            const isActive = activeId === node.id;
                                            return (
                                                <div
                                                    key={node.id}
                                                    onClick={() => setActiveId(node.id)}
                                                    className={`relative p-5 rounded-[1.5rem] cursor-pointer transition-all duration-500 flex items-center justify-between overflow-hidden
                                                        ${isActive ? 'bg-white/[0.03] border border-white/10 shadow-lg' : 'bg-transparent border border-transparent hover:bg-white/[0.01] hover:border-white/5'}
                                                    `}
                                                >
                                                    {/* Animated Skeleton Lines */}
                                                    <div className="flex flex-col gap-3 w-3/4 relative z-10 transition-all duration-500">
                                                        <div className={`h-1.5 rounded-full transition-all duration-700 ease-out`}
                                                            style={{ width: node.topLineWidth, backgroundColor: isActive ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.2)' }}></div>
                                                        <div className={`h-1.5 rounded-full transition-all duration-700 ease-out delay-75`}
                                                            style={{ width: isActive ? '100%' : node.bottomLineWidth, backgroundColor: isActive ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)' }}></div>
                                                    </div>

                                                    {/* Status Dot */}
                                                    <div className="relative flex items-center justify-center shrink-0 w-8 h-8">
                                                        {/* Glow Ring */}
                                                        <div
                                                            className="absolute inset-0 rounded-full transition-all duration-700 blur-md opacity-0 scale-50"
                                                            style={{
                                                                backgroundColor: getStatusColor(node.status),
                                                                opacity: isActive ? 0.4 : 0,
                                                                transform: isActive ? 'scale(2.5)' : 'scale(0.5)'
                                                            }}
                                                        ></div>
                                                        {/* Core Dot */}
                                                        <div
                                                            className="w-2.5 h-2.5 rounded-full relative z-10 transition-all duration-500"
                                                            style={{ backgroundColor: getStatusColor(node.status) }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Bottom Chart */}
                                    <div className="h-32 bg-transparent rounded-[1.5rem] border border-white/5 p-4 flex items-end justify-between gap-1.5 md:gap-3 overflow-hidden group">
                                        {activeChartHeights.map((height, i) => (
                                            <div
                                                key={i}
                                                className="w-full rounded-t-sm transition-all duration-700 ease-out origin-bottom"
                                                style={{
                                                    height: `${height}%`,
                                                    background: `linear-gradient(to top, #E8533A 0%, rgba(232,83,58,0.3) 100%)`,
                                                    opacity: height > 60 ? 1 : 0.6
                                                }}
                                            ></div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right Panel (Map/Grid) */}
                                <div className="w-full md:w-[65%] rounded-[1.5rem] border border-white/5 relative overflow-hidden bg-[#0D0D0D] min-h-[300px]">

                                    {/* Grid Pattern Background */}
                                    <div className="absolute inset-0 opacity-[0.15] pointer-events-none"
                                        style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9IiNmZmYiLz4KPC9zdmc+')", backgroundSize: '40px 40px', backgroundPosition: 'center' }}>
                                    </div>

                                    {/* Floating Map Pill */}
                                    <div className="absolute top-6 left-6 md:left-8 bg-[#0A0A0A]/80 backdrop-blur-md border border-white/10 px-4 md:px-5 py-2.5 rounded-full flex items-center gap-3 z-30 shadow-2xl">
                                        <div className="w-2 h-2 rounded-full bg-[#22C55E] shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
                                        <div className="text-[9px] md:text-xs text-white uppercase tracking-widest leading-none">
                                            GLOBAL MESH NETWORK <span className="text-white/30 mx-2 font-light">•</span> Routing Active
                                        </div>
                                    </div>

                                    {/* Fades for depth */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent pointer-events-none z-10 opacity-60"></div>

                                    {/* Map Nodes */}
                                    {nodes.map((node) => {
                                        const isActive = activeId === node.id;
                                        const isMainNode = node.id <= 3;

                                        return (
                                            <div
                                                key={`map-${node.id}`}
                                                onClick={() => isMainNode && setActiveId(node.id)}
                                                className={`absolute transition-all duration-1000 ease-in-out z-20 ${isMainNode ? 'cursor-pointer' : 'pointer-events-none'}`}
                                                style={{
                                                    left: `${node.x}%`,
                                                    top: `${node.y}%`,
                                                    transform: `translate(-50%, -50%) scale(${isActive ? 1 : 0.8})`
                                                }}
                                            >
                                                {/* Outer Pulse Ring for Active Node */}
                                                {isActive && (
                                                    <div
                                                        className="absolute inset-0 rounded-full animate-ping opacity-20"
                                                        style={{
                                                            backgroundColor: getStatusColor(node.status),
                                                            transform: 'scale(4)'
                                                        }}
                                                    ></div>
                                                )}

                                                {/* Static Translucent Glow Ring */}
                                                {isMainNode && (
                                                    <div
                                                        className="absolute inset-0 rounded-full blur-[2px] opacity-30 transition-all duration-700"
                                                        style={{
                                                            backgroundColor: getStatusColor(node.status),
                                                            transform: isActive ? 'scale(3.5)' : 'scale(1.5)',
                                                            border: `1px solid ${getStatusColor(node.status)}`
                                                        }}
                                                    ></div>
                                                )}

                                                {/* Inner Solid Dot */}
                                                <div
                                                    className="w-2.5 md:w-3 border-[1.5px] border-[#0D0D0D] h-2.5 md:h-3 rounded-full relative z-10 transition-colors duration-500"
                                                    style={{
                                                        backgroundColor: getStatusColor(node.status),
                                                        opacity: isMainNode ? 1 : (node.id === 4 ? 0.8 : 0.3) // Map decoration dots
                                                    }}
                                                ></div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Ambient Background Glow for entire component */}
                            <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-full h-full bg-[#E8533A]/5 blur-[100px] pointer-events-none -z-10 rounded-full"></div>
                        </div>
                    ) : (
                        <div className="w-full h-[500px] bg-[#0A0A0A] rounded-[2rem] border border-white/5 animate-pulse max-w-5xl mx-auto"></div>
                    )}
                </div>
            </div>

            {/* THE PROBLEM */}
            <div className="py-16 md:py-32 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="nf-fade-anim font-mono text-[10px] md:text-xs tracking-widest text-[#E8533A] uppercase mb-4">THE PROBLEM</div>
                    <h2 className="nf-fade-anim text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Dispatch chaos creates unnecessary stress and cost.</h2>
                    <p className="nf-fade-anim text-lg text-[#888888] max-w-2xl mx-auto">Manual triage, missed pickups and constant pressure are the reality for logistics teams — until now.</p>
                </div>

                <div className="nf-cards-container grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { icon: <Clock className="text-[#E8533A] mb-6" size={32} />, label: "Late deliveries", desc: "Manual processes keep riders waiting and customers calling, leading to late arrivals." },
                        { icon: <AlertCircle className="text-[#F59E0B] mb-6" size={32} />, label: "Rider confusion", desc: "Missing assignments and no live updates means wasted hours and preventable mistakes." },
                        { icon: <ShieldCheck className="text-yellow-400 mb-6" size={32} />, label: "No real-time view", desc: "Without instant visibility, small issues go unseen and escalate fast." }
                    ].map((item, i) => (
                        <div key={i} className="nf-card-wrapper">
                            <div className="group bg-[#1A1A1A] rounded-[2rem] p-8 md:p-10 border border-white/5 hover:border-[#E8533A]/30 transition-all duration-300 hover:-translate-y-2 h-full">
                                {item.icon}
                                <h3 className="text-xl font-bold text-white mb-3">{item.label}</h3>
                                <p className="text-[#888888] leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ALTERNATING FEATURES */}
            <div className="py-16 md:py-32 px-6 max-w-7xl mx-auto flex flex-col gap-24 md:gap-40 border-t border-white/5">

                {/* Feature 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    <div className="order-2 lg:order-1 nf-feature-slide slide-left bg-[#1A1A1A] border border-white/5 border-l-4 border-l-[#E8533A] rounded-[2rem] lg:rounded-[3rem] aspect-square lg:aspect-[4/5] p-8 relative overflow-hidden flex flex-col justify-center">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(232,83,58,0.05)_0%,transparent_70%)]"></div>
                        <div className="space-y-4 w-full max-w-md mx-auto relative z-10">
                            <div className="flex justify-between items-center mb-6">
                                <div className="text-white font-bold">Driver List</div>
                                <div className="px-3 py-1 bg-[#E8533A]/10 text-[#E8533A] rounded-full text-xs font-mono">Bulk Upload</div>
                            </div>
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="bg-[#0D0D0D] border border-white/5 p-4 rounded-xl flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/30 text-xs">IMG</div>
                                    <div className="flex-1">
                                        <div className="h-4 w-24 bg-white/10 rounded mb-2"></div>
                                        <div className="h-2 w-16 bg-white/5 rounded"></div>
                                    </div>
                                    <div className="w-12 h-6 rounded-full bg-[#E8533A]/20"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 nf-fade-anim">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">Onboard drivers <br /><span className="text-[#E8533A]">fast.</span></h2>
                        <p className="text-lg text-[#888888] leading-relaxed mb-8">
                            Add drivers and vehicles in seconds. Setup is frictionless so you can start managing your fleet instantly.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-[#E0E0E0]"><div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></div> Bulk vehicle upload</li>
                            <li className="flex items-center gap-3 text-[#E0E0E0]"><div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></div> Automated invitations</li>
                            <li className="flex items-center gap-3 text-[#E0E0E0]"><div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></div> Custom permission roles</li>
                        </ul>
                    </div>
                </div>

                {/* Feature 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    <div className="order-2 lg:order-1 nf-fade-anim">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">See live <br /><span className="text-[#888888] font-drama italic font-light">activity.</span></h2>
                        <p className="text-lg text-[#888888] leading-relaxed mb-8">
                            Check last location, current status, and idle time — instantly. No more calling drivers to ask where they are.
                        </p>
                    </div>
                    <div className="order-1 lg:order-2 nf-feature-slide slide-right bg-[#1A1A1A] border border-white/5 border-r-4 border-r-[#E8533A] rounded-[2rem] lg:rounded-[3rem] aspect-square lg:aspect-[4/5] relative overflow-hidden flex flex-col items-center justify-center p-8 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIxIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')]">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent z-0"></div>

                        <div className="relative z-10">
                            <div className="absolute inset-0 bg-[#E8533A] rounded-full nf-pulse-dot opacity-50"></div>
                            <div className="w-6 h-6 rounded-full bg-[#E8533A] border-4 border-[#1A1A1A] relative z-10 shadow-[0_0_30px_rgba(232,83,58,0.8)] flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                            </div>
                        </div>

                        <div className="absolute bottom-8 font-mono text-xs bg-[#0D0D0D] border border-white/10 px-4 py-2 rounded-full text-white inline-flex items-center gap-2 z-10 shadow-2xl">
                            DRIVER STATUS <span className="text-[#E8533A] px-1">•</span> Active • 12 parcels left
                        </div>
                    </div>
                </div>

                {/* Feature 3 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    <div className="order-2 lg:order-1 nf-feature-slide slide-left bg-[#1A1A1A] border border-white/5 border-l-4 border-l-[#E8533A] rounded-[2rem] lg:rounded-[3rem] aspect-square lg:aspect-[4/5] p-8 relative overflow-hidden flex flex-col items-center justify-center">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(232,83,58,0.05)_0%,transparent_70%)]"></div>

                        <div className="bg-[#0D0D0D] border border-white/10 rounded-2xl w-full max-w-xs p-6 shadow-2xl relative z-10 text-center">
                            <div className="w-16 h-16 rounded-full bg-white/5 mx-auto mb-4 border border-white/10"></div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#22C55E]/10 text-[#22C55E] rounded-full text-xs font-mono uppercase mb-6">
                                En route
                            </div>
                            <div className="font-mono text-3xl font-bold text-white mb-2 tracking-tighter">ETA 14 mins</div>
                            <p className="text-[#888888] text-sm">John Doe is arriving soon with your package.</p>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 nf-fade-anim">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">Share delivery <br /><span className="text-[#888888] font-drama italic font-light">status.</span></h2>
                        <p className="text-lg text-[#888888] leading-relaxed mb-8">
                            Send instant updates to customers, no phone calls needed. Reduce inbound support queries by providing transparent tracking links.
                        </p>
                    </div>
                </div>

            </div>

            {/* COMPARISON TABLE - INTERACTIVE OVERHAUL */}
            <div className="py-24 md:py-32 px-6 max-w-6xl mx-auto border-t border-white/5">
                <div className="text-center mb-16">
                    <div className="nf-fade-anim font-mono text-[10px] md:text-xs tracking-widest text-[#E8533A] uppercase mb-4">WHY SCALE PAST RIDE-HAILING APPS</div>
                    <h2 className="nf-fade-anim text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Built for operators. Not passengers.</h2>
                    <p className="nf-fade-anim text-lg text-[#888888] max-w-2xl mx-auto">Ride-hailing works for one-off tasks. NaijFleet is purpose-built for daily dispatch and logistics teams.</p>
                </div>

                {isClient ? (
                    <div className="nf-fade-anim grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#0A0A0A] p-4 md:p-6 rounded-[2rem] border border-white/5 shadow-2xl">
                        {/* Interactive Feature List Sidebar */}
                        <div className="lg:col-span-4 flex flex-col gap-3">
                            {comparisonFeatures.map((feat, idx) => {
                                const isActive = activeFeature === idx;
                                return (
                                    <div
                                        key={idx}
                                        onClick={() => setActiveFeature(idx)}
                                        className={`cursor-pointer group relative overflow-hidden rounded-[1.5rem] p-5 md:p-6 transition-all duration-500 border
                                            ${isActive ? 'bg-[#1A1A1A] border-white/10 shadow-lg' : 'bg-transparent border-transparent hover:bg-white/[0.02] hover:border-white/5'}
                                        `}
                                    >
                                        {isActive && <div className="absolute inset-0 bg-gradient-to-r from-[#E8533A]/10 to-transparent pointer-events-none"></div>}
                                        {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#E8533A]"></div>}

                                        <div className="relative z-10 flex items-start justify-between">
                                            <div>
                                                <h3 className={`font-bold transition-colors duration-300 ${isActive ? 'text-white' : 'text-[#888888] group-hover:text-[#CCCCCC]'}`}>
                                                    {feat.title}
                                                </h3>
                                                {isActive && (
                                                    <p className="text-[#666666] text-sm mt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                                        {feat.desc}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Interactive Visual Comparison Panel */}
                        <div className="lg:col-span-8 bg-[#111111] rounded-[1.5rem] border border-white/5 relative overflow-hidden flex flex-col min-h-[400px]">

                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPgo8L3N2Zz4=')]"></div>

                            {/* Panel Header */}
                            <div className="relative z-10 grid grid-cols-2 border-b border-white/5 bg-[#0D0D0D]/80 backdrop-blur-md">
                                <div className="p-4 text-center border-r border-white/5 text-xs font-mono tracking-widest text-[#666666] uppercase">Ride-Hailing Apps</div>
                                <div className="p-4 text-center text-xs font-mono tracking-widest text-[#E8533A] uppercase font-bold flex items-center justify-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#E8533A] animate-pulse"></div> NaijFleet
                                </div>
                            </div>

                            {/* Dynamic Panel Content via key unmount/remount isolation */}
                            <div key={activeFeature} className="relative z-10 flex-1 grid grid-cols-2 animate-in fade-in zoom-in-95 duration-500">

                                {/* ❌ Ride-Hailing Half */}
                                <div className="p-8 md:p-12 border-r border-white/5 flex flex-col justify-center relative overflow-hidden group">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#666666] mb-6">
                                        <X className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-white font-bold text-xl mb-3">{comparisonFeatures[activeFeature].rideHailing.title}</h4>
                                    <p className="text-[#666666] leading-relaxed">{comparisonFeatures[activeFeature].rideHailing.desc}</p>

                                    {/* Subtle Mockup Viz for Ride-Hailing */}
                                    <div className="mt-8 border border-white/5 bg-[#0D0D0D] rounded-xl h-24 relative overflow-hidden opacity-50 grayscale">
                                        {activeFeature === 0 && <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-white/50 rounded-full"></div>}
                                        {activeFeature === 1 && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-mono text-white/30 truncate">Loading driver...</div>}
                                    </div>
                                </div>

                                {/* ✅ NaijFleet Half */}
                                <div className="p-8 md:p-12 bg-[#1A1A1A]/30 flex flex-col justify-center relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#E8533A]/10 blur-[80px] rounded-full pointer-events-none -z-0"></div>

                                    <div className="w-12 h-12 rounded-full bg-[#E8533A]/20 flex items-center justify-center text-[#E8533A] mb-6 relative z-10">
                                        <Check className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-white font-bold text-xl mb-3 relative z-10">{comparisonFeatures[activeFeature].naijfleet.title}</h4>
                                    <p className="text-[#888888] leading-relaxed relative z-10">{comparisonFeatures[activeFeature].naijfleet.desc}</p>

                                    {/* Sophisticated Mockup Viz for NaijFleet */}
                                    <div className="mt-8 border border-[#E8533A]/20 bg-[#0D0D0D] rounded-xl h-24 relative overflow-hidden shadow-[0_0_20px_rgba(232,83,58,0.1)]">
                                        {activeFeature === 0 && (
                                            <>
                                                <div className="absolute top-4 left-6 w-3 h-3 bg-[#E8533A] rounded-full shadow-[0_0_10px_#E8533A]"></div>
                                                <div className="absolute top-8 left-16 w-3 h-3 bg-[#22C55E] rounded-full shadow-[0_0_10px_#22C55E] animate-pulse"></div>
                                                <div className="absolute top-12 left-10 w-3 h-3 bg-yellow-400 rounded-full shadow-[0_0_10px_yellow]"></div>
                                            </>
                                        )}
                                        {activeFeature === 1 && (
                                            <div className="flex h-full items-center justify-center gap-2">
                                                <div className="bg-[#E8533A] text-white text-[10px] font-mono px-3 py-1 rounded truncate">Assign Olu</div>
                                                <div className="bg-white/10 text-white text-[10px] font-mono px-3 py-1 rounded">Auto-Route</div>
                                            </div>
                                        )}
                                        {activeFeature === 2 && (
                                            <div className="flex flex-col gap-1.5 p-3 h-full justify-center">
                                                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden relative">
                                                    <div className="h-full bg-[#E8533A] w-3/4"></div>
                                                    <div className="absolute top-0 left-1/4 w-1 h-full bg-[#0D0D0D]"></div>
                                                    <div className="absolute top-0 left-2/4 w-1 h-full bg-[#0D0D0D]"></div>
                                                </div>
                                                <div className="text-[10px] font-mono text-white/50 text-right">3 drops planned</div>
                                            </div>
                                        )}
                                        {activeFeature === 3 && (
                                            <div className="flex items-center gap-3 p-3 h-full">
                                                <div className="w-8 h-8 rounded-full bg-[#E8533A]/20 flex-shrink-0"></div>
                                                <div className="flex-1 space-y-1">
                                                    <div className="h-2 w-16 bg-white/80 rounded"></div>
                                                    <div className="h-1.5 w-24 bg-[#E8533A] rounded"></div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full h-[500px] border border-white/5 rounded-[2rem] bg-[#1A1A1A] animate-pulse max-w-6xl mx-auto"></div>
                )}

                <div className="nf-fade-anim mt-12 text-center font-mono text-[#666666] text-sm tracking-widest mx-auto max-w-lg">
                    STOP COMPROMISING YOUR BUSINESS WITH TOOLS BUILT FOR CONSUMERS
                </div>
            </div>

            {/* PHILOSOPHY STRIP */}
            <div className="nf-philosophy-strip w-full bg-[#111111] py-24 md:py-40 relative overflow-hidden flex flex-col items-center justify-center border-y border-white/5 px-6">
                <div className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }}></div>

                <div className="nf-fade-anim font-mono text-[10px] md:text-xs tracking-widest text-[#666666] uppercase mb-12 relative z-10">WHY NAIJFLEET EXISTS</div>

                <div className="relative z-10 max-w-4xl text-center text-xl md:text-5xl font-sans font-bold text-white leading-tight md:leading-snug tracking-tight">
                    <p className="mb-8 md:mb-12 text-[#666666] text-xl font-normal max-w-2xl mx-auto">
                        {philStatement1.map((word, i) => (
                            <span key={`p1-${i}`} className="nf-phil-word inline-block mr-[0.3em]">{word}</span>
                        ))}
                    </p>
                    <p className="font-drama italic font-light">
                        {philStatement2.map((word, i) => (
                            <span key={`p2-${i}`} className="nf-phil-word inline-block mr-[0.3em]">{word}</span>
                        ))}
                        <span className="text-[#E8533A] font-bold">
                            {philStatement3.map((word, i) => (
                                <span key={`p3-${i}`} className="nf-phil-word inline-block mr-[0.3em]">{word}</span>
                            ))}
                        </span>
                    </p>
                </div>
            </div>

            {/* WHO IT'S FOR */}
            <div className="py-24 md:py-32 px-6 max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <div className="nf-fade-anim font-mono text-[10px] md:text-xs tracking-widest text-[#E8533A] uppercase mb-4">WHO IT'S FOR</div>
                </div>

                <div className="nf-cards-container grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Card */}
                    <div className="nf-card-wrapper">
                        <div className="group bg-[#1A1A1A] rounded-[2rem] p-10 md:p-12 border border-[#22C55E]/30 hover:border-[#22C55E] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(34,197,94,0.05)] h-full">
                            <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/5 pb-6">Perfect for</h3>
                            <ul className="space-y-4">
                                {["Logistics teams managing their own fleet", "Dispatch-led delivery operations", "High-volume daily deliveries", "Operators who want fewer calls and more control"].map((item, i) => (
                                    <li key={i} className="flex gap-4 text-[#CCCCCC]">
                                        <span className="text-[#22C55E] shrink-0">—</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Card */}
                    <div className="nf-card-wrapper">
                        <div className="group bg-[#111111] rounded-[2rem] p-10 md:p-12 border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 h-full">
                            <h3 className="text-2xl font-bold text-[#888888] mb-8 border-b border-white/5 pb-6">Not built for</h3>
                            <ul className="space-y-4">
                                {["Marketplaces or job-matching apps", "One-off or personal deliveries", "Companies without a managed driver workforce"].map((item, i) => (
                                    <li key={i} className="flex gap-4 text-[#666666]">
                                        <span className="opacity-50 shrink-0">—</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA SECTION */}
            <div className="pb-24 md:pb-32 px-6 max-w-6xl mx-auto">
                <div className="nf-cards-container grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Card CTA */}
                    <div className="nf-card-wrapper">
                        <Link href="https://onboarding.naijfleet.app" className="relative group bg-[#1A1A1A] rounded-[2rem] p-10 md:p-12 border border-white/5 hover:border-[#22C55E]/50 transition-all duration-300 hover:-translate-y-2 overflow-hidden block h-full">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.1)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <h3 className="text-3xl font-bold text-white mb-4 relative z-10">Try NaijFleet for your team</h3>
                            <p className="text-[#888888] mb-12 relative z-10 leading-relaxed max-w-sm">Walk through instant tracking, status, shareable links, and real delay explanations.</p>
                            <span className="inline-flex items-center gap-2 text-[#22C55E] font-bold group-hover:gap-4 transition-all relative z-10">Start free trial <ArrowLeft className="rotate-180 w-4 h-4" /></span>
                        </Link>
                    </div>

                    {/* Right Card CTA */}
                    <div className="nf-card-wrapper">
                        <Link href="https://calendly.com/carebot-ai-ng/30min" target="_blank" rel="noopener noreferrer" className="relative group bg-[#1A1A1A] rounded-[2rem] p-10 md:p-12 border border-white/5 hover:border-white/30 transition-all duration-300 hover:-translate-y-2 overflow-hidden block h-full">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <h3 className="text-3xl font-bold text-white mb-4 relative z-10">Book a live demo</h3>
                            <p className="text-[#888888] mb-12 relative z-10 leading-relaxed max-w-sm">See NaijFleet in action with our team and learn how it fits your operation.</p>
                            <span className="inline-flex items-center gap-2 text-white font-bold group-hover:gap-4 transition-all relative z-10">Book now <ArrowLeft className="rotate-180 w-4 h-4" /></span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* BOTTOM CROSS-LINK STRIP */}
            <div className="pt-8 pb-16 md:pb-24 px-6 border-t border-white/5 text-center bg-[#111111]">
                <div className="font-mono text-[10px] tracking-widest text-[#666666] uppercase mb-8 mt-16">
                    ALSO FROM CAREBOT AI
                </div>
                <div className="flex flex-col md:flex-row justify-center items-stretch gap-4 max-w-3xl mx-auto">

                    <Link href="/products/wellness" className="flex-1 group bg-[#1A1A1A] p-6 rounded-[1.5rem] border border-white/5 hover:border-[#22C55E]/30 transition-all duration-200 hover:-translate-y-1 flex flex-col items-start text-left">
                        <div className="w-10 h-10 bg-[#0D0D0D] rounded-xl flex items-center justify-center border border-white/5 mb-4 group-hover:border-[#22C55E]/30 transition-colors">
                            <HeartPulse className="text-[#22C55E]" size={16} />
                        </div>
                        <h4 className="text-white font-bold mb-1 group-hover:text-[#22C55E] transition-colors">Naija Wellness Hub</h4>
                        <p className="text-[#888888] text-sm mb-4 line-clamp-1">Connecting Nigerians to care that actually shows up.</p>
                        <span className="mt-auto text-xs font-bold text-white flex items-center gap-1 group-hover:gap-2 transition-all">View <ArrowLeft className="w-3 h-3 rotate-180" /></span>
                    </Link>

                    <Link href="/products/owomi" className="flex-1 group bg-[#1A1A1A] p-6 rounded-[1.5rem] border border-white/5 hover:border-[#F59E0B]/30 transition-all duration-200 hover:-translate-y-1 flex flex-col items-start text-left">
                        <div className="w-10 h-10 bg-[#0D0D0D] rounded-xl flex items-center justify-center border border-white/5 mb-4 group-hover:border-[#F59E0B]/30 transition-colors">
                            <Wallet className="text-[#F59E0B]" size={16} />
                        </div>
                        <h4 className="text-white font-bold mb-1 group-hover:text-[#F59E0B] transition-colors">Owo Mi</h4>
                        <p className="text-[#888888] text-sm mb-4 line-clamp-1">Business finance tools built for Nigerian SMBs.</p>
                        <span className="mt-auto text-xs font-bold text-white flex items-center gap-1 group-hover:gap-2 transition-all">View <ArrowLeft className="w-3 h-3 rotate-180" /></span>
                    </Link>

                </div>
            </div>

        </div>
    );
}
