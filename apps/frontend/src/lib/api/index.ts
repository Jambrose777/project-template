// This module is the frontend's single entry point for talking to the
// backend REST API (OpenAPI-first, per `packages/api-contract`). Add new
// domain files here as the project grows and re-export them from this
// barrel, so call sites always import from `@/lib/api` rather than
// reaching into individual domain files directly.
export * from './client';
