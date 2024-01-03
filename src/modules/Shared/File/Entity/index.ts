import { Model } from 'mongoose'

export type FileType = {
  images: string[]
}

export type FileModel = Model<FileType, {}>

import { CreateFileEntity } from './create.file.entity'
import { DeleteFileEntity } from './delete.file.entity'

export { CreateFileEntity, DeleteFileEntity }
