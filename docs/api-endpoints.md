# API Endpoint Reference

This is a story-derived index of every explicitly specified endpoint across the story
files under [docs/stories/](stories/) (see [docs/stories/README.md](stories/README.md)
for the full index). The OpenAPI specification is the implementation source of truth;
update this reference when a story adds, removes, or changes a route.

## Conventions

- Request and response contracts are OpenAPI-documented. JSON is the default request
  format unless an endpoint below specifies another content type.
- Validation, conflict, and other failures use Problem Details JSON responses.

## Service

| Method | Path      | Description                                                                                     |
| ------ | --------- | ----------------------------------------------------------------------------------------------- |
| `GET`  | `/health` | Returns `200 OK` with the JSON health response used to verify frontend-to-backend connectivity. |
