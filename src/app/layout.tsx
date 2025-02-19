import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Cheat Sheet Board',
  description: 'Create printable cheat sheets',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-color-mode="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-stone-200 antialiased`}
      >
        <Theme
          // appearance="dark"
          hasBackground={false}
          accentColor="gray"
          grayColor="gray"
          panelBackground="translucent"
          scaling="100%"
          radius="medium"
        >
          {children}
        </Theme>
      </body>
    </html>
  );
}
