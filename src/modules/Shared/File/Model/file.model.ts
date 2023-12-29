import { Schema, model } from 'mongoose'
import { FileModel, FileType } from '../Entity'

// FILE SCHEMA
const fileSchema = new Schema<FileType, FileModel>(
  {
    images: [
      {
        type: String,
        trim: true,
        required: true
      }
    ]
  },
  { versionKey: false }
)

export default model('Files', fileSchema)
