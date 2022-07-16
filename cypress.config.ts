import { defineConfig } from 'cypress';

export default defineConfig({
  video: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    supportFile: false,
    baseUrl: 'http://localhost:3000',
  },
});
