import { Types } from 'mongoose'
import { PostCommentsType } from '../index'

export type GetCountPostCommentEntity = {
  id: string
} & Pick<PostCommentsType, 'userId' | 'postId' | 'status' | 'createdAt'>

export type GetCountPostCommentFilter = {
  _id: string
  userId: Types.ObjectId
  postId: Types.ObjectId
  status: string
  createdAt: string
}
