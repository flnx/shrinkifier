import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ThemeProvider } from './providers';
import { Nav } from '@/components/Nav';
import { Toaster } from '@/components/ui/toaster';
import { Footer } from '@/components/footer/Footer';
import '@/styles/globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Shrinkifier - Free Image Optimizer & Compressor',
  description: 'Optimize and compress images for free with Shrinkifier. Fast and efficient conversion. Change image formats easily - PNG to WEBP, JPEG to WEBP, and more. Reduce image size effortlessly!',
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased flex flex-col',
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <Nav />
          <main>{children}</main>
          <Toaster />
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
