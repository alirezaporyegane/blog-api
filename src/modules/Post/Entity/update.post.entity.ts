import { PostsType } from '.'

export type UpdatePostsEntity = Omit<PostsType, 'createdAt' | 'updatedAt'>

export type UpdateParams = {
  id: string
}
