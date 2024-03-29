import { Model, Schema } from 'mongoose'

export type PostsType = {
  _id: Schema.Types.ObjectId
  name: string
  image: string
  header: string
  excerpt: string
  slug: string
  lead: string
  body: string
  metaTitle: string
  metaDescription: string
  active: boolean
  categoryId: Schema.Types.ObjectId
  userId: string
  publish: Date
  tags: string[]
  like: number
  rate: number
  readTime: number
  view: number
  comments: number
  createdAt: Date
  updatedAt: Date
}

import { CreatePostsEntity } from './create.post.entity'
import { DeletePostsEntity } from './delete.post.entity'
import { GetAllPostsEntity, GetAllPostsFilter } from './getAll.post.entity'
import { GetByIdEntity } from './getById.post.entity'
import { GetCountPostsEntity, GetCountPostsFilter } from './getCount.post.entity'
import { UpdateParams, UpdatePostsEntity } from './update.post.entity'

export type PostModel = Model<PostsType, {}>

export {
  CreatePostsEntity,
  DeletePostsEntity,
  GetAllPostsEntity,
  GetAllPostsFilter,
  GetByIdEntity,
  GetCountPostsEntity,
  GetCountPostsFilter,
  UpdateParams,
  UpdatePostsEntity
}
