'use client';

import { Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useAppHeaderTitle } from './AppHeaderTitle';
import { useNavigationGuard } from './NavigationGuard';

// A persistent top bar rendered once in the root layout (rather than per-page)
// so every page - including ones with no navigation of their own - always
// offers a consistent way back to the home page. Pages can also surface a
// title (and optional badge) here via `useSetAppHeaderTitle`.
export function AppHeader() {
  const { title, badge } = useAppHeaderTitle();
  const router = useRouter();
  const { isBlocked, confirmNavigation } = useNavigationGuard();

  function handleGuardedNavigate(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (!isBlocked) return;
    event.preventDefault();
    confirmNavigation(() => router.push(href));
  }

  return (
    <header className="relative flex items-center bg-surface px-6 py-4 shadow-panel">
      <Link
        href="/"
        onClick={(event) => handleGuardedNavigate(event, '/')}
        className="flex items-center gap-2 font-bold text-neutral-100 hover:brightness-110"
      >
        <Home className="size-5" />
        Project Template
      </Link>
      {/* The current page's title, centered in the bar independently of the
          home link's width. Absolutely positioned so it stays centered on
          the bar rather than being pushed by the link. */}
      {title && (
        <h1 className="pointer-events-none absolute left-1/2 flex -translate-x-1/2 items-center gap-3 text-subheading font-bold">
          {title}
          {badge && (
            <span className="inline-flex items-center gap-1 rounded-full bg-neutral-700 px-2 py-0.5 text-caption font-bold text-neutral-100">
              {badge}
            </span>
          )}
        </h1>
      )}
    </header>
  );
}
