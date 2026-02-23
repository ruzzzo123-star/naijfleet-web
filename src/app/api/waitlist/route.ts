import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis =
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
        ? new Redis({
            url: process.env.UPSTASH_REDIS_REST_URL,
            token: process.env.UPSTASH_REDIS_REST_TOKEN,
        })
        : null;

export async function POST(req: Request) {
    if (!redis) {
        return NextResponse.json(
            { error: "Redis not configured" },
            { status: 500 }
        );
    }

    try {
        const body = await req.json();
        const { email, source } = body;

        if (!email || !email.includes("@")) {
            return NextResponse.json(
                { error: "Valid email is required" },
                { status: 400 }
            );
        }

        // 1. Add to a unique Set so we don't store duplicates unnecessarily
        const added = await redis.sadd("waitlist_emails", email);

        if (added) {
            // 2. If it's a new email, push a detailed entry into a List for easy export
            const entry = {
                email,
                source: source || "unknown",
                joinedAt: new Date().toISOString(),
            };
            await redis.lpush("waitlist_entries", JSON.stringify(entry));
        }

        return NextResponse.json({ success: true, message: "Joined waitlist successfully" });

    } catch (error) {
        console.error("Waitlist error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
