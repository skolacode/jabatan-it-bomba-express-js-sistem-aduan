import express from 'express';
import type { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import logger from './utils/logger';
import morgan from 'morgan';
import aduanRouter from './router/aduan.router';
// import dotenv from 'dotenv';

// Load environment variables from .env
// dotenv.config();

const app = express();
// Use the variable from process.env, or a default fallback
// const PORT = process.env.PORT || 3000;
const PORT = 3000;

import { v4 as uuidv4 } from 'uuid';

app.use((req, res, next) => {
  // Assign a unique ID to every request
  const traceId = uuidv4();
  req.traceId = traceId;

  logger.info(`Started Request`, { traceId, method: req.method, url: req.url });
  next();
});

app.use(
  morgan('dev', {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/aduan', aduanRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});

app.get('/first-endpoint', (req: Request, res: Response) => {
  res.json({ message: 'This is the first endpoint' });
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
