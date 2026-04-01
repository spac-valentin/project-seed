# Project Overview

**project-seed** is a full-stack web application seed/template consisting of:
- **`api/`** — Java backend (Spring Boot 4, hexagonal architecture, JPMS)
- **`ui/`** — TypeScript frontend (Angular 21, standalone components, Tailwind CSS)
- **`doc/adr/`** — Architecture Decision Records (ADRs 0001–0007)

## Module Structure (API)
- `api/domain/` — pure business logic; entities, port interfaces, use cases
- `api/rest/` — primary adapter; Spring MVC controllers + `@SpringBootApplication`
- `api/persistence/` — secondary adapter; Spring JDBC implementations
- `api/sql/` — Flyway migration SQL files only

## Key Architectural Decisions
- Hexagonal (ports & adapters) architecture
- No classpath scanning: all beans declared explicitly via `@Import` in `Application.java`
- JPMS: each module has `module-info.java`; only `*.config` packages exported
- ArchUnit enforces architectural rules as JUnit tests
- PostgreSQL + Flyway for persistence
- Package root: `ro.vspac`
