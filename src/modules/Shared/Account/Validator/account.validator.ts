import joi from 'joi'
import { IAccountProfile } from '../Dto/account.dto'
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

export const updateProfileValidator = (data: IAccountProfile) => {
  const schema = joi.object({
    phoneNumber: joi.string().required(),
    firstName: joi.string().allow(null).allow(''),
    lastName: joi.string().allow(null).allow(''),
    legality: joi.number().integer().valid(0).valid(1).allow(null).allow(''),
    image: joi.string().allow(null).allow(''),
    confirmEmail: joi.boolean(),
    confirmPhoneNumber: joi.boolean(),
    confirmedProfile: joi.boolean(),
    email: joi.string().required(),
    birthDate: joi.allow(null).allow(''),
    job: joi.allow(null).allow(''),
    nationalId: joi.allow(null).allow(''),
    gender: joi.string().valid('MALE').valid('FEMALE').allow(null).allow('')
  })

  return schema.validate(data)
}
