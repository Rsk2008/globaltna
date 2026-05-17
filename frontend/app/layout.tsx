import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'GlobalTNA — Service Request Board',
  description: 'Post and browse home service requests',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ minHeight: '100vh', background: '#f7f7fb' }}>
        <header style={{
          background: '#1a1a2e',
          borderBottom: '3px solid #e94560',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}>
          <div style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '0 24px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <Link href="/" style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: '1.4rem',
              color: '#ffffff',
              textDecoration: 'none',
              letterSpacing: '-0.5px',
            }}>
              Global<span style={{ color: '#e94560' }}>TNA</span>
            </Link>
            <Link href="/jobs/new" style={{
              background: '#e94560',
              color: '#ffffff',
              fontFamily: 'Syne, sans-serif',
              fontWeight: 600,
              fontSize: '0.875rem',
              padding: '10px 20px',
              borderRadius: '8px',
              textDecoration: 'none',
            }}>
              + Post a Request
            </Link>
          </div>
        </header>
        <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
          {children}
        </main>
        <footer style={{
          textAlign: 'center',
          padding: '32px',
          color: '#6b6b8a',
          fontSize: '0.8rem',
          borderTop: '1px solid #e8e8f0',
          marginTop: '60px',
        }}>
          © 2026 GlobalTNA — Mini Service Request Board
        </footer>
      </body>
    </html>
  );
}
