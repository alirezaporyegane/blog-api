import { ObjectId } from 'mongoose'

export type Filters = {
  _id: string
  userName: string
}

export type Query = {
  skip: string
  limit: string
  sort: string
  id: string
  userName: string
}
