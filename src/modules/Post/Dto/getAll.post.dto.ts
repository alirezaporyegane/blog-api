import { PostsType } from '.'

export type GetAllPostsDto = Pick<
  PostsType,
  '_id' | 'name' | 'active' | 'image' | 'slug' | 'createdAt' | 'publish'
>
