import { Status } from '../index'

export type UpdatePostCommentParams = {
  _id: string
}

export type UpdatePostCommentEntity = {
  _id: string
  status: Status
  rejectComment?: string
}
