# Task Completion Checklist

After completing any coding task, run the appropriate checks:

## For Java (api/) changes
1. `./gradlew spotlessApply` — auto-format code
2. `./gradlew :api:build` — ensure build passes
3. `./gradlew :api:test` — ensure all tests pass

## For Angular (ui/) changes
1. `npm run lint` (from `ui/`) — check linting
2. `ng build` (from `ui/`) — ensure build passes
3. `ng test` (from `ui/`) — ensure all tests pass

## For any changes
- Verify no new lint/format errors introduced
- If architecture changes, create an ADR: `adr new <title>` (in nix shell)
