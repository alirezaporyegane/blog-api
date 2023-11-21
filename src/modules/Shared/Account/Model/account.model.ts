import mongoose, { Schema } from 'mongoose'

// Account Scheme
const accountSchema = new Schema(
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
        enum: ['writer', 'admin', 'user'],
        default: 'user'
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
      type: String,
      required: true
    },
    job: {
      type: String
    },
    nationalId: {
      type: String
    }
  },
  { versionKey: false }
)

export default mongoose.model('Account', accountSchema)
