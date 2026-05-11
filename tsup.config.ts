import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'], // Your entry point
  format: ['esm'], // Output as modern ES Modules
  splitting: false, // Disable splitting to get a single file
  sourcemap: true, // Help with debugging
  clean: true, // Clean the dist folder before building
  minify: true, // Minify for production (optional)
  bundle: true, // Bundle all your code together
});
