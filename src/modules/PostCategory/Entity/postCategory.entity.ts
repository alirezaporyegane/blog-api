import { Model } from 'mongoose'

export interface PostCategoryEntity {
  name: string
  altName: string
  slug: string
  parentId: string | null
  metaTitle: string
  metaDescription: string
  image: string
  sortOrder: number
  active: boolean
  published: Date
}

export type PostCategoryModel = Model<PostCategoryEntity, {}>
