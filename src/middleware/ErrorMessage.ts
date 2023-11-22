import { Response } from 'express'

const error400 = 'BAD_REQUEST'
const error401 = 'UNAUTHORIZED'
const error409 = 'CONFLICT'
const error417 = 'EXPECTATION_FAILED'
const error500 = 'INTERNAL_SERVER_ERROR'
const objectIdError = 'OBJECT_ID_IS_FALSE'

export const errorStatus400 = (res: Response, err: any) => {
  res.status(400).json({
    msg: error400,
    data: err?.message || null,
    errorCode: err?.statusCode || null,
    code: 400
  })
}

export const errorStatus401 = (res: Response, err: any) => {
  res.status(401).json({
    msg: error401,
    code: 401,
    data: err?.data || null,
    errorCode: err?.statusCode || null
  })
}

export const errorStatus409 = (res: Response, err?: any) => {
  res.status(409).json({
    msg: error409,
    code: 409,
    data: err?.data || null,
    errorCode: err?.statusCode || null
  })
}

export const errorStatus417 = (res: Response, err: any) => {
  res.status(417).json({
    msg: error417,
    code: 417,
    data: err?.data || null,
    errorCode: err?.statusCode || null
  })
}

export const errorStatus500 = (res: Response, err?: any) => {
  res.status(500).json({
    msg: error500,
    data: err?.message,
    code: 500
  })
}

export const errorStatusObjectId = (res: Response) => {
  res.status(400).json({
    msg: error400,
    data: objectIdError,
    code: 400
  })
}
