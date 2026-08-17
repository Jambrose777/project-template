import Link from 'next/link';

// The template's starting home page. Replace this with your project's real
// landing page; /health and /settings remain as working examples of the
// backend-connectivity check and the desktop-only settings page.
export default function Home() {
  return (
    <main className="flex flex-col items-center gap-4 p-8">
      <h1>Project Template</h1>
      <p className="text-body text-neutral-100">
        Start building your project here. See{' '}
        <Link href="/health" className="underline">
          /health
        </Link>{' '}
        for a working backend-connectivity example.
      </p>
    </main>
  );
}
