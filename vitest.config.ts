import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  // any custom Vitest config you require
  test: {
    clearMocks: true,
    globals: true,
    setupFiles: ['dotenv/config']
  }
});
