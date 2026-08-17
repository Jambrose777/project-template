export const DEFAULT_BACKEND_HOST = '127.0.0.1';
export const DEFAULT_BACKEND_PORT = 3001;
export const DEFAULT_BACKEND_ORIGIN = `http://${DEFAULT_BACKEND_HOST}:${DEFAULT_BACKEND_PORT}`;
// The packaged desktop app's main process reuses this fixed default when
// picking a free port for its bundled `next start` child process (falling
// back to another available port if it's already taken), the same way the
// backend already does with `DEFAULT_BACKEND_PORT`.
export const DEFAULT_FRONTEND_PORT = 3000;
export const DEFAULT_FRONTEND_ORIGIN = `http://localhost:${DEFAULT_FRONTEND_PORT}`;
export const DEFAULT_APPLICATION_DATA_DIRECTORY = '.data';
export const DEFAULT_DATABASE_FILENAME = 'project-template.sqlite';

// How long a "saved" save-status toast remains visible before it auto-dismisses.
export const SAVED_TOAST_DURATION_MS = 3000;

// Timing for the shared loading component. A pending request only shows the
// spinner after it has been pending this long, avoiding a flash of loading
// state for fast requests.
export const LOADING_INDICATOR_DELAY_MS = 200;

// Once shown, the loading indicator stays visible for at least this long
// before loaded content can replace it, avoiding a flicker when a request
// settles just after the indicator appears.
export const LOADING_INDICATOR_MIN_DURATION_MS = 300;

// How long a completed mutation's outcome (keyed by a client-generated
// idempotency key) is retained so a retried request replays the original
// outcome instead of repeating the mutation.
export const MUTATION_IDEMPOTENCY_RETENTION_MS = 86_400_000; // 24 hours

// Default local-only state directory name, resolved relative to the same
// root as `DEFAULT_APPLICATION_DATA_DIRECTORY` for a plain (non-Electron)
// backend run. In the packaged desktop app this is always
// `app.getPath('userData')` instead (see
// apps/desktop/src/processes/backendProcess.ts) - a fixed, never-cloud-
// synced location - kept distinct from the user-configurable
// `APP_DATA_DIRECTORY`, which can be repointed at a cloud-sync client's
// folder. Backup snapshots and nothing else live here; the sync marker
// file below is deliberately NOT here, since it needs to be visible to
// other laptops via the synced folder instead.
export const DEFAULT_LOCAL_STATE_DIRECTORY = '.local-state';

// The sync marker file's name, written into the (possibly cloud-synced)
// application data directory to record which machine last opened the app
// and when - the signal used to warn a user opening the same directory
// from a different machine shortly afterward.
export const SYNC_MARKER_FILENAME = '.sync-lock.json';

// How often the running application refreshes its own sync marker file
// while open, in addition to once right after its database opens
// successfully - keeps a still-open instance's marker looking "recent" to
// another laptop that might try to open the same directory concurrently.
export const SYNC_MARKER_REFRESH_INTERVAL_MS = 60_000; // 1 minute

// A sync marker naming a different machine is only surfaced as a
// "may still be syncing" warning when it's newer than this; an older
// marker is assumed to be a genuinely finished previous session rather
// than one that might still be mid-sync.
export const SYNC_MARKER_RECENT_THRESHOLD_MS = 300_000; // 5 minutes

// How many timestamped backup snapshots are retained in the local backups
// folder before the oldest ones are pruned, bounding disk usage the same
// way `MAX_RETAINED_MIGRATION_BACKUPS` already does for pre-migration
// backups (apps/backend/src/database/client.ts).
export const MAX_RETAINED_BACKUP_SNAPSHOTS = 5;
