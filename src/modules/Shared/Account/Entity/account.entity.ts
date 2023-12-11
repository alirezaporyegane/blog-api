import { Model } from 'mongoose'

export enum Role {
  WRITER = 'WRITER',
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export enum Status {
  ACTIVE = 'ACTIVE',
  BANNED = 'BANNED',
  NOT_ACTIVE = 'NOT_ACTIVE'
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export interface IAccount {
  _id: string
  firstName: string
  lastName: string
  userName: string
  email: string
  phoneNumber: string
  legality: 0 | 1
  password: string
  role: Role[]
  image: string
  confirmEmail: boolean
  confirmPhoneNumber: boolean
  confirmedProfile: boolean
  birthDate: Date
  uniqueId: string
  job: string
  nationalId: string
  gender: Gender.MALE | Gender.FEMALE
  suspended: boolean
  status: Status.ACTIVE | Status.BANNED | Status.NOT_ACTIVE
}

export interface IAccountMethods {
  generateToken: () => string
  generateRefreshToken: () => string
}

export type AccountModel = Model<IAccount, {}, IAccountMethods>

export type IData = Pick<
  IAccount,
  | '_id'
  | 'phoneNumber'
  | 'email'
  | 'userName'
  | 'firstName'
  | 'lastName'
  | 'role'
  | 'confirmEmail'
  | 'confirmPhoneNumber'
  | 'uniqueId'
  | 'suspended'
>

export type IAccountRegister = Pick<
  IAccount,
  'phoneNumber' | 'password' | 'firstName' | 'lastName' | 'userName' | 'email' | 'uniqueId'
> & {
  confirmPassword: string
}

export type IAccountLoginEntity = Pick<IAccount, 'phoneNumber' | 'password' | 'uniqueId'>
