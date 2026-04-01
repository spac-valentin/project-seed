# 4. Gradle multi-module structure

Date: 2026-04-01

## Status

Accepted. Supersedes the module structure implied by the original `api/` stub.

## Context

The hexagonal architecture (ADR 0003) and JPMS encapsulation (ADR 0007) require clear
physical module boundaries. Gradle submodules provide compile-time dependency enforcement
on top of the runtime enforcement provided by JPMS: a module can only depend on what is
declared in its `build.gradle`.

The existing `api/` module is a plain Java stub with no business logic. Its Java sources
and `build.gradle` are removed, but the `api/` directory itself is retained as a logical
grouping container for the backend submodules and to house `api/CLAUDE.md` — mirroring
the `ui/CLAUDE.md` that already exists for the frontend. This gives Claude Code a
backend-specific instruction scope without requiring a wrapper Gradle project.

## Decision

The `api/build.gradle` and `api/src/` are deleted. The `api/` directory becomes a plain
directory (not a Gradle project). Four Gradle submodules are created inside it:

| Gradle path       | Directory          | Role                                              |
|-------------------|--------------------|---------------------------------------------------|
| `api:domain`      | `api/domain/`      | Pure business logic; no framework dependencies    |
| `api:rest`        | `api/rest/`        | Primary adapter: Spring MVC controllers           |
| `api:persistence` | `api/persistence/` | Secondary adapter: Spring Data/JDBC + domain ports|
| `api:sql`         | `api/sql/`         | Flyway migration SQL files; no Java sources       |

`settings.gradle` replaces `include 'api'` with:

```groovy
include 'api:domain'
include 'api:rest'
include 'api:persistence'
include 'api:sql'
```

### Dependency graph

```
api:domain      ← (no dependencies)
api:persistence ← api:domain
api:rest        ← api:domain
                  runtimeOnly: api:persistence
api:sql         ← (no dependencies)
```

`api:rest` depends on `api:persistence` as `implementation` solely to reference
`PersistenceConfig` in `Application.java`'s `@Import`. Only the `config` package of
`api:persistence` is exported by its `module-info.java`; all implementation classes
(e.g. `UserJdbcRepository`) remain inaccessible to `api:rest` at the JVM level.

JPMS (ADR 0007) is the authoritative enforcement mechanism here. A Gradle `runtimeOnly`
constraint would be a redundant second line of defence that forces indirect wiring
(e.g. Spring Boot auto-configuration) with no architectural gain. Explicit `@Import` in
`Application.java` is preferred for clarity.

**Forbidden**: `api:rest` referencing any class outside `ro.vspac.persistence.config`.
This is enforced by JPMS (unexported packages) and by the ArchUnit rule in `rest/test`
(ADR 0006).

### `@SpringBootApplication`

The `api:rest` module owns `@SpringBootApplication`. If a second primary adapter is ever
added (e.g. a Kafka consumer, a CLI runner), a `api:bootstrap` module should be extracted
to own application wiring, reducing `api:rest` to controllers only.

### Integration tests

Each module with external dependencies uses an `itest` test set, provided by the
`org.unbroken-dome.test-sets` plugin (already configured in `settings.gradle`):

- `api:persistence/itest` — integration tests against a real PostgreSQL instance via Testcontainers
- `api:rest/itest` — full-stack HTTP integration tests (Spring Boot test slice + Testcontainers)

Unit tests remain in the standard `test` source set.

## Consequences

- `api/` exists as a directory but not as a Gradle project; there is no `api/build.gradle`.
- `api/CLAUDE.md` provides backend-specific context to Claude Code, scoped to all files
  under `api/`, without polluting the root `CLAUDE.md` with backend detail.
- Compile-time dependency boundaries are explicit and machine-checked by Gradle.
- `settings.gradle` is updated: `include 'api'` is replaced with four `include 'api:*'` entries.
- The `itest` source set separation keeps slow Testcontainers tests out of the default
  `./gradlew test` run; they are invoked with `./gradlew itest`.
