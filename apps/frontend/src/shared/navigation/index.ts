// Public entry point for the app-wide navigation header, rendered once in
// RootLayout so every page has a consistent way back to the home page.
export { AppHeader } from './AppHeader';
// Lets a page set the title shown in the app header bar.
export { AppHeaderTitleProvider, useSetAppHeaderTitle } from './AppHeaderTitle';
// Shared navigate-away confirmation: lets a feature register an
// unsaved-changes guard message, and lets any in-app `Link` (e.g. the
// header's home link) check/confirm against it before navigating away.
export {
  NavigationGuardProvider,
  useNavigationGuard,
  useSetNavigationGuardMessage,
} from './NavigationGuard';
