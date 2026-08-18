import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { ToastProvider } from '@/shared/feedback';
import { AppHeader, AppHeaderTitleProvider, NavigationGuardProvider } from '@/shared/navigation';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Project Template',
  description: 'A baseplate for spinning up new projects fast.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {/* Mounted once so every page can start/update save-status toasts
            through useSaveStatusToast. */}
        <ToastProvider>
          {/* Mounted above the header and routed pages so any in-app
              navigation (e.g. the header's home link) can guard against
              leaving while a feature further down the tree has unsaved
              changes. */}
          <NavigationGuardProvider>
            {/* Persistent header (every page) with a link back to the home
                page. The title provider wraps both the header and the routed
                page so a page (e.g. a binder view/edit page) can surface its
                title in the header bar. */}
            <AppHeaderTitleProvider>
              <AppHeader />
              {children}
            </AppHeaderTitleProvider>
          </NavigationGuardProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
