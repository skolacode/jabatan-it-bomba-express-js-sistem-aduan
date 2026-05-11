## STEPS

# Core framework

yarn add express

yarn add -D typescript @types/node @types/express ts-node nodemon

yarn tsc --init

"scripts": {
  "build": "tsc",
  "start": "node dist/index.js",
  "dev": "nodemon src/index.ts"
}

.gitignore

## CLI

git init

yarn add dotenv
yarn add -D @types/dotenv

## ENV

PORT=3000

yarn add -D eslint prettier eslint-config-prettier eslint-plugin-prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin

## add the config in this file eslint.config.mjs

import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: typescriptParser,
      globals: {
        node: true,
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
      "prettier": prettierPlugin,
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      ...prettierConfig.rules,
      "prettier/prettier": "error",
    },
  },
];

}


yarn add swagger-ui-express swagger-jsdoc
yarn add -D @types/swagger-ui-express @types/swagger-jsdoc

yarn add -D tsx
yarn add -D tsup -- for production

config the tsup

import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'], // Your entry point
  format: ['esm'],         // Output as modern ES Modules
  splitting: false,        // Disable splitting to get a single file
  sourcemap: true,         // Help with debugging
  clean: true,             // Clean the dist folder before building
  minify: true,            // Minify for production (optional)
  bundle: true,            // Bundle all your code together
});

## Logging
yarn add morgan winston
yarn add -D @types/morgan

yarn add winston-daily-rotate-file

yarn add uuid
yarn add -D @types/uuid

