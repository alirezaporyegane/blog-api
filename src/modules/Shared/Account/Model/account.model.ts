import config from 'config'
import Jwt from 'jsonwebtoken'
import mongoose, { Schema } from 'mongoose'
import {
  AccountModel,
  Gender,
  IAccount,
  IAccountMethods,
  IData,
  Role,
  Status
} from '../Entity/account.entity'

// Account Scheme
const accountSchema = new Schema<IAccount, AccountModel, IAccountMethods>(
  {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    userName: {
      type: String
    },
    email: {
      type: String
    },
    phoneNumber: {
      type: String,
      unique: true
    },
    legality: {
      type: Number,
      enum: [0, 1]
    },
    password: {
      type: String
    },
    role: [
      {
        type: String,
        enum: Role,
        default: 'USER'
      }
    ],
    image: {
      type: String
    },
    confirmEmail: {
      type: Boolean,
      default: false
    },
    confirmPhoneNumber: {
      type: Boolean,
      default: false
    },
    confirmedProfile: {
      type: Boolean,
      default: false
    },
    birthDate: {
      type: Date
    },
    uniqueId: {
      type: String
    },
    job: {
      type: String
    },
    nationalId: {
      type: String
    },
    suspended: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: Status,
      default: Status.NOT_ACTIVE
    },
    gender: {
      type: String,
      enum: Gender
    }
  },
  { versionKey: false }
)

accountSchema.methods.generateToken = function () {
  const data: IData = {
    _id: this._id,
    phoneNumber: this.phoneNumber,
    email: this.email,
    userName: this.userName,
    firstName: this.firstName,
    lastName: this.lastName,
    role: this.role,
    confirmEmail: this.confirmEmail,
    confirmPhoneNumber: this.confirmPhoneNumber,
    uniqueId: this.uniqueId,
    suspended: this.suspended
  }

  return Jwt.sign(data, 'hig%n+t0h2nxoxr@!jk5l(t3&7-y0%zvggv94ne8$pg$5a%$%v')
}

accountSchema.methods.generateRefreshToken = function () {
  const data: IData = {
    _id: this._id,
    phoneNumber: this.phoneNumber,
    email: this.email,
    userName: this.userName,
    firstName: this.firstName,
    lastName: this.lastName,
    role: this.role,
    confirmEmail: this.confirmEmail,
    confirmPhoneNumber: this.confirmPhoneNumber,
    uniqueId: this.uniqueId,
    suspended: this.suspended
  }

  return Jwt.sign(data, 'hig%n+t0h2nxoxr@!jk5l(t3&7-y0%zvggv94ne8$pg$5a%$%v')
}

export default mongoose.model('Account', accountSchema)
