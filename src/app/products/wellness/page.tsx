"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, Navigation, Wallet, ShieldCheck, HeartPulse, BrainCircuit, Stethoscope, Pill } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function WellnessHubPage() {
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
                    body: JSON.stringify({ email, source: "wellness-hub" }),
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
            gsap.from(".wh-hero-anim", {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.08,
                ease: "power3.out"
            });

            // Standard fade up for sections
            gsap.utils.toArray(".wh-fade-anim").forEach((el) => {
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
            gsap.from(".wh-card-anim", {
                scrollTrigger: {
                    trigger: ".wh-cards-container",
                    start: "top 80%",
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out"
            });

            // Alternating Feature slides
            gsap.utils.toArray(".wh-feature-slide").forEach((el) => {
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
            const words = gsap.utils.toArray(".wh-phil-word");
            if (words.length > 0) {
                gsap.from(words, {
                    scrollTrigger: {
                        trigger: ".wh-philosophy-strip",
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

    const philStatement1 = "Most health platforms focus on: digitising existing systems for users who already have access.".split(" ");
    const philStatement2 = "We focus on: ".split(" ");
    const philStatement3 = "reaching the people the system forgot.".split(" ");

    return (
        <div ref={containerRef} className="bg-[#0D0D0D] overflow-hidden selection:bg-[#22C55E]/30 selection:text-white">

            {/* HERO SECTION */}
            <div className="relative pt-[120px] md:pt-[160px] pb-16 md:pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
                {/* Radial Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#22C55E]/15 blur-[100px] md:blur-[120px] rounded-full pointer-events-none -z-10"></div>

                <div className="wh-hero-anim text-[10px] md:text-xs font-mono tracking-widest text-[#888888] mb-6 uppercase">
                    CAREBOT AI → PRODUCTS → NAIJA WELLNESS HUB
                </div>

                <div className="wh-hero-anim inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 mb-8">
                    <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></div>
                    <span className="text-[#22C55E] text-[10px] md:text-xs font-mono uppercase tracking-widest">Coming Soon</span>
                </div>

                <h1 className="wh-hero-anim text-4xl md:text-7xl font-sans font-bold text-white tracking-tight leading-tight mb-8 max-w-4xl">
                    Healthcare that actually <br className="hidden md:block" />
                    <span className="font-drama italic text-[#22C55E] font-light">shows up.</span>
                </h1>

                <div className="wh-hero-anim flex flex-wrap justify-center gap-3 mt-4">
                    <div className="bg-[#1A1A1A] rounded-full px-4 md:px-5 py-2 border border-white/5 font-mono text-[10px] md:text-xs text-[#E0E0E0] uppercase tracking-wider">
                        Bank-level Encryption
                    </div>
                    <div className="bg-[#1A1A1A] rounded-full px-4 md:px-5 py-2 border border-white/5 font-mono text-[10px] md:text-xs text-[#E0E0E0] uppercase tracking-wider">
                        NDPC Compliant
                    </div>
                </div>
            </div>

            {/* THE PROBLEM */}
            <div className="py-16 md:py-32 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="wh-fade-anim font-mono text-[10px] md:text-xs tracking-widest text-[#22C55E] uppercase mb-4">THE PROBLEM</div>
                    <h2 className="wh-fade-anim text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">The system forgot the patient.</h2>
                </div>

                <div className="wh-cards-container grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { stat: "01", label: "Fragmented Care", desc: "Information is scattered across WhatsApp groups and outdated directories." },
                        { stat: "02", label: "Fake Drugs", desc: "No quick, reliable way to verify standard medication before consumption." },
                        { stat: "03", label: "Missed Windows", desc: "By the time you finally find the right doctor, the critical window has often passed." }
                    ].map((item, i) => (
                        <div key={i} className="wh-card-anim group bg-[#1A1A1A] rounded-[2rem] p-8 md:p-10 border border-white/5 hover:border-[#22C55E]/30 transition-all duration-300 hover:-translate-y-2">
                            <div className="text-4xl md:text-5xl font-drama italic text-white/20 mb-6 group-hover:text-[#22C55E]/40 transition-colors">{item.stat}</div>
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
                    <div className="order-2 lg:order-1 wh-fade-anim">
                        <div className="font-mono text-[10px] md:text-xs tracking-widest text-[#22C55E] uppercase mb-4">24/7 SUPPORT</div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">AI Health <br /><span className="text-[#888888]">Companion.</span></h2>
                        <p className="text-lg text-[#888888] leading-relaxed mb-8">
                            Stop asking Google and getting terrified. Chat with an AI trained on Nigerian medical context (malaria, typhoid, local diets) that speaks English and Pidgin. Get immediate guidance on whether to treat at home or see a professional.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-[#E0E0E0]"><div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></div> Speaks Nigerian Pidgin & English</li>
                            <li className="flex items-center gap-3 text-[#E0E0E0]"><div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></div> Local disease context awareness</li>
                            <li className="flex items-center gap-3 text-[#E0E0E0]"><div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></div> Triage & emergency detection</li>
                        </ul>
                    </div>
                    <div className="order-1 lg:order-2 wh-feature-slide slide-right bg-[#1A1A1A] border border-white/5 border-l-4 border-l-[#22C55E] rounded-[2rem] lg:rounded-[3rem] aspect-square lg:aspect-[4/5] p-8 relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.05)_0%,transparent_70%)]"></div>
                        <BrainCircuit className="text-white/10 w-48 h-48" />
                    </div>
                </div>

                {/* Feature 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    <div className="order-1 lg:order-1 wh-feature-slide slide-left bg-[#1A1A1A] border border-white/5 border-r-4 border-r-[#22C55E] rounded-[2rem] lg:rounded-[3rem] aspect-square lg:aspect-[4/5] p-8 relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.05)_0%,transparent_70%)]"></div>
                        <Stethoscope className="text-white/10 w-48 h-48" />
                    </div>
                    <div className="order-2 lg:order-2 wh-fade-anim">
                        <div className="font-mono text-[10px] md:text-xs tracking-widest text-[#22C55E] uppercase mb-4">MEDICAL ACCESS</div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">Access real doctors <br /><span className="text-[#888888]">instantly.</span></h2>
                        <p className="text-lg text-[#888888] leading-relaxed mb-8">
                            Skip the hospital waiting rooms. Browse verified Nigerian doctors, read reviews, and book telemedicine checkups or local home visits directly from your phone. Transparent pricing, no hidden fees.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-[#E0E0E0]"><div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></div> Verified professional network</li>
                            <li className="flex items-center gap-3 text-[#E0E0E0]"><div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></div> In-app video consultations</li>
                            <li className="flex items-center gap-3 text-[#E0E0E0]"><div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></div> Book physical home visits</li>
                        </ul>
                    </div>
                </div>

                {/* Feature 3 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    <div className="order-2 lg:order-1 wh-fade-anim">
                        <div className="font-mono text-[10px] md:text-xs tracking-widest text-[#22C55E] uppercase mb-4">MEDICATION SAFETY</div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">Verified pharmacy <br /><span className="text-[#888888]">orders.</span></h2>
                        <p className="text-lg text-[#888888] leading-relaxed mb-8">
                            Fake drugs cost lives. Scan medicines using our built-in NAFDAC verifier. Upload prescriptions to find the cheapest, closest PCN-certified pharmacies, and get genuine medication delivered to your door.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-[#E0E0E0]"><div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></div> NAFDAC barcode scanner</li>
                            <li className="flex items-center gap-3 text-[#E0E0E0]"><div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></div> Prescription drop-off & delivery</li>
                            <li className="flex items-center gap-3 text-[#E0E0E0]"><div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></div> Real-time price comparisons</li>
                        </ul>
                    </div>
                    <div className="order-1 lg:order-2 wh-feature-slide slide-right bg-[#1A1A1A] border border-white/5 border-l-4 border-l-[#22C55E] rounded-[2rem] lg:rounded-[3rem] aspect-square lg:aspect-[4/5] p-8 relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.05)_0%,transparent_70%)]"></div>
                        <Pill className="text-white/10 w-48 h-48" />
                    </div>
                </div>

            </div>

            {/* PHILOSOPHY STRIP */}
            <div className="wh-philosophy-strip w-full bg-[#111111] py-24 md:py-40 relative overflow-hidden flex flex-col items-center justify-center border-y border-white/5 px-6">
                <div className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }}></div>
                <div className="relative z-10 max-w-4xl text-center text-2xl md:text-5xl font-sans font-bold text-white leading-tight md:leading-snug tracking-tight">
                    <p className="mb-6 md:mb-8 text-[#888888]">
                        {philStatement1.map((word, i) => (
                            <span key={`p1-${i}`} className="wh-phil-word inline-block mr-[0.3em]">{word}</span>
                        ))}
                    </p>
                    <p>
                        {philStatement2.map((word, i) => (
                            <span key={`p2-${i}`} className="wh-phil-word inline-block mr-[0.3em]">{word}</span>
                        ))}
                        <span className="text-[#22C55E]">
                            {philStatement3.map((word, i) => (
                                <span key={`p3-${i}`} className="wh-phil-word inline-block mr-[0.3em]">{word}</span>
                            ))}
                        </span>
                    </p>
                </div>
            </div>

            {/* WHO IT'S FOR */}
            <div className="py-24 md:py-32 px-6 max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <div className="wh-fade-anim font-mono text-[10px] md:text-xs tracking-widest text-[#22C55E] uppercase mb-4">BUILT FOR</div>
                    <h2 className="wh-fade-anim text-3xl md:text-5xl font-bold text-white tracking-tight">Is Wellness Hub right for you?</h2>
                </div>

                <div className="wh-cards-container grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Card */}
                    <div className="wh-card-anim group bg-[#1A1A1A] rounded-[2rem] p-10 md:p-12 border border-[#22C55E]/30 hover:border-[#22C55E] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(34,197,94,0.05)] flex flex-col items-start">
                        <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/5 pb-6 w-full">Perfect for</h3>
                        <ul className="space-y-4 mb-10 w-full">
                            {["Individuals seeking verified local healthcare", "Families managing care for multiple members", "Patients in underserved or semi-urban areas", "Diaspora members managing care for aging parents", "Those needing quick NAFDAC verifications"].map((item, i) => (
                                <li key={i} className="flex gap-4 text-[#CCCCCC]">
                                    <span className="text-[#22C55E] shrink-0">—</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Call to Action inserted directly inside the card */}
                        <a href="#waitlist" className="mt-auto group/btn flex items-center justify-center gap-2 px-6 py-3 bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20 hover:bg-[#22C55E] hover:text-[#0A0A0A] font-bold rounded-full transition-all duration-300 w-full sm:w-auto self-center lg:self-start">
                            <span>Get Early Access</span>
                            <span className="group-hover/btn:translate-x-1 transition-transform inline-block">→</span>
                        </a>
                    </div>

                    {/* Right Card */}
                    <div className="wh-card-anim group bg-[#111111] rounded-[2rem] p-10 md:p-12 border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1">
                        <h3 className="text-2xl font-bold text-[#888888] mb-8 border-b border-white/5 pb-6">Not designed for</h3>
                        <ul className="space-y-4">
                            {["Emergency or critical care situations", "Complex hospital infrastructure management", "International healthcare access and medical tourism", "Replacing immediate physical surgical care"].map((item, i) => (
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
            <div id="waitlist" className="py-16 md:py-32 px-6 max-w-4xl mx-auto scroll-mt-24">
                <div className="wh-fade-anim bg-[#1A1A1A] rounded-[3rem] p-12 md:p-20 border border-white/5 hover:border-[#22C55E]/20 transition-colors duration-500 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#22C55E]/50 to-transparent opacity-50"></div>

                    <h2 className="text-4xl md:text-6xl font-sans font-bold text-white mb-6 tracking-tight">Be first when we launch.</h2>
                    <p className="text-lg text-[#888888] mb-12 max-w-xl mx-auto">Join the exclusive early access list to get priority access to verified doctors and AI health tracking.</p>

                    {!isSubmitted ? (
                        <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto relative z-10">
                            <input
                                type="email"
                                placeholder="Enter your email to join waitlist"
                                className="flex-1 bg-[#0D0D0D] border border-white/10 rounded-full px-8 py-5 text-white focus:outline-none focus:border-[#22C55E]/50 transition-colors placeholder:text-[#666666]"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group relative overflow-hidden px-10 py-5 bg-[#22C55E] text-[#0A0A0A] font-bold rounded-full transition-transform duration-300 hover:scale-[1.03] active:scale-95 shrink-0 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
                                style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
                            >
                                <span className="relative z-10">{isSubmitting ? "Joining..." : "Join Waitlist"}</span>
                                {!isSubmitting && <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>}
                            </button>
                        </form>
                    ) : (
                        <div className="inline-flex items-center justify-center gap-3 bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] px-8 py-5 rounded-full">
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
