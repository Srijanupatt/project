import { Request, Response, NextFunction } from 'express'

export class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message })
  }

  console.error(err)
  return res.status(500).json({ message: 'Internal server error' })
}