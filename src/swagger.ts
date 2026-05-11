import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express TypeScript API',
      version: '1.0.0',
      description: 'API documentation for my Express server',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  // Path to the API docs (usually where your routes are)
  apis: ['./src/routes/*.ts', './src/index.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
