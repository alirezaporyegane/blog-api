import { Model, Schema } from 'mongoose'

export type Status = 'CONFIRM' | 'REJECTED' | 'PENDING'

export type PostCommentsType = {
  _id: Types.ObjectId
  userId: Types.ObjectId
  postId: Types.ObjectId
  parentId: Types.ObjectId
  body: string
  createdAt: Date
  updatedAt: Date
  replies: number
  like: number
  status: Status
  rejectComment: string
}

export type PostCommentLikesType = {
  _id: Types.ObjectId
  userId: Types.ObjectId
  postCommentId: Types.ObjectId
}

export type PostCommentsModel = Model<PostCommentsType, {}>

export type PostCommentLikesModel = Model<PostCommentLikesType, {}>

import {
  GetAllPostCommentEntity,
  GetAllPostCommentFilter,
  GetByIdPostCommentEntity,
  GetCountPostCommentEntity,
  GetCountPostCommentFilter,
  UpdatePostCommentEntity
} from './Admin'

import {
  CreatePostCommentPublicEntity,
  GetAllPostCommentPublicEntity,
  GetAllPostCommentPublicFilter,
  GetByIdPostCommentPublicEntity,
  GetCountPostCommentPublicEntity,
  GetCountPostCommentPublicFilter,
  LikePostCommentPublicParams,
  UpdatePostCommentPublicEntity,
  UpdatePostCommentPublicParams
} from './Public'
import { Types } from 'mongoose'

export {
  CreatePostCommentPublicEntity,
  GetAllPostCommentEntity,
  GetAllPostCommentFilter,
  GetAllPostCommentPublicEntity,
  GetAllPostCommentPublicFilter,
  GetByIdPostCommentEntity,
  GetByIdPostCommentPublicEntity,
  GetCountPostCommentEntity,
  GetCountPostCommentFilter,
  GetCountPostCommentPublicEntity,
  GetCountPostCommentPublicFilter,
  LikePostCommentPublicParams,
  UpdatePostCommentEntity,
  UpdatePostCommentPublicEntity,
  UpdatePostCommentPublicParams
}
