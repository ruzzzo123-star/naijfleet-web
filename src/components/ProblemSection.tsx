"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ProblemSection() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        });

        tl.from(".problem-text", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out"
        });

        tl.from(".problem-card", {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out"
        }, "-=0.4");
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-32 md:py-40 px-6 relative bg-primary">
            <div className="max-w-7xl mx-auto">
                <div className="max-w-2xl mb-16">
                    <h2 className="problem-text text-4xl md:text-5xl font-sans font-bold tracking-tight text-white mb-6 leading-tight">
                        Imported software creates
                        <br /> <span className="text-muted font-normal">unnecessary friction.</span>
                    </h2>
                    <p className="problem-text text-lg text-muted leading-relaxed">
                        Using tools built for global enterprises in emerging markets means paying for features you don't need while fighting the environment you operate in.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="problem-card p-8 rounded-[2rem] bg-surface border border-white/5 hover:-translate-y-[1px] transition-transform duration-300 group">
                        <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center mb-12 group-hover:scale-110 group-hover:bg-red-500/20 transition-all duration-300">
                            <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Disconnected Systems</h3>
                        <p className="text-muted text-sm leading-relaxed">
                            Businesses struggle to find cohesive tools that speak their local language and adapt to their context.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="problem-card p-8 rounded-[2rem] bg-surface border border-white/5 hover:-translate-y-[1px] transition-transform duration-300 group">
                        <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-12 group-hover:scale-110 group-hover:bg-orange-500/20 transition-all duration-300">
                            <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Unreliable Infrastructure</h3>
                        <p className="text-muted text-sm leading-relaxed">
                            Applications built strictly for high-speed internet fail when connectivity drops or power fluctuates.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="problem-card p-8 rounded-[2rem] bg-surface border border-white/5 hover:-translate-y-[1px] transition-transform duration-300 group">
                        <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-12 group-hover:scale-110 group-hover:bg-yellow-500/20 transition-all duration-300">
                            <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[14px] border-l-transparent border-r-transparent border-b-yellow-500"></div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Costly Overhead</h3>
                        <p className="text-muted text-sm leading-relaxed">
                            Overpaying for massive SaaS suites when simple, powerful, and targeted solutions are needed.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
