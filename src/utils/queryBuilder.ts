interface Filter {
  [key: string]: unknown
}

export class queryBuilder<T extends Filter> {
  constructor(public filter: T) {}

  regex(type:  Record<T, string>, query: unknown) {
    if (type && query) this.filter[type] = query
  }

  number() {}

  boolean() {}

  filters() {}
}
