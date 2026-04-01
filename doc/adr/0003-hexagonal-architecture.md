# 3. Hexagonal (ports & adapters) architecture

Date: 2026-03-31

## Status

Accepted

## Context

The backend must remain testable and adaptable as infrastructure choices evolve (databases,
messaging, HTTP frameworks). Tight coupling between business logic and framework code has
historically led to brittle, hard-to-test systems where replacing a database or framework
requires touching the entire codebase.

Hexagonal architecture (also called ports & adapters) addresses this by placing the domain
at the centre and defining explicit ports (interfaces) through which the outside world
interacts with it. Adapters implement these ports and are kept separate from the domain.

## Decision

We will use hexagonal architecture with explicit primary and secondary ports.

### Roles

- **Primary adapters** (driving): receive external input and call domain ports.
  The `rest` module is the primary adapter (HTTP controllers).
- **Secondary adapters** (driven): implement domain ports and call external systems.
  The `persistence` module is the secondary adapter (database access).
- **Domain**: contains the business logic, port interfaces, and orchestration use cases.
  It has no knowledge of any adapter.

### Domain module structure

The `domain` module is a deliberate simplification: it contains the domain model, port
interfaces, and use case orchestrators in a single module, organised by sub-package:

```
ro.vspac.domain.model/    — entities and value objects
ro.vspac.domain.port/     — port interfaces (inbound and outbound)
ro.vspac.domain.usecase/  — use case classes that orchestrate model and ports
ro.vspac.domain.config/   — Spring @Configuration (exported for @Import)
```

If use case complexity grows significantly, the `usecase` package can be extracted into a
dedicated `application` module without changing the hexagonal structure.

### Enforcement

Architectural boundaries are enforced at two levels:

- **JPMS** (compile-time, inter-module): adapter implementation packages are unexported;
  the `rest` module cannot reference `persistence` types even if it wanted to.
  See ADR 0007.
- **ArchUnit** (test-time, intra-module): fine-grained package-level rules within each
  module (e.g. `domain.usecase` may only call `domain.port` interfaces, not reach into
  `domain.model` for persistence concerns). See ADR 0006.

## Consequences

- The domain can be tested without Spring, a database, or any HTTP infrastructure.
- Adapters can be swapped (e.g. replace JDBC with jOOQ) without touching the domain.
- More modules and more indirection than a layered architecture; suitable for systems
  where business logic is non-trivial and longevity matters.
- Developers must be deliberate about which layer new code belongs to.
