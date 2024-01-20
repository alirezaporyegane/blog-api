import { PostCommentsType } from '../index'

export type GetAllPostCommentPublicDto = Pick<
  PostCommentsType,
  '_id' | 'createdAt' | 'userId' | 'postId' | 'parentId' | 'like' | 'status'
>
