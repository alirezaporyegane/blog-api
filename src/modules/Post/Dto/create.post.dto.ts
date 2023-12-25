import { PostsType } from '.'

export type CreatePostsDto = Omit<PostsType, '_id' | 'createdAt' | 'updatedAt'>