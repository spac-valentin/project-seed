# 6. ArchUnit for intra-module architectural rule enforcement

Date: 2026-03-31

## Status

Accepted

## Context

JPMS (ADR 0007) enforces inter-module boundaries at compile time: a module cannot access
unexported packages of another module. However, JPMS operates at the module level and
cannot enforce finer-grained rules *within* a module — for example, preventing `domain.usecase`
classes from depending on `domain.model` internals in unintended ways, or ensuring the
domain is free of framework imports.

ArchUnit fills this gap by analysing compiled bytecode and asserting structural rules as
JUnit tests. Violations fail the build in the same way as any other test failure.

The domain module uses Lombok for developer convenience rather than enforcing strict
framework-free purity at the dependency level. ArchUnit is the mechanism that ensures
Lombok convenience does not become a gateway for Spring or JPA to creep into the domain.

## Decision

Each module that has Java sources contains ArchUnit tests in its standard `test` source
set. Rules are expressed using plain package-string patterns; no cross-module classpath
is required because ArchUnit analyses bytecode directly.

### Rules per module

**`domain/test`** ✅ implemented
- `model` has no outbound dependencies on `port`, `usecase`, or `config`.
- `port` does not depend on `usecase` or `config`.
- `usecase` does not depend on `config`.
- Only `config` may use classes from `org.springframework`.
- No class in `ro.vspac.domain` may depend on `ro.vspac.rest` or `ro.vspac.persistence`.
- No class in `ro.vspac.domain` may use `org.springframework.web`, `org.springframework.data`,
  or `org.springframework.jdbc`.
- No class in `ro.vspac.domain` may use `jakarta.persistence` or `javax.servlet`.

**`rest/test`**
- No class in `ro.vspac.rest` (outside `ro.vspac.rest.config`) may depend on any class
  in `ro.vspac.persistence`.

**`persistence/test`**
- No class in `ro.vspac.persistence` (outside `ro.vspac.persistence.config`) may depend
  on any class in `ro.vspac.rest`.

### Package name conventions (pinned)

These package roots are the authoritative values used in all ArchUnit rules:

| Module      | Root package              |
|-------------|---------------------------|
| domain      | `ro.vspac.domain`         |
| rest        | `ro.vspac.rest`           |
| persistence | `ro.vspac.persistence`    |

Renaming these packages requires updating the corresponding ArchUnit rules.

## Consequences

- Architecture violations are caught automatically in CI without manual review.
- ArchUnit tests run as part of `./gradlew test`; no separate tooling is needed.
- Rules are expressed in code and versioned with the codebase.
- Inter-module rules (e.g. `rest` cannot import unexported `persistence` types) are
  already enforced by JPMS at compile time and are not duplicated in ArchUnit.
- Developers who add new packages must consider whether existing rules need updating.
