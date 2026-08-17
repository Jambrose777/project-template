'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

// The app header's title state: the current page's title text, plus an
// optional short badge shown next to it (e.g. a status like "Locked" or
// "Draft"). Bundled into one state object - rather than two separate
// contexts - since both are always set/cleared together by the same route
// and read together by the header.
interface AppHeaderTitleState {
  title: string | null;
  badge: string | null;
}

const DEFAULT_STATE: AppHeaderTitleState = { title: null, badge: null };

// Lets a page set the title shown in the persistent app header bar instead
// of (or in addition to) an in-page heading. The provider wraps both the
// header and the routed page in the root layout so a nested client
// component can set the title and the header can read it.
interface AppHeaderTitleContextValue {
  state: AppHeaderTitleState;
  setState: (next: AppHeaderTitleState) => void;
}

const AppHeaderTitleContext = createContext<AppHeaderTitleContextValue>({
  state: DEFAULT_STATE,
  setState: () => {},
});

export function AppHeaderTitleProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppHeaderTitleState>(DEFAULT_STATE);
  // Stable setter so `useSetAppHeaderTitle`'s effect isn't re-run every
  // render.
  const setStateStable = useCallback((next: AppHeaderTitleState) => setState(next), []);
  const value = useMemo(() => ({ state, setState: setStateStable }), [state, setStateStable]);
  return <AppHeaderTitleContext.Provider value={value}>{children}</AppHeaderTitleContext.Provider>;
}

// Read by the app header to display the current page's title (and its
// badge, if any).
export function useAppHeaderTitle(): AppHeaderTitleState {
  return useContext(AppHeaderTitleContext).state;
}

// Sets the app header's title to `title` (and its optional badge text)
// while the calling component is mounted, clearing both back to the
// default on unmount or when `title` becomes null.
export function useSetAppHeaderTitle(title: string | null, badge: string | null = null): void {
  const { setState } = useContext(AppHeaderTitleContext);
  useEffect(() => {
    setState({ title, badge });
    return () => setState(DEFAULT_STATE);
  }, [title, badge, setState]);
}
