import joi from 'joi'
import { CreateFileEntity } from '../Entity'

// FILE VALIDATION
export const filesValidator = (data: CreateFileEntity) => {
  const schema = joi.object<CreateFileEntity>({
    images: joi.array()
  })

  return schema.validate(data)
}
