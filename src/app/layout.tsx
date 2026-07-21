import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Flowstate — Music Distribution & Streaming Platform',
  description:
    'Discover, stream, and purchase music from approved artists. Flowstate is the modern platform for music distribution and listening.',
  keywords: ['music', 'streaming', 'distribution', 'artists', 'albums', 'playlists'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
