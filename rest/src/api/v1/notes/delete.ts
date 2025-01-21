import type { Request, Response, NextFunction } from 'express'
import { type ParamId } from 'utils/requests'
import type { ResponseBody } from 'utils/responses'

import { Router } from 'express'

import { checkGRPC } from 'middleware/request'

import { checkGRPCErrors } from 'utils/responses'
import { createErrorData, ErrorData } from 'utils/errors'

import grpc from 'proto/grpc'

const notes = Router()

/**
 * @swagger
 *  /notes/{id}:
 *  delete:
 *    operationId: deleteNote
 *    tags: 
 *      - notes
 *    summary: Delete note
 *    description: Delete note with specified ID.
 *    parameters:
 *      - $ref: '#/components/parameters/noteId'
 *    responses:
 *      200:
 *        description: ID of note that was deleted.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success: 
 *                  type: boolean
 *                data: 
 *                  type: string
 *              required:
 *                - success
 *                - data
 *      404:
 *        $ref: '#/components/responses/noteNotFound'
 *      400:
 *        $ref: '#/components/responses/badRequest'
 */  
notes.delete('/:id',
  checkGRPC,
  async (req: Request<ParamId>, res: Response<ResponseBody<string>, { data: string, error?: ErrorData }>, next: NextFunction) => {
    const request = grpc.Client.Note!.req.delete({ id: req.params.id })

    try {
      const response = await grpc.Client.Note!.delete(request)
      res.locals.data = response.id
    } 
    catch (error) {
      res.locals.error = createErrorData(error)
    }

    next()
  },
  checkGRPCErrors,
  (_: Request, res: Response<ResponseBody<string>, { data: string }>, next: NextFunction) => {
    res.status(200).json({ success: true, data: res.locals.data })
  }
)


export default notes