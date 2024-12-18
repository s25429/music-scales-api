import type { Request, Response, NextFunction } from 'express'

export const addGeneralDataToResponse = (
  _req: Request, 
  res: Response,
  next: NextFunction,
) => {
  const ogJson = res.json

  res.json = function(body) {
    return ogJson.call(this, {
      ...body,
      success: true,
      message: '',
    })
  }

  next()
}