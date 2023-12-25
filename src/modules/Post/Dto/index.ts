import { Schema } from 'mongoose'

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
  publish: Date
  createdAt: Date
  updatedAt: Date
}

import { GetAllPostsDto } from './getAll.post.dto'
import { GetByIdPostsDto } from './getById.post.dto'
import { CreatePostsDto } from './create.post.dto'
import { GetCountPostsDto } from './getCount.post.dto'
import { UpdatePostsDto } from './update.post.dto'
import { DeletePostDto } from './delete.post.dto'

export {
  GetAllPostsDto,
  GetByIdPostsDto,
  CreatePostsDto,
  GetCountPostsDto,
  UpdatePostsDto,
  DeletePostDto
}
