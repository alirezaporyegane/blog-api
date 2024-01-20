import { PostCommentsType } from '../index'

export type GetByIdPostCommentDto = Pick<
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
