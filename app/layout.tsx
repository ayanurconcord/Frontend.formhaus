import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FORMHAUS.STUDIO',
  description: 'Premium 3D printing, product design and fabrication studio.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
