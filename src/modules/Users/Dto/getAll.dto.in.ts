export type Filters = {
  _id: string
  userName: { $regex: string } | null
  firstName: { $regex: string } | null
  lastName: { $regex: string } | null
  email: { $regex: string } | null
  phoneNumber: { $regex: string } | null
  emailConfirmed: boolean
  phoneNumberConfirmed: boolean
  suspended: boolean
}

export type GetAllDtoIn = {
  page: string
  size: string
  sortColumn: string
  sortType: 'asc' | 'desc'
  id: string
  userName: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  emailConfirmed: boolean
  confirmedProfile: boolean
  phoneNumberConfirmed: boolean
  suspended: boolean
}