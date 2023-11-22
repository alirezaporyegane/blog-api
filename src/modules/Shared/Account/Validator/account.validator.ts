import joi from 'joi'
import { IAccountLoginEntity, IAccountRegister } from '../Entity/account.entity'

export const registerValidator = (data: IAccountRegister) => {
  const schema = joi.object({
    phoneNumber: joi.string().required(),
    password: joi.string().required(),
    confirmPassword: joi.ref('password'),
    firstName: joi.string().allow(null).allow(''),
    lastName: joi.string().allow(null).allow(''),
    userName: joi.string().required(),
    email: joi.string().required(),
    uniqueId: joi.string().required()
  })

  return schema.validate(data)
}

export const loginValidator = (data: IAccountLoginEntity) => {
  const schema = joi.object({
    phoneNumber: joi.string().required(),
    password: joi.string().min(6).max(50).required(),
    uniqueId: joi.string().required()
  })

  return schema.validate(data)
}
