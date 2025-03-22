# Naming Policy

## Language

- Primarily use **English**; file names, directory names, variable names, function names, etc. should be expressed using **English words**.
- Comments and documentation may be written in Japanese.

## Letter Case Usage

| Category                       | Convention / Example                                      |
| ------------------------------ | --------------------------------------------------------- |
| Directory Name                 | All lowercase (kebab-case is recommended)*1             |
| File Name                      | All lowercase (kebab-case is recommended)*2             |
| React Component                | **PascalCase**                                            |
| Variable / Function            | **camelCase**                                             |
| Class / Type / Interface       | **PascalCase**                                            |

>　\*1: The directory immediately containing a component should be named the same as the component. (For example, for `src/components/Grid/Grid.tsx`, the directory `src/components/Grid/` should be named `Grid`.)

>　\*2: As an exception, some library-specific files (e.g., `index.ts`, `index.d.ts`) should retain their original names.

## Word Delimitation Conventions

- **kebab-case**: Words are connected by hyphens (e.g., `example-file.ts`, `my-tokens.json`).
- **camelCase**: The first letter of the second and subsequent words is capitalized (e.g., `myFunction`, `myVariable`).
- **PascalCase**: The first letter of each word is capitalized (e.g., `MyComponent`, `MyClass`).

---

## Directory Naming Guidelines

- Use **kebab-case** and ensure that the directory name reflects its purpose.
- Examples:
  - `src/assets/styles/`
  - `src/components/`
  - `scripts/`
  - `tokens/`

---

## File Naming Guidelines

### React Components (.tsx)

- Use **PascalCase** followed by `.tsx`.
- The component name should match the file name.
  - Examples: `Grid.tsx`, `GanttFlow.tsx`
- Example directory structure:

  ```markdown
  src/
   └ components/
       └ Grid/
           ├─ Grid.tsx
           ├─ Grid.stories.tsx
           ├─ Grid.test.tsx
           └ index.ts
  ```

### Storybook Files (.stories.tsx)

- Use the component name followed by `.stories.tsx`.
- Examples: `Grid.stories.tsx`, `GanttFlow.stories.tsx`

### Test Files (.test.tsx / .spec.tsx)

- Use the component name followed by `.spec.tsx`.
- Examples: `Grid.spec.tsx`, `GanttFlow.spec.tsx`

### Script Files (.ts/.js)

- Name files using **kebab-case** and choose a name that clearly indicates its purpose.
- Examples:
  - `generate-styles-from-tokens.ts`
  - `figma-token-fetch.ts`
  - `build-library.ts`
- Place these files in directories such as `scripts/`.

### Configuration Files (e.g., tsconfig.json)

- Conventional file names (e.g., .gitignore, tsconfig.json, package.json) should be used as is.
- Similarly, configurations for tools like ESLint and Prettier follow standard naming conventions (e.g., `.eslintrc.js`, `.prettierrc`).

---

## Code-Level Naming Guidelines (Variables, Functions, Classes, etc.)

### Variables

- Use **camelCase**.
- Examples: `const userName = 'Alice'`, `let isLoading = false`
- For constants (values that do not change), you may use `UPPER_CASE` with underscores, but in TypeScript it is common to continue using camelCase.
  - Example: `const MAX_RETRY_COUNT = 3`

### Functions

- Use **camelCase**.
- Use names that clearly indicate the function's purpose, often a combination of a verb and a noun.
- Examples: `fetchUserData()`, `handleButtonClick()`

### Classes / Types / Interfaces

- Use **PascalCase**.
- Classes: `class UserController {}`
- Types / Interfaces: `interface User {}`, `type MyCustomType = {...}`

---

## Component Naming Guidelines

### Policy

- As with file naming, use **PascalCase**.
- Examples: `Grid`, `GanttFlow`

---
