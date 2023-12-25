import { PostsType } from '.'

export type UpdatePostsDto = Omit<PostsType, 'createdAt' | 'updatedAt'>
