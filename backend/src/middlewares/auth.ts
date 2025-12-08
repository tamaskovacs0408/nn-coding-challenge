import type { Request, Response, NextFunction } from "express";

const HEADER = "x-api-key";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const providedApiKey = req.header(HEADER);
  const expectedApiKey = process.env.API_KEY;

  if (!providedApiKey) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Missing API key",
    });
  }

  if (providedApiKey !== expectedApiKey) {
    return res.status(403).json({
      error: "Forbidden",
      message: "Invalid API key",
    });
  }

  next();
}
