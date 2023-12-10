import { Types, isValidObjectId } from 'mongoose'

type Filter = {
  [key: string]: unknown
}

export class QueryBuilder {
  constructor(private filter: Filter) {}

  regex(type: keyof typeof this.filter, query: any) {
    if (type && query) this.filter[type] = { $regex: query }
  }

  string(type: keyof typeof this.filter, query: any) {
    if (type && query) this.filter[type] = query
  }

  number(type: keyof typeof this.filter, query: any) {
    if (type && query) this.filter[type] = Number(query)
  }

  boolean(type: keyof typeof this.filter, query: any) {
    if (type && query) this.filter[type] = Boolean(query)
  }

  objectId(type: keyof typeof this.filter, query: any) {
    if (type && query && typeof query === 'string' && isValidObjectId(query))
      this.filter[type] = new Types.ObjectId(query)
  }

  get getFilters() {
    return this.filter
  }
}
