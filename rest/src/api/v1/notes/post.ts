import type { Request, Response, NextFunction } from 'express'
import type { GetNoteResponse } from 'proto/__generated__/note'
import type { ResponseBody } from 'utils/responses'

import { Router } from 'express'

import { checkGRPC } from 'middleware/request'

import { checkBody } from 'utils/requests'
import { checkGRPCErrors } from 'utils/responses'
import { createErrorData, ErrorData } from 'utils/errors'
import { SchemaDefinition } from 'utils/parser'

import grpc from 'proto/grpc'


type Note = Exclude<GetNoteResponse['note'], undefined>

const notes = Router()


/**
 * @swagger
 *  /notes/{id}:
 *  post:
 *    operationId: postNote
 *    tags: 
 *      - notes
 *    summary: Add note
 *    description: Add note with specified body. ID is generated automatically.
 *    requestBody:
 *      $ref: '#/components/requests/noteBody'
 *    responses:
 *      200:
 *        description: Note that was created.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success: 
 *                  type: boolean
 *                data: 
 *                  $ref: '#/components/responses/noteData'
 *              required:
 *                - success
 *                - data
 *      400:
 *        $ref: '#/components/responses/badRequest'
 */  
notes.post('/', 
  checkGRPC,
  (_: Request, res: Response<ResponseBody<Note | null>, { data: Note | null, schema: SchemaDefinition }>, next: NextFunction) => {
    res.locals.schema = {
      name: { type: String, required: true },
    }

    next()
  },
  checkBody,
  async (req: Request, res: Response<ResponseBody<Note | null>, { data: Note | null, error?: ErrorData }>, next: NextFunction) => {
    const request = grpc.Client.Note!.req.add(req.body)

    try {
      const response = await grpc.Client.Note!.add(request)
      res.locals.data = response.note ?? null
    } 
    catch (error) {
      res.locals.error = createErrorData(error)
    }

    if (res.locals?.data === undefined)
      res.locals.data = null

    next()
  },
  checkGRPCErrors,
  (_: Request, res: Response<ResponseBody<Note | null>, { data: Note | null }>) => {
    res.status(200).json({ success: true, data: res.locals.data })
  }
)


export default notes
