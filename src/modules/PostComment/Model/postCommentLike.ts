import { Schema, model } from 'mongoose'
import { PostCommentLikesModel, PostCommentLikesType } from '../Entity'

const ObjectId = Schema.ObjectId

// POST COMMENTS LIKE SCHEMA
const PostCommentLike = new Schema<PostCommentLikesType, PostCommentLikesModel>({
  userId: {
    type: ObjectId,
    ref: 'Account',
    required: true
  },
  postCommentId: {
    type: ObjectId,
    ref: 'PostComments',
    required: true
  }
})

export default model('PostCommentLike', PostCommentLike)
