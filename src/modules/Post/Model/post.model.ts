import { Schema, model } from 'mongoose'
import { PostModel, PostsType } from './../Entity'

const postSchema = new Schema<PostsType, PostModel>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  lead: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  header: {
    type: String,
    trim: true
  },
  excerpt: {
    type: String,
    trim: true
  },
  body: {
    type: String,
    required: true
  },
  publish: {
    type: Date,
    required: true,
    trim: true
  },
  metaTitle: {
    type: String,
    trim: true
  },
  metaDescription: {
    type: String,
    trim: true
  },
  active: {
    type: Boolean
  },
  categoryId: {
    type: Object,
    ref: 'PostCategory'
  }
}, { timestamps: true, versionKey: false })

export default model('Posts', postSchema)
