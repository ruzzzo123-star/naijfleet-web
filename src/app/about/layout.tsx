import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About',
    description: 'Learn about CareBot AI, our mission, and our approach to building intelligent tools for African businesses.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
