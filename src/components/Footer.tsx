"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from(".footer-col", {
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top 90%",
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out"
        });

        gsap.from(".footer-bottom", {
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top 90%",
            },
            opacity: 0,
            duration: 0.8,
            delay: 0.3,
            ease: "power3.out"
        });
    }, { scope: footerRef });

    return (
        <footer ref={footerRef} className="bg-primary pt-32 pb-12 border-t border-white/5 relative z-10">
            <div className="max-w-7xl mx-auto px-6">

                {/* Main 3 Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-24 max-w-4xl mx-auto">
                    {/* Column 1: Products */}
                    <div className="footer-col flex flex-col gap-6 items-start md:items-center">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Products</h4>
                        <div className="flex flex-col gap-4 items-start md:items-center">
                            <Link href="/products" className="text-muted hover:text-white transition-colors duration-300 w-fit">NaijFleet</Link>
                            <Link href="/products/wellness" className="group text-muted hover:text-white transition-colors duration-300 w-fit flex items-center gap-3">
                                Naija Wellness Hub
                                <span className="text-[10px] bg-accent/10 group-hover:bg-accent/20 text-accent px-2.5 py-1 rounded-full border border-accent/30 group-hover:border-accent/60 uppercase font-bold tracking-wider transition-all duration-300">
                                    Join Waitlist →
                                </span>
                            </Link>
                            <Link href="/products/owomi" className="group text-muted hover:text-white transition-colors duration-300 w-fit flex items-center gap-3">
                                Owo Mi
                                <span className="text-[10px] bg-accent/10 group-hover:bg-accent/20 text-accent px-2.5 py-1 rounded-full border border-accent/30 group-hover:border-accent/60 uppercase font-bold tracking-wider transition-all duration-300">
                                    Join Waitlist →
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Column 2: Company */}
                    <div className="footer-col flex flex-col gap-6 items-start md:items-center">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Company</h4>
                        <div className="flex flex-col gap-4 items-start md:items-center">
                            <Link href="/about" className="text-muted hover:text-white transition-colors duration-300 w-fit">About CareBot AI</Link>
                        </div>
                    </div>

                    {/* Column 3: Connect */}
                    <div className="footer-col flex flex-col gap-6 items-start md:items-center">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Connect</h4>
                        <div className="flex flex-col gap-4 items-start md:items-center">
                            <Link href="https://www.linkedin.com/in/henry-a-a2b03a163/" target="_blank" className="text-muted hover:text-white transition-colors duration-300 w-fit">LinkedIn</Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="footer-bottom flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5">
                    <div className="flex items-center gap-3 bg-surface px-4 py-2 rounded-full border border-white/5">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
                        </span>
                        <span className="text-xs font-mono tracking-widest text-muted uppercase">System Operational</span>
                    </div>

                    <div className="text-sm text-muted/50">
                        © {new Date().getFullYear()} CAREBOT AI TECHNOLOGIES LTD. All rights reserved.
                    </div>
                </div>

            </div>
        </footer>
    );
}
