import { PostCommentsType } from '../index'

export type CreatePostCommentPublicEntity = Pick<
  PostCommentsType,
  'body' | 'postId' | 'parentId' | 'like' | 'replies' | 'status' | 'userId'
>
