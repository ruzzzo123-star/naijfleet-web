import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Owo Mi',
    description: 'The progressive invoice and quotes progressive web app built specifically for Nigerian SMBs.',
};

export default function OwoMiLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
