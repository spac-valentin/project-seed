# Style and Conventions

## Java (api/)
- Google Java Format (enforced via Spotless)
- No wildcard imports, no module imports
- Explicit bean registration via `@Import` (no classpath scanning)
- JPMS: only `*.config` packages exported per module
- Package root: `ro.vspac`
- ArchUnit tests enforce layer boundaries

## TypeScript/Angular (ui/)
- Strict TypeScript; avoid `any`, use `unknown`
- Standalone components (no `standalone: true` needed — default in Angular v20+)
- Signals for state (`signal()`, `computed()`, `input()`, `output()`)
- `ChangeDetectionStrategy.OnPush` on all components
- `inject()` instead of constructor injection
- `providedIn: 'root'` for singleton services
- Native control flow (`@if`, `@for`, `@switch`) — NOT `*ngIf`, `*ngFor`
- `class` bindings instead of `ngClass`; `style` bindings instead of `ngStyle`
- Reactive forms (not template-driven)
- `NgOptimizedImage` for static images
- No `@HostBinding`/`@HostListener` — use `host` object in decorator
- WCAG AA accessibility required; must pass AXE checks
- Feature-based directory structure: `core/`, `shared/`, `features/`
- Lazy loading for feature routes

## Formatting
- Java: `./gradlew spotlessApply`
- TypeScript/HTML: Prettier (`ui/.prettierrc`)
