import joi from 'joi'
import { UpdatePostCommentEntity } from '../../Entity'

export const updateValidator = (data: Partial<UpdatePostCommentEntity>) => {
  const schema = joi.object<UpdatePostCommentEntity>({
    _id: joi.string().required(),
    rejectComment: joi.string().required(),
    status: joi.string().required().valid('CONFIRM').valid('REJECTED').valid('PENDING')
  })

  return schema.validate(data)
}
