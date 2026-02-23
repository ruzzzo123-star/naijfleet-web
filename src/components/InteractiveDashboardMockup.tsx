"use client";

import { useState, useEffect } from "react";

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

export function InteractiveDashboardMockup() {
    const [activeId, setActiveId] = useState<number>(1);
    const [isClient, setIsClient] = useState(false);
    const [isOptimizing, setIsOptimizing] = useState(false);

    useEffect(() => {
        setIsClient(true);
        // Auto-cycle for effect if untouched
        const interval = setInterval(() => {
            setActiveId(prev => (prev === 1 ? 2 : prev === 2 ? 3 : 1));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    if (!isClient) return <div className="w-full h-[500px] bg-[#0A0A0A] rounded-[2rem] border border-white/5 animate-pulse"></div>;

    const getStatusColor = (status: string, glow: boolean = false) => {
        if (isOptimizing) return glow ? 'rgba(34, 197, 94, 0.2)' : '#22C55E'; // All green when optimizing
        switch (status) {
            case 'success': return glow ? 'rgba(34, 197, 94, 0.2)' : '#22C55E';
            case 'warning': return glow ? 'rgba(239, 68, 68, 0.2)' : '#EF4444';
            case 'idle': return glow ? 'rgba(255, 255, 255, 0.05)' : '#888888';
            default: return '#fff';
        }
    };

    const baseChartHeights = {
        1: [30, 60, 45, 80, 55, 40, 95],
        2: [80, 40, 70, 30, 90, 60, 40],
        3: [20, 30, 25, 40, 20, 35, 25]
    }[activeId] || [0, 0, 0, 0, 0, 0, 0];

    // Smooth out charts when optimizing
    const activeChartHeights = isOptimizing ? [60, 65, 70, 75, 80, 85, 95] : baseChartHeights;

    const handleOptimizeToggle = () => {
        setIsOptimizing(true);
        // Turn off after 4 seconds to simulate completion
        setTimeout(() => setIsOptimizing(false), 4000);
    };

    return (
        <div className="w-full max-w-5xl bg-[#0A0A0A] rounded-[2rem] border border-white/5 shadow-2xl font-mono select-none flex flex-col relative overflow-hidden text-left mx-auto transition-colors duration-1000" style={{ borderColor: isOptimizing ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255,255,255,0.05)' }}>
            {/* Top Bar */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/[0.02]">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-white/10"></div>
                    <div className="w-3 h-3 rounded-full bg-white/10"></div>
                    <div className="w-3 h-3 rounded-full bg-white/10"></div>
                </div>
                <div className="flex items-center gap-2 text-[10px] md:text-xs tracking-widest uppercase font-bold transition-colors duration-500" style={{ color: isOptimizing ? '#22C55E' : '#E8533A' }}>
                    <div className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_10px_currentColor] bg-current"></div>
                    {isOptimizing ? 'AI OPTIMIZATION ACTIVE' : 'SECURE UPLINK'}
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
                                            style={{ width: isOptimizing ? '100%' : node.topLineWidth, backgroundColor: isActive || isOptimizing ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.2)' }}></div>
                                        <div className={`h-1.5 rounded-full transition-all duration-700 ease-out delay-75`}
                                            style={{ width: isActive || isOptimizing ? '100%' : node.bottomLineWidth, backgroundColor: isActive || isOptimizing ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)' }}></div>
                                    </div>

                                    {/* Status Dot */}
                                    <div className="relative flex items-center justify-center shrink-0 w-8 h-8">
                                        {/* Glow Ring */}
                                        <div
                                            className="absolute inset-0 rounded-full transition-all duration-700 blur-md opacity-0 scale-50"
                                            style={{
                                                backgroundColor: getStatusColor(node.status),
                                                opacity: isActive || isOptimizing ? 0.4 : 0,
                                                transform: isActive || isOptimizing ? 'scale(2.5)' : 'scale(0.5)'
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

                    {/* Interactive Command Toggle */}
                    <button
                        onClick={handleOptimizeToggle}
                        disabled={isOptimizing}
                        className={`w-full py-3 rounded-xl border flex items-center justify-center gap-2 text-xs tracking-widest font-bold transition-all duration-300
                            ${isOptimizing
                                ? 'bg-[#22C55E]/10 border-[#22C55E]/30 text-[#22C55E] cursor-default'
                                : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:-translate-y-0.5 active:scale-95 cursor-pointer'
                            }
                        `}
                    >
                        {isOptimizing ? 'ROUTING...' : 'OPTIMIZE ROUTES'}
                        {!isOptimizing && <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse"></div>}
                    </button>

                    {/* Bottom Chart */}
                    <div className="h-24 bg-transparent border border-white/5 p-4 flex items-end justify-between gap-1.5 md:gap-3 overflow-hidden group rounded-xl">
                        {activeChartHeights.map((height, i) => (
                            <div
                                key={i}
                                className="w-full rounded-t-sm transition-all duration-1000 ease-in-out origin-bottom"
                                style={{
                                    height: `${height}%`,
                                    background: isOptimizing
                                        ? `linear-gradient(to top, #22C55E 0%, rgba(34,197,94,0.3) 100%)`
                                        : `linear-gradient(to top, #E8533A 0%, rgba(232,83,58,0.3) 100%)`,
                                    opacity: height > 60 ? 1 : 0.6
                                }}
                            ></div>
                        ))}
                    </div>
                </div>

                {/* Right Panel (Map/Grid) */}
                <div className="w-full md:w-[65%] rounded-[1.5rem] border border-white/5 relative overflow-hidden bg-[#0D0D0D] min-h-[300px]">

                    {/* Grid Pattern Background */}
                    <div className="absolute inset-0 opacity-[0.15] pointer-events-none transition-transform duration-3000 ease-in-out"
                        style={{
                            backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9IiNmZmYiLz4KPC9zdmc+')",
                            backgroundSize: '40px 40px',
                            backgroundPosition: isOptimizing ? '100px 100px' : 'center'
                        }}>
                    </div>

                    {/* Floating Map Pill */}
                    <div className="absolute top-6 left-6 md:left-8 bg-[#0A0A0A]/80 backdrop-blur-md border border-white/10 px-4 md:px-5 py-2.5 rounded-full flex items-center gap-3 z-30 shadow-2xl transition-colors duration-500">
                        <div className={`w-2 h-2 rounded-full shadow-[0_0_8px_currentColor] transition-colors duration-500`} style={{ color: isOptimizing ? '#22C55E' : '#E8533A', backgroundColor: isOptimizing ? '#22C55E' : '#E8533A' }}></div>
                        <div className="text-[9px] md:text-xs text-white uppercase tracking-widest leading-none">
                            GLOBAL MESH NETWORK <span className="text-white/30 mx-2 font-light">•</span> {isOptimizing ? 'Scan Active' : 'Routing Active'}
                        </div>
                    </div>

                    {/* Scanner Line (Visible during optimization) */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-[#22C55E] z-10 shadow-[0_0_20px_#22C55E] transition-all duration-[3000ms] ease-in-out ${isOptimizing ? 'translate-x-[800px] opacity-100' : '-translate-x-full opacity-0'}`}></div>

                    {/* Fades for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent pointer-events-none z-10 opacity-60"></div>

                    {/* Map Nodes */}
                    {nodes.map((node) => {
                        const isActive = activeId === node.id;
                        const isMainNode = node.id <= 3;

                        return (
                            <div
                                key={`map-${node.id}`}
                                className={`absolute transition-all duration-1000 ease-in-out z-20 ${isMainNode ? 'cursor-pointer' : 'pointer-events-none'} group`}
                                style={{
                                    left: `${node.x}%`,
                                    top: `${node.y}%`,
                                    transform: `translate(-50%, -50%) scale(${isActive || isOptimizing ? 1 : 0.8})`
                                }}
                            >
                                {/* Tooltip Overlays (Only for main nodes) */}
                                {isMainNode && (
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10 rounded-xl p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-y-2 group-hover:translate-y-0 z-50">
                                        <div className="flex justify-between items-center mb-2 pb-2 border-b border-white/10">
                                            <span className="text-xs text-white font-bold tracking-wider uppercase">Driver {node.id}</span>
                                            <span className="text-[9px] tracking-widest uppercase transition-colors duration-500" style={{ color: getStatusColor(node.status) }}>{isOptimizing ? 'Online' : node.status}</span>
                                        </div>
                                        <div className="space-y-1.5 text-[10px] text-[#888888]">
                                            <div className="flex justify-between"><span>Speed:</span> <span className="text-white">{isOptimizing ? '62 km/h' : (node.id === 2 ? '0 km/h' : '45 km/h')}</span></div>
                                            <div className="flex justify-between"><span>ETA:</span> <span className="text-white">{isOptimizing ? 'Optimal' : (node.id === 2 ? 'Delayed' : '12 mins')}</span></div>
                                        </div>
                                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0A0A0A]/90 border-r border-b border-white/10 rotate-45"></div>
                                    </div>
                                )}

                                {/* Invisible larger hit area for hover */}
                                <div className="absolute -inset-4 rounded-full" onClick={() => isMainNode && setActiveId(node.id)}></div>

                                {/* Outer Pulse Ring for Active Node */}
                                {(isActive || (isOptimizing && isMainNode)) && (
                                    <div
                                        className="absolute inset-0 rounded-full animate-ping opacity-20 pointer-events-none"
                                        style={{
                                            backgroundColor: getStatusColor(node.status),
                                            transform: 'scale(4)'
                                        }}
                                    ></div>
                                )}

                                {/* Static Translucent Glow Ring */}
                                {isMainNode && (
                                    <div
                                        className="absolute inset-0 rounded-full blur-[2px] opacity-30 transition-all duration-700 pointer-events-none"
                                        style={{
                                            backgroundColor: getStatusColor(node.status),
                                            transform: isActive || isOptimizing ? 'scale(3.5)' : 'scale(1.5)',
                                            border: `1px solid ${getStatusColor(node.status)}`
                                        }}
                                    ></div>
                                )}

                                {/* Inner Solid Dot */}
                                <div
                                    className="w-2.5 md:w-3 border-[1.5px] border-[#0D0D0D] h-2.5 md:h-3 rounded-full relative z-10 transition-colors duration-500 pointer-events-none"
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
            <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-full h-full blur-[100px] pointer-events-none -z-10 rounded-full transition-colors duration-1000" style={{ backgroundColor: isOptimizing ? 'rgba(34, 197, 94, 0.1)' : 'rgba(232, 83, 58, 0.05)' }}></div>
        </div>
    );
}
