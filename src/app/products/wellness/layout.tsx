import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Naija Wellness Hub',
    description: 'Intelligently connecting patients across Nigeria to verified local health networks without friction.',
};

export default function WellnessLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
