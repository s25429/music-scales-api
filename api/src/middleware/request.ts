import type { Request, Response, NextFunction, Locals } from 'express'

import { getPrintableInterfaceType, isInterface, isType, objectToReadableString, SchemaDefinition } from '../utils/types'
import { BadBodySchemaError, ResponseError } from '../utils/errors'


/**
 * @deprecated
 */
export const checkBodyOld = <T extends object>(
  _: Request, 
  res: Response<{}, { data: T | T[], expected: T }>, 
  next: NextFunction,
) => {
  const data = res.locals.data
  const expected = res.locals.expected

  const isCorrect = Array.isArray(data)
    ? data.map(obj => isInterface<T>(expected, obj)).every(Boolean)
    : isInterface<T>(expected, data)

  if (!isCorrect)
    throw new ResponseError(
      400, 
      `Wrong body given.`, 
      getPrintableInterfaceType(expected)
    )

  next()
}

/**
 * @deprecated
 */
export const checkBody = <T extends Object>(
  _: Request, 
  res: Response<{}, { data: T, schema: SchemaDefinition }>, 
  next: NextFunction,
) => {
  const data = res.locals.data
  const schema = res.locals.schema

  const isOfType = isType(data, schema)

  if (!isOfType)
    throw new BadBodySchemaError({
      body: objectToReadableString(data),
      schema: objectToReadableString(schema),
    })
  
  next()
}

export const checkLocalsData = <T extends object, U extends Locals = {}>(
  _: Request, 
  res: Response<{}, { data: T, schema: SchemaDefinition } & U>, 
  next: NextFunction,
) => {
  const data = res.locals.data
  const schema = res.locals.schema

  if (!data || !schema)
    throw new Error('res.locals.data and res.locals.schema need to be defined.')

  const isOfType = isType(data, schema)

  if (!isOfType)
    throw new BadBodySchemaError({
      body: objectToReadableString(data),
      schema: objectToReadableString(schema),
    })
  
  next()
}
