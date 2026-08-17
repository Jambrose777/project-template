import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const backendDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export const migrationsDirectory = resolve(backendDirectory, 'drizzle');
export const openApiSpecificationPath = resolve(
  backendDirectory,
  '../../packages/api-contract/openapi.yaml',
);

// A general-purpose directory (nested under the configured application data
// directory) for any files a project needs to store outside the database -
// uploaded/generated attachments, exports, etc.
export function getFilesDirectory(applicationDataDirectory: string): string {
  return resolve(applicationDataDirectory, 'files');
}
