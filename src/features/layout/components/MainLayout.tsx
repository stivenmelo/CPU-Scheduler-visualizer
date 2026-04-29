import type { ReactNode } from 'react';
import { Header } from './Header';

interface Props { children: ReactNode }

export function MainLayout({ children }: Props) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      <Header />
      <main style={{ flex: 1 }}>
        {children}
      </main>
    </div>
  );
}
