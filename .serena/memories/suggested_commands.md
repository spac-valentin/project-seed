# Suggested Commands

## Backend (run from project root)
```sh
./gradlew :api:domain:test          # unit tests for domain
./gradlew :api:rest:test            # unit tests for rest
./gradlew :api:persistence:test     # unit tests for persistence
./gradlew :api:persistence:itest    # Testcontainers integration tests
./gradlew :api:rest:itest           # full-stack HTTP integration tests
./gradlew spotlessApply             # format all Java code (Google Java Format)
./gradlew versionCatalogUpdate      # after any change to gradle/libs.versions.toml
```

## Frontend (run from ui/)
```sh
npm start          # ng serve — dev server
npm run build      # ng build
npm test           # vitest
npm run lint       # eslint src/**/*.ts src/**/*.html
```

## Git / System (Darwin)
```sh
git log --oneline
git status
ls -la
```
