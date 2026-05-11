export {}; // Ensure this is treated as a module

declare global {
  namespace Express {
    interface Request {
      traceId: string;
    }
  }
}
