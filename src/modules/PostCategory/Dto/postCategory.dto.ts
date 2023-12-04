import { Schema } from 'mongoose'

export interface PostCategoryDto {
  _id: Schema.Types.ObjectId | string | number
  name: string
  altName: string
  slug: string
  parentId: string
  metaTitle: string
  metaDescription: string
  image: string
  sortOrder: number
  active: boolean
  published: Date
}
