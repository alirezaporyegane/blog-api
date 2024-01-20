import { PostCommentsType } from '../index'

export type UpdatePostCommentPublicParams = {
  id: string
}

export type UpdatePostCommentPublicEntity = Pick<
  PostCommentsType,
  'body' | 'postId' | 'parentId' | 'status' | 'userId' | 'replies'
>
