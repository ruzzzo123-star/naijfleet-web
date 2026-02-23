"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Bot } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type Message = {
    role: "user" | "assistant";
    content: string;
};

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [showNudge, setShowNudge] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Hi! I'm Ruzzo, your CareBot AI assistant. How can I help you today?" }
    ]);
    const [input, setInput] = useState("");

    // Show engagement nudge after 5 seconds of inactivity
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isOpen) setShowNudge(true);
        }, 5000);
        return () => clearTimeout(timer);
    }, [isOpen]);

    // Hide nudge when opened
    useEffect(() => {
        if (isOpen) setShowNudge(false);
    }, [isOpen]);
    const [isLoading, setIsLoading] = useState(false);

    const widgetRef = useRef<HTMLDivElement>(null);
    const drawerRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom whenever messages update
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen]);

    // Animate Drawer open/close
    useGSAP(() => {
        if (isOpen) {
            gsap.fromTo(drawerRef.current,
                { y: 50, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power3.out", display: "flex" }
            );
        } else {
            gsap.to(drawerRef.current, {
                y: 50, opacity: 0, scale: 0.95, duration: 0.3, ease: "power2.in", display: "none"
            });
        }
    }, [isOpen]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages(prev => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            // Prepare messages for Anthropic (api requires 'user' and 'assistant' roles)
            const apiMessages = [...messages, { role: "user", content: userMessage }].filter(m => m.role === "user" || m.role === "assistant");

            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: apiMessages }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessages(prev => [...prev, { role: "assistant", content: data.content }]);
            } else if (response.status === 429) {
                setMessages(prev => [...prev, { role: "assistant", content: "You're chatting a bit too fast! Please wait a minute before sending another message. ⏳" }]);
            } else {
                setMessages(prev => [...prev, { role: "assistant", content: data.error || "Sorry, I had trouble connecting. Please try again." }]);
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, { role: "assistant", content: "An error occurred. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div ref={widgetRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">

            {/* Chat Drawer */}
            <div
                ref={drawerRef}
                className="hidden relative w-full sm:w-[380px] h-[500px] max-h-[80vh] bg-surface border border-white/10 rounded-2xl flex-col overflow-hidden shadow-2xl"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 bg-[#0D0D0D] border-b border-white/10 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center">
                            <Bot size={18} />
                        </div>
                        <div>
                            <h3 className="text-white font-medium text-sm">Ruzzo AI Assistant</h3>
                            <p className="text-success text-xs flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-success"></span> Online
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-muted hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-primary/50 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${msg.role === "user"
                                ? "bg-accent text-white rounded-br-sm"
                                : "bg-white/10 text-white rounded-bl-sm border border-white/5"
                                }`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white/10 border border-white/5 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: "0ms" }}></span>
                                <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: "150ms" }}></span>
                                <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: "300ms" }}></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-3 bg-[#0D0D0D] border-t border-white/10 shrink-0">
                    <form onSubmit={handleSend} className="relative flex items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me anything..."
                            className="w-full bg-surface border border-white/10 text-white px-4 py-3 rounded-xl pr-12 text-sm focus:outline-none focus:border-accent transition-colors"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            className="absolute right-2 p-1.5 bg-accent text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent/90 transition-colors"
                        >
                            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                        </button>
                    </form>
                </div>
            </div>

            {/* Toggle Button & Nudge Tooltip */}
            <div className="relative flex items-center justify-end">
                {/* Nudge Tooltip */}
                <div className={`absolute right-full mr-4 bg-white text-black text-sm font-medium py-2 px-4 rounded-xl shadow-lg whitespace-nowrap transition-all duration-500 origin-right ${showNudge ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-95 translate-x-4 pointer-events-none"}`}>
                    Hi, I'm Ruzzo. Need help finding the right tool? 👋
                    {/* Little triangle pointer */}
                    <div className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-3 h-3 bg-white rotate-45"></div>
                </div>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-14 h-14 bg-accent text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300 relative group"
                >
                    <div className="absolute inset-0 rounded-full bg-accent opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-300"></div>
                    {isOpen ? <X size={24} className="relative z-10" /> : <MessageCircle size={24} className="relative z-10" />}
                </button>
            </div>

        </div>
    );
}
