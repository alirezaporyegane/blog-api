import joi from 'joi'
import { CreateDtoIn } from '../Dto'

export const userValidator = (data: Partial<CreateDtoIn>) => {
  const schema = joi.object<CreateDtoIn>({
    userName: joi.string().required(),
    firstName: joi.string().allow(null).allow(''),
    lastName: joi.string().allow(null).allow(''),
    email: joi.string().email().required(),
    phoneNumber: joi.string().required(),
    confirmedProfile: joi.boolean(),
    emailConfirmed: joi.boolean(),
    phoneNumberConfirmed: joi.boolean(),
    password: joi.string().required(),
    confirmPassword: joi.ref('password'),
    suspended: joi.boolean(),
    birthDate: joi.allow(null).allow(''),
    job: joi.allow(null).allow(''),
    nationalId: joi.allow(null).allow('')
  })

  return schema.validate(data)
}
