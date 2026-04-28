# Coding Laws

- **DRY — no magic literals.** Every repeated value or magic number must be a named constant defined once and referenced everywhere. Raw literals (e.g. `1024`, `#D80000`, `800px`) are only acceptable at the single point of definition.
