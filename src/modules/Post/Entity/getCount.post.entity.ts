import { Types } from 'mongoose'
import { PostsType } from '.'

export type GetCountPostsEntity = {
  id: string
} & Pick<PostsType, 'name' | 'slug' | 'active' | 'publish' | 'createdAt' | 'categoryId'>

export type GetCountPostsFilter = {
  _id: string
  name: { $regex: string } | null
  slug: { $regex: string } | null
  active: boolean
  publish: string
  createdAt: string
  categoryId: Types.ObjectId
}
