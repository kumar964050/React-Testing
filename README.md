# Vitest + React Testing Library + user-event + jsdom + TypeScript Setup

## 1. Install Dependencies

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @types/jest @types/testing-library__jest-dom
```

## 2. Configure Vite for Testing

Update your `vite.config.ts`:

```ts
import { defineConfig } from "vite";

export default defineConfig({
  // ...other config
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    coverage: {
      reporter: ["text", "lcov"],
    },
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
});
```

## 3. Create Test Setup File

Create `src/setupTests.ts`:

```ts
import "@testing-library/jest-dom";
```

## 4. Add Test Script to package.json

```json
"scripts": {
  "test": "vitest"
}
```

---

**Tip:**

- Ensure your test files use `.test.tsx` or `.spec.tsx` extensions.
- For TypeScript projects, verify your `tsconfig.json` includes `"types": ["vitest/globals"]` under `compilerOptions`.
