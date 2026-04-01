# Task Completion Checklist

After completing any coding task:

## Backend changes
- [ ] Run `./gradlew spotlessApply` to format Java code
- [ ] Run relevant unit tests: `./gradlew :api:<module>:test`
- [ ] Run integration tests if persistence/HTTP affected: `./gradlew :api:persistence:itest` or `:api:rest:itest`
- [ ] If `gradle/libs.versions.toml` changed: run `./gradlew versionCatalogUpdate`
- [ ] Verify ArchUnit tests still pass (they run as part of `test`)

## Frontend changes
- [ ] Run `npm run lint` from `ui/`
- [ ] Run `npm test` from `ui/`
- [ ] Ensure AXE/WCAG AA accessibility is maintained

## General
- [ ] Ensure no classpath scanning introduced (backend)
- [ ] Ensure JPMS module-info.java updated if new packages added (backend)
- [ ] ADR in `doc/adr/` if a significant architectural decision was made
