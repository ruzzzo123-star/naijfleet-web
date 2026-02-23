"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Check, X } from "lucide-react";

export default function ComparisonSection() {
    const sectionRef = useRef<HTMLElement>(null);

    const comparisonData = [
        { feature: "One-off delivery", uber: true, naijfleet: false },
        { feature: "Fleet visibility (all drivers)", uber: false, naijfleet: true },
        { feature: "Dispatcher control", uber: false, naijfleet: true },
        { feature: "Multiple deliveries per driver", uber: false, naijfleet: true },
        { feature: "Proof of delivery", uber: false, naijfleet: true },
        { feature: "Customer updates", uber: false, naijfleet: true },
    ];

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
            }
        });

        tl.from(".comp-header", {
            y: 30, opacity: 0, duration: 0.8, ease: "power3.out"
        });

        tl.from(".comp-row", {
            x: -20, opacity: 0, duration: 0.5, stagger: 0.08, ease: "power3.out"
        }, "-=0.4");

        tl.from(".comp-footer", {
            y: 20, opacity: 0, duration: 0.6, ease: "power3.out"
        }, "-=0.2");
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="py-32 md:py-40 px-6 bg-primary">
            <div className="max-w-4xl mx-auto space-y-12">

                <div className="comp-header space-y-4">
                    <h2 className="text-4xl md:text-5xl font-sans font-bold tracking-tight text-white mb-4">
                        Why scale past <span className="text-muted font-normal">ride-hailing apps</span>
                    </h2>
                    <p className="text-lg text-muted leading-relaxed max-w-2xl">
                        Ride-hailing works for one-off tasks. NaijFleet is purpose-built for daily dispatch and logistics teams.
                    </p>
                </div>

                <div className="bg-surface border border-white/10 rounded-[2rem] overflow-hidden mt-8 shadow-2xl">
                    <div className="grid grid-cols-5 bg-[#0D0D0D]/50 backdrop-blur p-6 border-b border-white/10">
                        <div className="col-span-3 text-sm font-semibold text-muted uppercase tracking-wider">Feature</div>
                        <div className="col-span-1 text-center text-sm font-semibold text-muted uppercase tracking-wider">Ride-Hailing Apps</div>
                        <div className="col-span-1 text-center text-sm font-semibold text-white uppercase tracking-wider">NaijFleet</div>
                    </div>

                    <div className="divide-y divide-white/5">
                        {comparisonData.map((row, i) => (
                            <div
                                key={i}
                                className="comp-row grid grid-cols-5 p-6 items-center hover:bg-white/5 transition-colors duration-300"
                            >
                                <div className="col-span-3 font-medium text-white">{row.feature}</div>
                                <div className="col-span-1 flex justify-center">
                                    {row.uber ? (
                                        <Check className="w-6 h-6 text-muted" />
                                    ) : (
                                        <X className="w-6 h-6 text-accent/80" />
                                    )}
                                </div>
                                <div className="col-span-1 flex justify-center">
                                    {row.naijfleet ? (
                                        <Check className="w-6 h-6 text-success" />
                                    ) : (
                                        <X className="w-6 h-6 text-muted" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="comp-footer text-muted text-sm text-center pt-4">
                    Keep ride-hailing as a backup. Run your operation on NaijFleet for real control.
                </p>

            </div>
        </section>
    );
}
