# 5. PostgreSQL + Flyway for persistence; migrations as a standalone deployment step

Date: 2026-03-31

## Status

Accepted

## Context

The application requires a relational database. Schema evolution must be version-controlled
and reproducible. Two common approaches exist for running migrations:

1. **At application startup** (e.g. `spring.flyway.enabled=true`): simple to operate but
   couples the application process to schema changes, makes zero-downtime deployments harder,
   and can cause startup failures in environments where the DB is not yet ready.

2. **As a separate deployment step**: migrations run before the application starts, as an
   independent process. This requires schema changes to be backwards- and forwards-compatible
   with the running application version, but enables independent scaling and zero-downtime
   deployments.

The project already has `postgresql` and `testcontainer` (PostgreSQL) entries in
`gradle/libs.versions.toml`, indicating PostgreSQL was already the intended database.

## Decision

We will use **PostgreSQL** as the relational database and **Flyway** for schema migrations.

Migrations are run as a **standalone deployment step** using the official
**Flyway CLI Docker image** (`flyway/flyway`), pointed at the `sql` module's resources.
The application itself never runs Flyway; `spring.flyway.enabled` is `false`.

### `sql` module

The `sql` module contains only Flyway migration SQL files:

```
sql/
  src/main/resources/
    db/migration/
      V1__initial_schema.sql
      V2__...sql
```

There is no Java in this module. It has no `module-info.java` (see ADR 0007).
The module exists as a deployment artifact: its resources are mounted or copied into the
Flyway CLI Docker container at deploy time.

### Schema compatibility constraint

Because migrations and application deployments are decoupled, all schema changes must be
**backwards-compatible** with the previous application version (for rolling deploys where
old and new app instances run simultaneously) and **forwards-compatible** with the next
version (in case a rollback is needed after migration).

In practice this means:
- Columns are added as nullable before the application starts using them.
- Columns are dropped only after the application no longer references them.
- Renaming is done in multiple steps (add new, migrate data, remove old).

### Integration tests

The `persistence/itest` source set uses Testcontainers to spin up a real PostgreSQL
instance. Flyway migrations from the `sql` module are applied before each test run,
ensuring integration tests always reflect the current schema.

## Consequences

- Application startup is faster and cannot fail due to a failed migration.
- Zero-downtime deployments are achievable without special Flyway locking strategies.
- Developers must apply schema compatibility discipline; violations can cause runtime errors
  in production during the window between migration and full deployment.
- A CI step is needed to run migrations before deploying the application.
- The `sql` module is a pure resource module with no Java compilation.
