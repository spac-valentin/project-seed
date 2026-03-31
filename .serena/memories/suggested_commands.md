# Suggested Commands

## UI (Angular) — run from `ui/`
- `npm start` / `ng serve` — Start dev server at http://localhost:4200
- `ng build` — Production build (output: `ui/dist/`)
- `ng build --watch --configuration development` — Watch build
- `ng test` — Run unit tests with Vitest
- `npm run lint` — Lint TypeScript and HTML with ESLint
- `ng generate component <name>` — Scaffold a new component

## API (Java) — run from project root
- `./gradlew :api:build` — Build API
- `./gradlew :api:test` — Run API tests
- `./gradlew spotlessApply` — Auto-format Java code (Google Java Format)
- `./gradlew spotlessCheck` — Check formatting
- `./gradlew :api:run` — Run the Java main class (if application plugin added)

## Root Gradle
- `./gradlew build` — Build all subprojects
- `./gradlew test` — Run all tests
- `./gradlew buildHealth` — Dependency health report
- `./gradlew versionCatalogUpdate` — Update dependency versions

## Nix
- `nix-shell shell.nix` — Enter shell with adr-tools + python + adr-viewer
- `view-adrs` — Serve ADR viewer at http://localhost:8000 (inside nix shell)

## ADR
- `adr new <title>` — Create a new Architecture Decision Record in `doc/adr/`
