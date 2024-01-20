import { PostCommentsType } from '../index'

export type GetAllPostCommentDto = Pick<
  PostCommentsType,
  '_id' | 'createdAt' | 'userId' | 'postId' | 'parentId' | 'like' | 'status'
>
