"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { MenuIcon, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Navbar() {
    const navRef = useRef<HTMLDivElement>(null);
    const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useGSAP(() => {
        ScrollTrigger.create({
            start: "top -50",
            end: 99999,
            toggleClass: { className: "nav-scrolled", targets: navRef.current },
        });
    }, { scope: navRef });

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none">
                <nav
                    ref={navRef}
                    className="pointer-events-auto flex items-center justify-between px-6 py-3 rounded-[3rem] w-full max-w-4xl transition-all duration-300 border border-transparent bg-transparent [&.nav-scrolled]:bg-[#0D0D0D]/70 [&.nav-scrolled]:backdrop-blur-xl [&.nav-scrolled]:border-white/10"
                >
                    {/* Logo Area */}
                    <Link href="/" className="flex flex-col group transition-transform duration-300 hover:-translate-y-[1px]">
                        <span className="font-sans font-bold text-xl text-white tracking-tight leading-none">CareBot AI</span>
                        <span className="font-mono text-[10px] text-muted uppercase tracking-widest mt-0.5">Intelligent Tools for Africa</span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {["Home", "Products", "About"].map((item) => (
                            <Link
                                key={item}
                                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                className="text-sm font-medium text-muted hover:text-secondary transition-all duration-300 hover:-translate-y-[1px]"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex">
                        <Link
                            href="/products"
                            className="relative overflow-hidden px-5 py-2.5 rounded-[2rem] bg-accent text-white text-sm font-bold group transition-transform duration-300 hover:-translate-y-[1px] hover:scale-[1.03]"
                            style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
                        >
                            <span className="relative z-10">Explore Products</span>
                            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></span>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden text-secondary p-2 transition-transform duration-300 hover:-translate-y-[1px]"
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
                    </button>
                </nav>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-[#0D0D0D]/95 backdrop-blur-xl pt-32 px-6 flex flex-col items-center gap-8 md:hidden">
                    {["Home", "Products", "About"].map((item) => (
                        <Link
                            key={item}
                            href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-2xl font-bold text-secondary"
                        >
                            {item}
                        </Link>
                    ))}
                    <Link
                        href="/products"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="mt-4 px-8 py-4 rounded-[2rem] bg-accent text-white text-lg font-bold w-full text-center"
                    >
                        Explore Products
                    </Link>
                </div>
            )}

            {/* Coming Soon Modal */}
            {isComingSoonOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 opacity-100 transition-opacity">
                    <div className="bg-surface border border-white/10 p-8 rounded-[3rem] max-w-sm w-full relative transform scale-100 transition-transform">
                        <button
                            onClick={() => setIsComingSoonOpen(false)}
                            className="absolute top-6 right-6 text-muted hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                        <h3 className="font-drama text-2xl text-accent mb-4">Coming Soon</h3>
                        <p className="text-muted text-sm leading-relaxed mb-8">
                            This product is currently in early access. Please check back later or contact us for a demo.
                        </p>
                        <button
                            onClick={() => setIsComingSoonOpen(false)}
                            className="w-full py-3 rounded-[2rem] bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
