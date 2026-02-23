"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function CTASection() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
            }
        });

        tl.from(".cta-card", {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out"
        });

        tl.from(".cta-main-card", {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out"
        }, "-=0.4");
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="py-32 px-6 relative bg-primary">
            <div className="max-w-7xl mx-auto space-y-32">

                {/* Perfect For / Not Built For */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Perfect For */}
                    <div className="cta-card p-8 md:p-12 rounded-[3rem] bg-gradient-to-br from-surface to-[#0D0D0D] border border-white/5 transition-transform duration-300 hover:-translate-y-[2px]">
                        <div className="w-12 h-12 bg-success/10 rounded-2xl flex items-center justify-center mb-8">
                            <div className="w-4 h-4 rounded-full bg-success"></div>
                        </div>
                        <h3 className="text-3xl font-sans font-bold text-white mb-8 tracking-tight">Perfect for</h3>
                        <ul className="space-y-5 text-muted font-medium">
                            <li className="flex items-start gap-3">
                                <span className="text-success mt-1.5 text-[10px]">●</span>
                                <span className="leading-relaxed">Enterprises needing resilient infrastructure</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-success mt-1.5 text-[10px]">●</span>
                                <span className="leading-relaxed">Businesses scaling across Nigeria and beyond</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-success mt-1.5 text-[10px]">●</span>
                                <span className="leading-relaxed">Operations requiring offline-first capabilities</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-success mt-1.5 text-[10px]">●</span>
                                <span className="leading-relaxed">Teams that need cohesive, integrated tools</span>
                            </li>
                        </ul>
                    </div>

                    {/* Not Built For */}
                    <div className="cta-card p-8 md:p-12 rounded-[3rem] bg-[#0D0D0D] border border-white/10 border-dashed opacity-80 transition-transform duration-300 hover:-translate-y-[2px]">
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-8">
                            <div className="w-4 h-4 rounded-full bg-muted"></div>
                        </div>
                        <h3 className="text-3xl font-sans font-bold text-muted mb-8 tracking-tight">Not built for</h3>
                        <ul className="space-y-5 text-muted/70 font-medium">
                            <li className="flex items-start gap-3">
                                <span className="mt-1.5 text-[10px]">●</span>
                                <span className="leading-relaxed">Companies looking for generic global SaaS</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-1.5 text-[10px]">●</span>
                                <span className="leading-relaxed">Single-user consumer applications</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-1.5 text-[10px]">●</span>
                                <span className="leading-relaxed">Teams that don't value physical operations</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom CTA Block */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
                    {/* CTA Card 1 */}
                    <Link href="/products" className="cta-main-card block relative group overflow-hidden rounded-[3rem] transition-transform duration-500 hover:scale-[1.02]" style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}>
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-success/0 group-hover:bg-success/5 transition-colors duration-500 pointer-events-none z-0"></div>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[inset_0_0_80px_rgba(34,197,94,0.15)] border border-success/30 rounded-[3rem] z-10"></div>

                        <div className="p-8 md:p-12 h-full bg-surface border border-white/5 flex flex-col items-start min-h-[350px] justify-end relative z-20">
                            <div className="mb-auto w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 group-hover:bg-success/20">
                                <div className="w-6 h-6 bg-white group-hover:bg-success rounded-sm transition-colors duration-500"></div>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-sans font-bold text-white mb-4 tracking-tight">Explore our Products</h3>
                            <p className="text-muted mb-10 max-w-sm text-lg">
                                See how CareBot AI's suite of tools can transform your operations.
                            </p>
                            <div className="text-white font-bold flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                                <span>View products</span>
                                <span>→</span>
                            </div>
                        </div>
                    </Link>

                    {/* CTA Card 2 */}
                    <Link href="https://calendly.com/carebot-ai-ng/30min" target="_blank" rel="noopener noreferrer" className="cta-main-card block relative group overflow-hidden rounded-[3rem] transition-transform duration-500 hover:scale-[1.02]" style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}>
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500 pointer-events-none z-0"></div>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[inset_0_0_80px_rgba(255,255,255,0.08)] border border-white/20 rounded-[3rem] z-10"></div>

                        <div className="p-8 md:p-12 h-full bg-gradient-to-tr from-[#0D0D0D] to-surface border border-white/5 flex flex-col items-start min-h-[350px] justify-end relative z-20">
                            <div className="mb-auto w-16 h-16 bg-[#0D0D0D] border border-white/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 group-hover:bg-white/10">
                                <div className="w-6 h-6 rounded-full border-2 border-white group-hover:bg-white transition-colors duration-500"></div>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-sans font-bold text-white mb-4 tracking-tight">Partner with us</h3>
                            <p className="text-muted mb-10 max-w-sm text-lg">
                                Discuss your infrastructure needs with our engineering team.
                            </p>
                            <div className="text-white font-bold flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                                <span>Get in touch</span>
                                <span>→</span>
                            </div>
                        </div>
                    </Link>
                </div>

            </div>
        </section>
    );
}
