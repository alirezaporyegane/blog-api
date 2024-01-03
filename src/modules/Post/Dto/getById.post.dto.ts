import { ObjectId } from 'mongoose';
import { PostsType } from '.'

export type GetByIdPostsDto = Omit<PostsType, 'createdAt' | 'updatedAt'> & {
  category: { value: string | number | ObjectId; text: string }
}
