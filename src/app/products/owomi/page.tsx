"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, Wallet, TrendingUp, Receipt, ShieldCheck, HeartPulse, Navigation } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function OwoMiPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleWaitlistSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (email && !isSubmitting) {
            setIsSubmitting(true);
            try {
                const res = await fetch("/api/waitlist", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, source: "owomi" }),
                });

                if (res.ok) {
                    setIsSubmitted(true);
                } else {
                    console.error("Failed to join waitlist");
                }
            } catch (error) {
                console.error("Waitlist error:", error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    useGSAP(() => {
        const ctx = gsap.context(() => {
            // Hero Stagger
            gsap.from(".ow-hero-anim", {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.08,
                ease: "power3.out"
            });

            // Standard fade up for sections
            gsap.utils.toArray(".ow-fade-anim").forEach((el) => {
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

            // Card stagger
            gsap.from(".ow-card-anim", {
                scrollTrigger: {
                    trigger: ".ow-cards-container",
                    start: "top 80%",
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out"
            });

            // Alternating Feature slides
            gsap.utils.toArray(".ow-feature-slide").forEach((el) => {
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
            const words = gsap.utils.toArray(".ow-phil-word");
            if (words.length > 0) {
                gsap.from(words, {
                    scrollTrigger: {
                        trigger: ".ow-philosophy-strip",
                        start: "top 80%",
                    },
                    opacity: 0.2,
                    duration: 0.5,
                    stagger: 0.03,
                    ease: "power2.inOut"
                });
            }

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const philStatement1 = "Most finance tools focus on: accounting for businesses that already have structure.".split(" ");
    const philStatement2 = "We focus on: ".split(" ");
    const philStatement3 = "giving structure to businesses that are just getting started.".split(" ");

    return (
        <div ref={containerRef} className="bg-[#0D0D0D] overflow-hidden selection:bg-[#F59E0B]/30 selection:text-white">

            {/* HERO SECTION */}
            <div className="relative pt-[120px] md:pt-[160px] pb-16 md:pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
                {/* Radial Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#F59E0B]/20 blur-[100px] md:blur-[120px] rounded-full pointer-events-none -z-10"></div>

                <div className="ow-hero-anim text-[10px] md:text-xs font-mono tracking-widest text-[#888888] mb-6 uppercase">
                    CAREBOT AI → PRODUCTS → OWO MI
                </div>

                <div className="ow-hero-anim inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/20 mb-8">
                    <div className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse"></div>
                    <span className="text-[#F59E0B] text-[10px] md:text-xs font-mono uppercase tracking-widest">Coming Soon</span>
                </div>

                <h1 className="ow-hero-anim text-4xl md:text-7xl font-sans font-bold text-white tracking-tight leading-tight mb-8 max-w-4xl">
                    Business finance tools <br className="hidden md:block" />
                    <span className="font-drama italic text-[#F59E0B] font-light">built for Nigerian SMBs.</span>
                </h1>

                <div className="ow-hero-anim flex flex-wrap justify-center gap-3 mt-4">
                    <div className="bg-[#1A1A1A] rounded-full px-4 md:px-5 py-2 border border-white/5 font-mono text-[10px] md:text-xs text-[#E0E0E0] uppercase tracking-wider">
                        Mobile Optimized PWA
                    </div>
                    <div className="bg-[#1A1A1A] rounded-full px-4 md:px-5 py-2 border border-white/5 font-mono text-[10px] md:text-xs text-[#E0E0E0] uppercase tracking-wider">
                        Zero Learning Curve
                    </div>
                </div>
            </div>

            {/* THE PROBLEM */}
            <div className="py-16 md:py-32 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="ow-fade-anim font-mono text-[10px] md:text-xs tracking-widest text-[#F59E0B] uppercase mb-4">THE PROBLEM</div>
                    <h2 className="ow-fade-anim text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Informal systems don't scale.</h2>
                </div>

                <div className="ow-cards-container grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { stat: "01", label: "Lost Revenue", desc: "No central paper trail means forgotten invoices and uncollected payments." },
                        { stat: "02", label: "Slow Collections", desc: "Chasing clients via awkward WhatsApp messages damages business relationships." },
                        { stat: "03", label: "Zero Visibility", desc: "Mixing personal and business cash leaves you guessing about actual monthly profit." }
                    ].map((item, i) => (
                        <div key={i} className="ow-card-anim group bg-[#1A1A1A] rounded-[2rem] p-8 md:p-10 border border-white/5 hover:border-[#F59E0B]/30 transition-all duration-300 hover:-translate-y-2">
                            <div className="text-4xl md:text-5xl font-drama italic text-white/20 mb-6 group-hover:text-[#F59E0B]/40 transition-colors">{item.stat}</div>
                            <h3 className="text-xl font-bold text-white mb-3">{item.label}</h3>
                            <p className="text-[#888888] leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ALTERNATING FEATURES */}
            <div className="py-16 md:py-32 px-6 max-w-7xl mx-auto flex flex-col gap-24 md:gap-40 border-t border-white/5">

                {/* Feature 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    <div className="order-2 lg:order-1 ow-fade-anim">
                        <div className="font-mono text-[10px] md:text-xs tracking-widest text-[#F59E0B] uppercase mb-4">THE SOLUTION: INVOICING</div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">Professional quotes & <br /><span className="text-[#888888]">invoices in minutes.</span></h2>
                        <p className="text-lg text-[#888888] leading-relaxed mb-8">
                            Stop using generic spreadsheets. Create stunning, branded quotes that customers can approve directly from their phones. Convert approved quotes into numbered invoices with one tap.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-[#E0E0E0]"><div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></div> Pre-saved product & service catalogs</li>
                            <li className="flex items-center gap-3 text-[#E0E0E0]"><div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></div> Deposit & milestone tracking</li>
                            <li className="flex items-center gap-3 text-[#E0E0E0]"><div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></div> Auto-calculated taxes & discounts</li>
                        </ul>
                    </div>
                    <div className="order-1 lg:order-2 ow-feature-slide slide-right bg-[#1A1A1A] border border-white/5 border-l-4 border-l-[#F59E0B] rounded-[2rem] lg:rounded-[3rem] aspect-square lg:aspect-[4/5] p-8 relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.05)_0%,transparent_70%)]"></div>
                        <Receipt className="text-white/10 w-48 h-48" />
                    </div>
                </div>

                {/* Feature 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    <div className="order-1 lg:order-1 ow-feature-slide slide-left bg-[#1A1A1A] border border-white/5 border-r-4 border-r-[#F59E0B] rounded-[2rem] lg:rounded-[3rem] aspect-square lg:aspect-[4/5] p-8 relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.05)_0%,transparent_70%)]"></div>
                        <Wallet className="text-white/10 w-48 h-48" />
                    </div>
                    <div className="order-2 lg:order-2 ow-fade-anim">
                        <div className="font-mono text-[10px] md:text-xs tracking-widest text-[#F59E0B] uppercase mb-4">AUTOMATION</div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">Collect payments <br /><span className="text-[#888888]">without the awkwardness.</span></h2>
                        <p className="text-lg text-[#888888] leading-relaxed mb-8">
                            Integrate directly with Paystack to accept online transfers instantly. Let CareBot's automated engine send polite, scheduled payment reminders via SMS and WhatsApp on your behalf.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-[#E0E0E0]"><div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></div> Direct Paystack integration</li>
                            <li className="flex items-center gap-3 text-[#E0E0E0]"><div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></div> Automated WhatsApp & SMS follow-ups</li>
                            <li className="flex items-center gap-3 text-[#E0E0E0]"><div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></div> Instant professional receipts</li>
                        </ul>
                    </div>
                </div>

                {/* Feature 3 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    <div className="order-2 lg:order-1 ow-fade-anim">
                        <div className="font-mono text-[10px] md:text-xs tracking-widest text-[#F59E0B] uppercase mb-4">ANALYTICS</div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">Live dashboards <br /><span className="text-[#888888]">for real growth.</span></h2>
                        <p className="text-lg text-[#888888] leading-relaxed mb-8">
                            Log your business expenses as they happen. Your dashboard instantly calculates exact net profit, tracks unpaid outstanding balances, and generates simple customer history statements.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-[#E0E0E0]"><div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></div> Real-time Net Profit tracking</li>
                            <li className="flex items-center gap-3 text-[#E0E0E0]"><div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></div> Outstanding balance reports</li>
                            <li className="flex items-center gap-3 text-[#E0E0E0]"><div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></div> Simple Expense logging</li>
                        </ul>
                    </div>
                    <div className="order-1 lg:order-2 ow-feature-slide slide-right bg-[#1A1A1A] border border-white/5 border-l-4 border-l-[#F59E0B] rounded-[2rem] lg:rounded-[3rem] aspect-square lg:aspect-[4/5] p-8 relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.05)_0%,transparent_70%)]"></div>
                        <TrendingUp className="text-white/10 w-48 h-48" />
                    </div>
                </div>

            </div>

            {/* PHILOSOPHY STRIP */}
            <div className="ow-philosophy-strip w-full bg-[#111111] py-24 md:py-40 relative overflow-hidden flex flex-col items-center justify-center border-y border-white/5 px-6">
                <div className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }}></div>
                <div className="relative z-10 max-w-4xl text-center text-2xl md:text-5xl font-sans font-bold text-white leading-tight md:leading-snug tracking-tight">
                    <p className="mb-6 md:mb-8 text-[#888888]">
                        {philStatement1.map((word, i) => (
                            <span key={`p1-${i}`} className="ow-phil-word inline-block mr-[0.3em]">{word}</span>
                        ))}
                    </p>
                    <p>
                        {philStatement2.map((word, i) => (
                            <span key={`p2-${i}`} className="ow-phil-word inline-block mr-[0.3em]">{word}</span>
                        ))}
                        <span className="text-[#F59E0B]">
                            {philStatement3.map((word, i) => (
                                <span key={`p3-${i}`} className="ow-phil-word inline-block mr-[0.3em]">{word}</span>
                            ))}
                        </span>
                    </p>
                </div>
            </div>

            {/* WHO IT'S FOR */}
            <div className="py-24 md:py-32 px-6 max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <div className="ow-fade-anim font-mono text-[10px] md:text-xs tracking-widest text-[#F59E0B] uppercase mb-4">BUILT FOR</div>
                    <h2 className="ow-fade-anim text-3xl md:text-5xl font-bold text-white tracking-tight">Is Owo Mi right for you?</h2>
                </div>

                <div className="ow-cards-container grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Card */}
                    <div className="ow-card-anim group bg-[#1A1A1A] rounded-[2rem] p-10 md:p-12 border border-[#F59E0B]/30 hover:border-[#F59E0B] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(245,158,11,0.05)]">
                        <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/5 pb-6">Perfect for</h3>
                        <ul className="space-y-4">
                            {["Nigerian SMBs and retail shops", "Freelancers and independent contractors", "Service businesses managing client payments", "Operators who want a professional paper trail", "Those working in low-connectivity areas"].map((item, i) => (
                                <li key={i} className="flex gap-4 text-[#CCCCCC]">
                                    <span className="text-[#F59E0B] shrink-0">—</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right Card */}
                    <div className="ow-card-anim group bg-[#111111] rounded-[2rem] p-10 md:p-12 border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1">
                        <h3 className="text-2xl font-bold text-[#888888] mb-8 border-b border-white/5 pb-6">Not designed for</h3>
                        <ul className="space-y-4">
                            {["Large enterprise accounting", "Multi-entity corporate finance", "International or multi-currency operations", "Complex inventory management", "Direct POS terminal integration"].map((item, i) => (
                                <li key={i} className="flex gap-4 text-[#666666]">
                                    <span className="opacity-50 shrink-0">—</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* WAITLIST CTA */}
            <div className="py-16 md:py-32 px-6 max-w-4xl mx-auto">
                <div className="ow-fade-anim bg-[#1A1A1A] rounded-[3rem] p-12 md:p-20 border border-white/5 hover:border-[#F59E0B]/20 transition-colors duration-500 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#F59E0B]/50 to-transparent opacity-50"></div>

                    <h2 className="text-4xl md:text-6xl font-sans font-bold text-white mb-6 tracking-tight">Be first when we launch.</h2>
                    <p className="text-lg text-[#888888] mb-12 max-w-xl mx-auto">Join the exclusive early access list for Nigerian business owners ready to upgrade their operations.</p>

                    {!isSubmitted ? (
                        <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto relative z-10">
                            <input
                                type="email"
                                placeholder="Enter your email to join waitlist"
                                className="flex-1 bg-[#0D0D0D] border border-white/10 rounded-full px-8 py-5 text-white focus:outline-none focus:border-[#F59E0B]/50 transition-colors placeholder:text-[#666666]"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group relative overflow-hidden px-10 py-5 bg-[#F59E0B] text-[#0A0A0A] font-bold rounded-full transition-transform duration-300 hover:scale-[1.03] active:scale-95 shrink-0 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
                                style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
                            >
                                <span className="relative z-10">{isSubmitting ? "Joining..." : "Join Waitlist"}</span>
                                {!isSubmitting && <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>}
                            </button>
                        </form>
                    ) : (
                        <div className="inline-flex items-center justify-center gap-3 bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] px-8 py-5 rounded-full">
                            <ShieldCheck size={20} />
                            <span className="font-bold">You're on the list! We'll notify you when early access opens.</span>
                        </div>
                    )}

                    <div className="mt-8 text-[10px] md:text-xs font-mono text-[#666666] tracking-widest uppercase">
                        No spam. Just one email when we launch.
                    </div>
                </div>
            </div>

            {/* BOTTOM CROSS-LINK STRIP */}
            <div className="pt-8 pb-16 md:pb-24 px-6 border-t border-white/5 text-center bg-[#111111]">
                <div className="font-mono text-[10px] tracking-widest text-[#666666] uppercase mb-8 mt-16">
                    ALSO FROM CAREBOT AI
                </div>
                <div className="flex flex-col md:flex-row justify-center items-stretch gap-4 max-w-3xl mx-auto">

                    <Link href="/products/naijfleet" className="flex-1 group bg-[#1A1A1A] p-6 rounded-[1.5rem] border border-white/5 hover:border-[#E8533A]/30 transition-all duration-200 hover:-translate-y-1 flex flex-col items-start text-left">
                        <div className="w-10 h-10 bg-[#0D0D0D] rounded-xl flex items-center justify-center border border-white/5 mb-4 group-hover:border-[#E8533A]/30 transition-colors">
                            <Navigation className="text-[#E8533A]" size={16} />
                        </div>
                        <h4 className="text-white font-bold mb-1 group-hover:text-[#E8533A] transition-colors">NaijFleet</h4>
                        <p className="text-[#888888] text-sm mb-4 line-clamp-1">Fleet visibility for operators who mean business.</p>
                        <span className="mt-auto text-xs font-bold text-white flex items-center gap-1 group-hover:gap-2 transition-all">View <ArrowLeft className="w-3 h-3 rotate-180" /></span>
                    </Link>

                    <Link href="/products/wellness" className="flex-1 group bg-[#1A1A1A] p-6 rounded-[1.5rem] border border-white/5 hover:border-[#22C55E]/30 transition-all duration-200 hover:-translate-y-1 flex flex-col items-start text-left">
                        <div className="w-10 h-10 bg-[#0D0D0D] rounded-xl flex items-center justify-center border border-white/5 mb-4 group-hover:border-[#22C55E]/30 transition-colors">
                            <HeartPulse className="text-[#22C55E]" size={16} />
                        </div>
                        <h4 className="text-white font-bold mb-1 group-hover:text-[#22C55E] transition-colors">Naija Wellness Hub</h4>
                        <p className="text-[#888888] text-sm mb-4 line-clamp-1">Connecting Nigerians to care that actually shows up.</p>
                        <span className="mt-auto text-xs font-bold text-white flex items-center gap-1 group-hover:gap-2 transition-all">View <ArrowLeft className="w-3 h-3 rotate-180" /></span>
                    </Link>

                </div>
            </div>

        </div>
    );
}
