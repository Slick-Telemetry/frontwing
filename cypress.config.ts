import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'x56qs2',
  retries: 2,
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
  },
});
