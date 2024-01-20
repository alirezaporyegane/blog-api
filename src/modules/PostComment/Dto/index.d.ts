import { Schema } from 'mongoose'

export type Status = 'CONFIRM' | 'REJECTED' | 'PENDING'

export type PostCommentsType = {
  _id: Schema.Types.ObjectId
  userId: Schema.Types.ObjectId
  postId: Schema.Types.ObjectId
  parentId: Schema.Types.ObjectId
  body: string
  createdAt: Date
  updatedAt: Date
  replies: number
  like: number
  status: Status
  rejectComment: string
}

import { GetAllPostCommentDto, GetByIdPostCommentDto, UpdatePostCommentDto,GetCountPostCommentDto } from './Admin'

export { GetAllPostCommentDto, GetByIdPostCommentDto, UpdatePostCommentDto, GetCountPostCommentDto }
