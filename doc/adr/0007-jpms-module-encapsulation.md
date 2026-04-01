# 7. JPMS (Java Platform Module System) for module encapsulation

Date: 2026-03-31

## Status

Accepted

## Context

The hexagonal architecture (ADR 0003) depends on adapters being replaceable without the
domain knowing about them. Conventional package-private visibility in Java only works
within a single JAR; across multiple JARs (Gradle modules), all public types are
accessible by default.

JPMS introduces module declarations (`module-info.java`) that make this restriction
explicit and JVM-enforced: a module can only access types that another module explicitly
exports. This provides a compile-time enforcement layer that complements ArchUnit's
test-time checks (ADR 0006).

Spring Boot and most of the Java ecosystem ship as *automatic modules* — JARs without a
`module-info.java`, given a derived module name from their JAR manifest or file name.
This limits how cleanly JPMS can be applied but does not prevent meaningful use of it.

## Decision

Each Gradle module that has Java sources will have a `module-info.java`. The `sql` module
has no Java sources and therefore no module declaration.

### Encapsulation pattern

Implementation packages are **not exported**. Each module exports only its `config`
package (which contains the Spring `@Configuration` class):

```java
// persistence/src/main/java/module-info.java
module ro.vspac.persistence {
    requires ro.vspac.domain;
    requires spring.context;          // automatic module name — verify against JAR manifest

    exports ro.vspac.persistence.config;
    // ro.vspac.persistence.* is NOT exported — JdbcUserRepository etc. are invisible

    opens ro.vspac.persistence.config to spring.core, spring.beans;
}
```

```java
// domain/src/main/java/module-info.java
module ro.vspac.domain {
    requires static lombok;           // compile-time only

    exports ro.vspac.domain.model;
    exports ro.vspac.domain.port;
    exports ro.vspac.domain.usecase;
    exports ro.vspac.domain.config;

    opens ro.vspac.domain.config to spring.core, spring.beans;
}
```

```java
// rest/src/main/java/module-info.java
module ro.vspac.rest {
    requires ro.vspac.domain;
    requires spring.context;
    requires spring.web;              // automatic module — verify against JAR manifest
    requires spring.boot;
    requires spring.boot.autoconfigure;

    exports ro.vspac.rest.config;

    opens ro.vspac.rest to spring.core, spring.web;
    opens ro.vspac.rest.config to spring.core, spring.beans;
}
```

### Spring wiring without scanning

Because classpath scanning is disabled (ADR 0002), `rest` explicitly imports each
module's configuration. `@SpringBootApplication` is not used — it would implicitly enable
`@ComponentScan`. Instead, `Application` uses the two constituent annotations directly:

```java
@SpringBootConfiguration
@EnableAutoConfiguration
@Import({DomainConfig.class, PersistenceConfig.class, ...})
public class Application { }
```

All `@Configuration` classes use `proxyBeanMethods = false` to avoid CGLIB subclassing,
which reduces the `opens` directives needed and is more JPMS-friendly.

### Automatic module names

Spring Boot and its dependencies are automatic modules. Their module names are derived
from the `Automatic-Module-Name` entry in each JAR's `MANIFEST.MF`. These names must be
verified against the actual JARs in use — they can change between Spring Boot versions.
The `requires` directives in each `module-info.java` must be kept in sync with the
Spring Boot version declared in `libs.versions.toml`.

## Consequences

- Adapter implementation classes (e.g. `JdbcUserRepository`) are physically inaccessible
  from other modules at the JVM level — not just by convention.
- Only the `config` package of each module is visible to other modules, making the
  public API of each module explicit and minimal.
- `opens` directives are limited to config packages and controller packages that Spring
  needs for proxying; framework reflection surface is minimised.
- Automatic module name instability requires care when upgrading Spring Boot — `requires`
  directives may need updating.
- JPMS enforces inter-module rules at compile time; ArchUnit (ADR 0006) handles
  intra-module rules that JPMS cannot express.
