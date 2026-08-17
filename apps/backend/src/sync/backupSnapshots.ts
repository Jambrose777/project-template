import { existsSync, mkdirSync, readdirSync, statSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';

import { MAX_RETAINED_BACKUP_SNAPSHOTS } from '@project-template/shared';
import AdmZip from 'adm-zip';

// Backup snapshots are a plain filesystem-level copy of the SQLite database
// file plus the application's files directory (see paths.ts), zipped
// together - no domain knowledge required. They always land under the
// caller's `localStateDirectory` - never inside the (possibly cloud-synced)
// application data directory - so a bad sync or a "start fresh anyway"
// choice always has a same-machine, non-synced fallback to recover from.
const BACKUPS_SUBDIRECTORY = 'backups';
const BACKUP_FILENAME_PREFIX = 'backup-';

export interface CreateBackupSnapshotOptions {
  databaseFile: string;
  filesDirectory: string;
  localStateDirectory: string;
}

function backupsDirectory(localStateDirectory: string): string {
  return join(localStateDirectory, BACKUPS_SUBDIRECTORY);
}

// Writes a timestamped snapshot into `localStateDirectory`, then prunes
// older snapshots beyond `MAX_RETAINED_BACKUP_SNAPSHOTS`. Called both right
// before the graceful-shutdown WAL checkpoint and before proceeding past
// either of the launch-time confirmation warnings (see server.ts) - both
// are moments where the data directory's contents are about to change in a
// way that's hard to undo if something's wrong.
export function createBackupSnapshot(options: CreateBackupSnapshotOptions): string {
  const { databaseFile, filesDirectory, localStateDirectory } = options;
  const directory = backupsDirectory(localStateDirectory);
  mkdirSync(directory, { recursive: true });

  // Colons aren't valid in Windows filenames, so the timestamp is
  // sanitized the same way `client.ts`'s pre-migration backups already are.
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const outputPath = join(directory, `${BACKUP_FILENAME_PREFIX}${timestamp}.zip`);

  const zip = new AdmZip();
  if (databaseFile !== ':memory:' && existsSync(databaseFile)) {
    zip.addLocalFile(databaseFile);
  }
  if (existsSync(filesDirectory)) {
    zip.addLocalFolder(filesDirectory, 'files');
  }
  zip.writeZip(outputPath);

  pruneOldBackupSnapshots(localStateDirectory);
  return outputPath;
}

// Deletes the oldest backup snapshots beyond the retention limit, keeping
// disk usage bounded the same way `MAX_RETAINED_MIGRATION_BACKUPS` already
// does for pre-migration backups (apps/backend/src/database/client.ts).
function pruneOldBackupSnapshots(localStateDirectory: string): void {
  const directory = backupsDirectory(localStateDirectory);
  if (!existsSync(directory)) return;

  const backups = readdirSync(directory)
    .filter((filename) => filename.startsWith(BACKUP_FILENAME_PREFIX) && filename.endsWith('.zip'))
    .map((filename) => {
      const filePath = join(directory, filename);
      return { filePath, mtimeMs: statSync(filePath).mtimeMs };
    })
    .sort((a, b) => b.mtimeMs - a.mtimeMs);

  for (const backup of backups.slice(MAX_RETAINED_BACKUP_SNAPSHOTS)) {
    unlinkSync(backup.filePath);
  }
}
