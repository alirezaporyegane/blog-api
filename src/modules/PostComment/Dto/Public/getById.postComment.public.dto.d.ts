import { PostCommentsType } from '../index'

export type GetByIdPostCommentPublicDto = Pick<
  PostCommentsType,
  | '_id'
  | 'createdAt'
  | 'userId'
  | 'postId'
  | 'parentId'
  | 'like'
  | 'status'
  | 'body'
  | 'rejectComment'
  | 'replies'
  | 'updatedAt'
>
