# Style and Conventions

## Java (api/)
- **Formatter**: Google Java Format (enforced via Spotless)
- **Import order**: managed by Spotless (no wildcards, no module imports)
- **Unused imports**: automatically removed by Spotless
- **Run `./gradlew spotlessApply`** before committing Java code
- Package root: `ro.vspac`

## TypeScript / Angular (ui/)
- **Formatter**: Prettier 3
- **Linter**: ESLint with angular-eslint rules
- **Module structure**: feature-based (`ui/src/features/`, `ui/src/core/`)
- **Testing**: Vitest (not Jasmine/Karma)
- **Styling**: TailwindCSS utility classes (no separate SCSS conventions observed)
- Run `npm run lint` before committing UI code

## General
- Architecture decisions documented as ADRs in `doc/adr/`
- Timezone for tests: UTC (set via system property in Gradle)
