# 2. Use Spring Boot as the application framework

Date: 2026-03-31

## Status

Accepted

## Context

The backend needs a production-grade framework for HTTP request handling, dependency
injection, and data access. The team is familiar with the Java ecosystem and wants a
framework with a strong ecosystem, long-term support, and broad library compatibility.

Spring Boot is the dominant choice in the Java ecosystem and aligns with the chosen
hexagonal architecture (see ADR 0003): its DI container wires port implementations to
port interfaces without the domain layer needing to know about it.

Classpath scanning (`@ComponentScan`) is disabled globally. All beans are explicitly
declared in `@Configuration` classes. This makes the application context deterministic
and visible, avoids accidental bean registration, and reduces the `opens` surface required
for JPMS compatibility (see ADR 0007).

## Decision

We will use Spring Boot (latest stable release) as the application framework.

Classpath scanning is disabled. Every bean is registered explicitly via `@Configuration`
classes. Each module exposes its `@Configuration` class(es) in its `config` package;
the `rest` module's `Application` class `@Import`s these to compose the full context.

`@SpringBootApplication` is not used. `Application` is annotated with
`@SpringBootConfiguration` + `@EnableAutoConfiguration` to avoid implicitly enabling
`@ComponentScan`.

Spring's dependency BOM is added to the version catalog to manage transitive dependency
versions consistently alongside the existing `slf4j.bom` and `junit.bom` patterns.

## Consequences

- All beans are declared explicitly; the application context is easy to audit.
- Adding a new component requires a deliberate registration step — no magic discovery.
- Spring Boot and most of its ecosystem are automatic JPMS modules (no `module-info.java`);
  their module names must be verified against JAR manifests when writing `module-info.java`
  files (see ADR 0007).
- Spring BOM pins transitive dependency versions; fewer version conflicts across modules.
