# Backend (api/)

Java backend using Spring Boot 4, hexagonal (ports & adapters) architecture, and JPMS.

## Module structure
- `domain/`      — pure business logic; entities, port interfaces, use cases (no Spring Web/Data)
- `rest/`        — primary adapter; Spring MVC controllers + `@SpringBootApplication`
- `persistence/` — secondary adapter; Spring JDBC implementations of domain ports
- `sql/`         — Flyway migration SQL files only (no Java)

## Key conventions
- **No classpath scanning**: all beans declared explicitly via `@Import` in `Application.java`
- **JPMS**: each module has `module-info.java`; only `*.config` packages are exported
- **ArchUnit**: architectural rules are enforced as JUnit tests in each module's `test` source set
- **`itest` test sets**: slow Testcontainers tests live in `itest`, not `test`

## Package roots
- `ro.vspac.domain.*`
- `ro.vspac.rest.*`
- `ro.vspac.persistence.*`

## Dependency management
After any change to `gradle/libs.versions.toml` (adding, removing, or editing entries), always run:
```
./gradlew versionCatalogUpdate
```
This upgrades all entries to their latest available versions and keeps the file sorted.

## Commands
- `./gradlew :api:domain:test` — unit tests for domain
- `./gradlew :api:rest:test` — unit tests for rest
- `./gradlew :api:persistence:test` — unit tests for persistence
- `./gradlew :api:persistence:itest` — Testcontainers integration tests
- `./gradlew :api:rest:itest` — full-stack HTTP integration tests
- `./gradlew spotlessApply` — format all Java code (Google Java Format)

## ADRs
See `doc/adr/` for architectural decisions
