import { Role } from '../Entity/account.entity'

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
