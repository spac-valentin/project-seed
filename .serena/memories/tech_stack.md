# Tech Stack

## Backend (api/)
- Java (Spring Boot 4)
- Gradle (Kotlin-style DSL, multi-module)
- JPMS (module-info.java per module)
- Spring MVC (REST controllers)
- Spring JDBC
- Flyway (migrations in `api/sql/`)
- PostgreSQL
- JUnit 5 + Testcontainers (itest source set)
- ArchUnit (architecture enforcement tests)
- Spotless + Google Java Format (formatting)
- SLF4J (logging)

## Frontend (ui/)
- Angular 21 (standalone components, no NgModules)
- TypeScript ~5.9
- RxJS ~7.8
- Tailwind CSS 4
- ESLint + angular-eslint
- Prettier
- Vitest (testing)
- npm 10.8.2

## Tooling
- Nix (shell.nix, ui.nix) for dev environment
- Gradle wrapper (`./gradlew`)
