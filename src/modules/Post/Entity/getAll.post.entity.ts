import { Types } from 'mongoose'
import { PostsType } from '.'

export type GetAllPostsEntity = {
  page: string
  size: string
  sortColumn: string
  sortType: 'asc' | 'desc'
  id: string
} & Pick<PostsType, 'name' | 'slug' | 'active' | 'publish' | 'createdAt' | 'categoryId'>

export type GetAllPostsFilter = {
  _id: string
  name: { $regex: string } | null
  slug: { $regex: string } | null
  active: boolean
  publish: string
  createdAt: string
  categoryId: Types.ObjectId
}
