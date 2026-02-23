import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'NaijFleet',
    description: 'Fleet visibility and dispatch management simplified. Built specifically for Nigerian logistics businesses.',
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
