import { IAccount, Role } from '../Entity/account.entity'

export interface IAccountRegisterDto {
  _id: string
  userName: string
  phoneNumber: string
  email: string
  role: Role[]
  firstName: string
  lastName: string
  token: string
  refreshToken: string
  ttl: number
  refreshTtl: number
}

export interface IAccountLoginDto extends IAccountRegisterDto {}

export interface IAccountRefreshTokenDto {
  token: string
  ttl: number
}

export type IAccountProfile = Omit<
  IAccount,
  'password' | 'role' | 'suspended' | 'uniqueId' | 'userName' | 'status' | '_id'
>
