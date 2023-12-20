import joi from 'joi'
import { CreateDtoIn, UpdateDtoIn } from '../Dto'

export const userValidator = (data: Partial<CreateDtoIn>) => {
  const schema = joi.object<CreateDtoIn>({
    userName: joi.string().required(),
    firstName: joi.string().allow(null).allow(''),
    lastName: joi.string().allow(null).allow(''),
    email: joi.string().email().required(),
    phoneNumber: joi.string().required(),
    confirmedProfile: joi.boolean(),
    confirmEmail: joi.boolean(),
    confirmPhoneNumber: joi.boolean(),
    role: joi.array().items(joi.string().required().valid('WRITER').valid('ADMIN').valid('USER')),
    gender: joi.string().valid('MALE').valid('FEMALE').allow(null).allow(''),
    password: joi.string().required(),
    confirmPassword: joi.ref('password'),
    suspended: joi.boolean(),
    birthDate: joi.allow(null).allow(''),
    legality: joi.number().integer().allow(null).allow(''),
    job: joi.allow(null).allow(''),
    nationalId: joi.allow(null).allow('')
  })

  return schema.validate(data)
}

export const userUpdateValidator = (data: Partial<UpdateDtoIn>) => {
  const schema = joi.object<CreateDtoIn>({
    userName: joi.string().required(),
    firstName: joi.string().allow(null).allow(''),
    lastName: joi.string().allow(null).allow(''),
    email: joi.string().email().required(),
    phoneNumber: joi.string().required(),
    confirmedProfile: joi.boolean(),
    confirmEmail: joi.boolean(),
    confirmPhoneNumber: joi.boolean(),
    role: joi.array().items(joi.string().required().valid('WRITER').valid('ADMIN').valid('USER')),
    gender: joi.string().valid('MALE').valid('FEMALE').allow(null).allow(''),
    suspended: joi.boolean(),
    birthDate: joi.allow(null).allow(''),
    legality: joi.number().integer().allow(null).allow(''),
    job: joi.allow(null).allow(''),
    nationalId: joi.allow(null).allow('')
  })

  return schema.validate(data)
}

export const userUpdatePasswordValidator = (
  data: Partial<{
    newPassword: string
    confirmNewPassword: string
  }>
) => {
  const schema = joi.object<{
    newPassword: string
    confirmNewPassword: string
  }>({
    newPassword: joi.string().required(),
    confirmNewPassword: joi.ref('newPassword')
  })

  return schema.validate(data)
}
