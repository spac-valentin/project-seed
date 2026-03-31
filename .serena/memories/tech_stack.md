# Tech Stack

## Frontend (ui/)
- **Framework**: Angular 21
- **Language**: TypeScript ~5.9
- **Styling**: TailwindCSS 4
- **Testing**: Vitest 4
- **Linting**: ESLint 10 + typescript-eslint + angular-eslint
- **Formatting**: Prettier 3
- **Package manager**: npm 10.8.2

## Backend (api/)
- **Language**: Java
- **Build**: Gradle (Groovy DSL)
- **Logging**: SLF4J
- **Testing**: JUnit 5 + AssertJ
- **Code style**: Spotless with Google Java Format

## Tooling
- **Nix**: shell.nix (adr-tools, python for adr-viewer), ui.nix
- **ADR**: adr-tools; view with `view-adrs` (nix shell function)
- **Gradle plugins**: spotless, dependency-analysis, version-catalog-update
