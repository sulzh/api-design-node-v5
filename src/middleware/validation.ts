import e from 'cors';
import type { Request, Response, NextFunction } from 'express';
import { ZodError, type ZodSchema } from 'zod';

export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.parse(req.body);
      req.body = validatedData;
      next();
    }
    catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: 'Invalid request body',
          details: error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export const validateParams = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.params);
      next();
    }
    catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: 'Invalid path parameters',
          details: error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export const validateQuery = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.query);
      next();
    }
    catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: 'Invalid query parameters',
          details: error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
};