import { Types } from 'mongoose'
import { PostCommentsType } from '../index'

export type GetAllPostCommentPublicEntity = {
  page: string
  size: string
  sortColumn: string
  sortType: 'asc' | 'desc'
  id: string
} & Pick<PostCommentsType, 'userId' | 'postId' | 'status' | 'createdAt'>

export type GetAllPostCommentPublicFilter = {
  _id: string
  userId: Types.ObjectId
  postId: Types.ObjectId
  status: string
  createdAt: string
}
