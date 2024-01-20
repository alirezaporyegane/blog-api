import { Types } from 'mongoose'
import { PostCommentsType } from '../index'

export type GetAllPostCommentEntity = {
  page: string
  size: string
  sortColumn: string
  sortType: 'asc' | 'desc'
  id: string
} & Pick<PostCommentsType, 'userId' | 'postId' | 'status' | 'createdAt'>

export type GetAllPostCommentFilter = {
  _id: string
  userId: Types.ObjectId
  postId: Types.ObjectId
  status: string
  createdAt: string
}
