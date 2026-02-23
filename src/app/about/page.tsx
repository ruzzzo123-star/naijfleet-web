"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.from(".about-hero-anim", {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.08,
                ease: "power3.out"
            });

            gsap.from(".about-card", {
                scrollTrigger: {
                    trigger: ".about-card-container",
                    start: "top 85%",
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out"
            });

            gsap.from(".about-cta-anim", {
                scrollTrigger: {
                    trigger: ".about-cta-section",
                    start: "top 90%",
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            })
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-[#0D0D0D] overflow-hidden selection:bg-[#F59E0B]/30 selection:text-white">

            {/* HERO SECTION */}
            <div className="relative pt-[120px] md:pt-[160px] pb-16 md:pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
                {/* Radial Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#F59E0B]/20 blur-[100px] md:blur-[120px] rounded-full pointer-events-none -z-10"></div>

                <div className="about-hero-anim text-[10px] md:text-xs font-mono tracking-widest text-[#888888] mb-6 uppercase">
                    CAREBOT AI → ABOUT
                </div>

                <div className="about-hero-anim inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A1A1A] border border-white/10 mb-8">
                    <span className="text-[#F59E0B] text-[10px] md:text-xs font-mono uppercase tracking-widest">Our Mission</span>
                </div>

                <h1 className="about-hero-anim text-4xl md:text-7xl font-sans font-bold text-white tracking-tight leading-tight mb-8 max-w-4xl">
                    Building intelligent tools <br className="hidden md:block" />
                    <span className="font-drama italic text-[#F59E0B] font-light">for Nigeria's tomorrow.</span>
                </h1>

                <p className="about-hero-anim text-lg text-[#888888] max-w-2xl mx-auto mb-12">
                    We build accessible, locally relevant software infrastructure to solve real problems for businesses — with the rest of Africa in mind.
                </p>
            </div>

            {/* CONTENT SECTION */}
            <div className="py-16 md:py-32 px-6 max-w-5xl mx-auto about-card-container">
                <div className="space-y-8">
                    {/* About CareBot AI */}
                    <div className="about-card group relative p-8 md:p-12 bg-[#1A1A1A] border border-white/5 rounded-[3rem] hover:border-[#F59E0B]/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(245,158,11,0.05)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                        <div className="font-mono text-[10px] md:text-xs tracking-widest text-[#F59E0B] uppercase mb-4">THE VISION</div>
                        <h2 className="text-3xl md:text-4xl font-sans font-bold text-white mb-6 tracking-tight">About CareBot AI</h2>
                        <div className="space-y-6 text-lg text-[#888888] leading-relaxed relative z-10">
                            <p>
                                CareBot AI is an engineering company building a growing suite of products engineered primarily for the Nigerian market, while solving challenges common across Africa. From logistics infrastructure like NaijFleet to upcoming platforms like the Naija Wellness Hub, our mission is to build intelligent, accessible, and highly relevant software.
                            </p>
                            <p>
                                Instead of relying on generic consumer applications or global enterprise software to run vital workloads, we believe local businesses deserve purpose-built infrastructure designed for clarity, resilience, and control.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Our Building Principles */}
                        <div className="about-card group relative p-8 md:p-12 bg-[#111111] border border-white/5 rounded-[3rem] hover:border-white/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                            <div className="font-mono text-[10px] md:text-xs tracking-widest text-[#666666] uppercase mb-4">ENGINEERING</div>
                            <h2 className="text-2xl md:text-3xl font-sans font-bold text-white mb-6 tracking-tight">Our Building Principles</h2>
                            <div className="space-y-6 text-base text-[#888888] leading-relaxed relative z-10">
                                <p>
                                    Nigerian businesses run real operations, but the software available was either built for global enterprises or not built for their specific challenges at all.
                                </p>
                                <p>
                                    Our products are designed from first principles around local realities—offline-first architecture for low-connectivity areas, a simple UI built for non-technical users, and features that address actual problems on the ground.
                                </p>
                            </div>
                        </div>

                        {/* Our Approach */}
                        <div className="about-card group relative p-8 md:p-12 bg-[#111111] border border-white/5 rounded-[3rem] hover:border-white/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                            <div className="font-mono text-[10px] md:text-xs tracking-widest text-[#666666] uppercase mb-4">BUSINESS MODEL</div>
                            <h2 className="text-2xl md:text-3xl font-sans font-bold text-white mb-6 tracking-tight">Our Approach</h2>
                            <div className="space-y-6 text-base text-[#888888] leading-relaxed relative z-10">
                                <p>
                                    Our products follow a model designed to grow with your business. Core features should be accessible from day one at minimal friction.
                                </p>
                                <p>
                                    As your operations scale, premium tiers unlock advanced analytics, larger capacity, and deeper integrations. You should never have to pay for a tool before you know it works for you.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOUNDER SECTION */}
            <div className="py-16 md:py-32 px-6 max-w-4xl mx-auto about-card-container border-t border-white/5 mt-16 md:mt-0">
                <div className="about-card space-y-10 text-center flex flex-col items-center">
                    {/* Avatar */}
                    <div className="relative w-64 h-64 md:w-[350px] md:h-[350px] rounded-full overflow-hidden border-2 border-white/10 grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl">
                        <Image
                            src="/images/founder.jpg"
                            alt="Henry Aniagu - Founder of CareBot AI"
                            fill
                            className="object-cover scale-110 object-[center_90%] pointer-events-none select-none"
                            sizes="(max-width: 768px) 256px, 350px"
                            style={{ WebkitTouchCallout: 'none' }}
                        />
                    </div>

                    {/* Founder Quote */}
                    <blockquote className="text-2xl md:text-4xl font-playfair italic text-white leading-relaxed max-w-3xl">
                        "I built NaijFleet because I watched logistics operators in Lagos run entire fleets from WhatsApp groups and prayer. They deserved better tools."
                    </blockquote>

                    {/* Founder Name */}
                    <div className="space-y-2">
                        <div className="font-sans font-bold text-xl text-white">Henry Aniagu</div>
                        <div className="font-mono text-xs tracking-widest text-[#F59E0B] uppercase">Founder, CareBot AI</div>
                    </div>
                </div>
            </div>

            {/* CTA SECTION */}
            <div className="py-16 md:py-32 px-6 max-w-4xl mx-auto about-cta-section">
                <div className="about-cta-anim bg-[#1A1A1A] rounded-[3rem] p-12 md:p-20 border border-white/5 hover:border-[#F59E0B]/20 transition-colors duration-500 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#F59E0B]/50 to-transparent opacity-50"></div>

                    <h2 className="text-3xl md:text-5xl font-sans font-bold text-white mb-6 tracking-tight">Want to learn more?</h2>
                    <p className="text-lg text-[#888888] mb-12 max-w-xl mx-auto">See our products in action or get in touch with our team to discuss how we can help your business grow.</p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto relative z-10">
                        <Link
                            href="/products"
                            className="group relative overflow-hidden flex-1 px-8 py-4 bg-white text-[#0A0A0A] font-bold rounded-full transition-transform duration-300 hover:scale-[1.03] active:scale-95 text-center shrink-0"
                            style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
                        >
                            <span className="relative z-10">View Products</span>
                            <span className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                        </Link>

                        <Link
                            href="https://calendly.com/carebot-ai-ng/30min"
                            target="_blank"
                            className="group relative overflow-hidden flex-1 px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-full transition-transform duration-300 hover:scale-[1.03] active:scale-95 text-center shrink-0"
                            style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
                        >
                            <span className="relative z-10">Contact Us</span>
                            <span className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
}
