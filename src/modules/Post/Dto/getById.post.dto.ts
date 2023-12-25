import { PostsType } from '.'

export type GetByIdPostsDto = Omit<PostsType, 'createdAt' | 'updatedAt'>
