# 8. MapStruct for object mapping

Date: 2026-04-01

## Status

Accepted

## Context

The hexagonal architecture (ADR 0003) keeps the domain model separate from adapter-specific
representations. The `rest` adapter needs to map domain objects to DTOs for HTTP responses
(and eventually from HTTP request payloads back to domain objects). Hand-written mapping
methods are error-prone and verbose, especially as models grow.

Several mapping libraries exist for Java:

- **MapStruct**: compile-time annotation processor; generates plain, readable Java code;
  no runtime reflection; fully compatible with JPMS and Lombok.
- **ModelMapper**: runtime reflection-based; fights JPMS encapsulation; requires additional
  `opens` directives.

## Decision

We will use **MapStruct** for all domain ↔ DTO mapping in the `rest` module.

### Mapper definition

Mappers are defined as interfaces annotated with `@Mapper`. Custom field mappings
(computed fields, type conversions) use `@Mapping` with `expression`.

```java
@Mapper
public interface UserMapper {
  @Mapping(target = "dateOfBirth", expression = "java(...)")
  @Mapping(target = "avatarInitials", expression = "java(...)")
  UserDto toDto(User user);
}
```

### Bean registration

MapStruct's default component model (no `@Component` on the generated implementation) is
used. Mappers are exposed as Spring beans via `Mappers.getMapper(...)` in
`MappersConfig`, consistent with the project's explicit-wiring convention (ADR 0002):

```java
@Configuration(proxyBeanMethods = false)
public class MappersConfig {
  @Bean
  UserMapper userMapper() {
    return Mappers.getMapper(UserMapper.class);
  }
}
```

`componentModel = "spring"` is intentionally avoided: it generates a `@Component`-annotated
implementation class, coupling wiring to a generated class name.

### Annotation processor ordering

Both Lombok and MapStruct are annotation processors. Lombok must be declared first in
`build.gradle` so MapStruct sees Lombok-generated constructors and builders:

```groovy
annotationProcessor libs.lombok
annotationProcessor libs.mapstruct.processor
```

## Consequences

- Mapping code is generated at compile time; errors are caught early and the output is
  easy to inspect in `build/generated/sources`.
- No runtime reflection; no additional `opens` directives required.
- Computed fields (`avatarInitials`) and type conversions (`LocalDate` → ISO string) are
  handled via `expression` in `@Mapper`; they must be kept in sync with domain changes.
- Adding a new mapper requires a `@Bean` entry in `MappersConfig` and an `@Import` update
  in `Application`.
