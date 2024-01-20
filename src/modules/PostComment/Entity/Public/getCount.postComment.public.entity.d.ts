import { Types } from 'mongoose'
import { PostCommentsType } from '../index'

export type GetCountPostCommentPublicEntity = {
  id: string
} & Pick<PostCommentsType, 'userId' | 'postId' | 'status' | 'createdAt'>

export type GetCountPostCommentPublicFilter = {
  _id: string
  userId: Types.ObjectId
  postId: Types.ObjectId
  status: string
  createdAt: string
}
