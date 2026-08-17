# Data Types Reference

This is a story-derived inventory of the application's objects and properties, drawn
from the story files under [docs/stories/](stories/) (see
[docs/stories/README.md](stories/README.md) for the full index). It is not a database
schema or generated API type definition. The OpenAPI specification and the database
schema remain authoritative during implementation.

Fields marked **TBD** are required by planned behavior but do not yet have a settled
shape, name, or persistence contract in the relevant story file under
[docs/stories/](stories/).

## Shared Conventions

- Identifiers are backend-generated UUIDs unless stated otherwise.
- Timestamps are backend-managed UTC timestamps.
- User-facing backend failures use Problem Details JSON.

## Core Domain Objects

_No domain objects defined yet. Add each object as its own subsection as stories
introduce it._
