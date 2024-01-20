import joi from 'joi'
import { UpdatePostCommentPublicEntity } from '../../Entity'
const objectId = require('joi-objectid')

export const postCommentValidator = (data: Partial<UpdatePostCommentPublicEntity>) => {
  const schema = joi.object<UpdatePostCommentPublicEntity>({
    body: joi.string().required(),
    parentId: [objectId(joi), joi.string().valid('').valid(null)],
    postId: [objectId(joi), joi.required()]
  })

  return schema.validate(data)
}
