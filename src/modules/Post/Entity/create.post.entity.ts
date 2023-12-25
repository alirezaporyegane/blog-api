import { PostsType } from '.'

export type CreatePostsEntity = Omit<PostsType, '_id' | 'createdAt' | 'updatedAt'>
