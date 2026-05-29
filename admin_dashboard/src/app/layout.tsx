import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NewsFlow Admin Dashboard',
  description: 'NewsFlow content management and analytics portal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased">{children}</body>
    </html>
  );
}
