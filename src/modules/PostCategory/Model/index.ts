import mongoose, { Schema } from 'mongoose'
import { PostCategoryEntity, PostCategoryModel } from './../Entity/postCategory.entity'

const postCategorySchema = new Schema<PostCategoryEntity, PostCategoryModel>(
  {
    name: {
      type: String,
      required: true
    },
    altName: {
      type: String
    },
    slug: {
      type: String,
      required: true
    },
    parentId: {
      type: String
    },
    published: {
      type: Date
    },
    active: {
      type: Boolean
    },
    image: {
      type: String
    },
    metaTitle: {
      type: String
    },
    metaDescription: {
      type: String,
      maxlength: 600
    },
    sortOrder: {
      type: Number,
      required: true
    }
  },
  { versionKey: false, timestamps: true }
)

export default mongoose.model('PostCategory', postCategorySchema)
