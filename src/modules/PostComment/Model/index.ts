import { Schema, model } from 'mongoose'
import { PostCommentsModel, PostCommentsType } from '../Entity'

const ObjectId = Schema.ObjectId

// POST COMMENTS SCHEMA
const postCommentsSchema = new Schema<PostCommentsType, PostCommentsModel>({
  body: {
    type: String,
    required: true
  },
  like: {
    type: Number,
    required: true,
    default: 0
  },
  replies: {
    type: Number,
    required: true,
    default: 0
  },
  parentId: {
    type: ObjectId,
    ref: 'PostComments'
  },
  postId: {
    type: ObjectId,
    ref: 'Posts'
  },
  userId: {
    type: ObjectId,
    ref: 'Account'
  },
  status: {
    type: String,
    default: 'PENDING',
    required: true
  },
  rejectComment: {
    type: String,
    default: ''
  }
})

export default model('PostComments', postCommentsSchema)
