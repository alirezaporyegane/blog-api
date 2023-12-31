import { hash } from 'bcrypt'
import { Request, Response } from 'express'
import { pick } from 'lodash'
import { isValidObjectId } from 'mongoose'
import {
  errorStatus400,
  errorStatus409,
  errorStatus500,
  errorStatusObjectId
} from '../../../middleware/ErrorMessage'
import StatusCodes from '../../../middleware/StatusCodes'
import { QueryBuilder } from '../../../utils/queryBuilder'
import AccountModel from '../../Shared/Account/Model/account.model'
import {
  CreateDtoIn,
  CreateDtoOut,
  Filters,
  GetAllDtoIn,
  GetAllDtoOut,
  GetByIdDtoOut,
  UpdateDtoIn,
  UpdateDtoOut
} from '../Dto'
import {
  userUpdatePasswordValidator,
  userUpdateValidator,
  userValidator
} from '../Validator/users.validator'

/**
 * GET ALL MODEL
 * @method (GET) /api/admin/users
 */
export const getAll = async (
  req: Request<{}, {}, {}, GetAllDtoIn>,
  res: Response<GetAllDtoOut[]>
) => {
  try {
    let filter: Filters | {} = {}

    const queryBuilder = new QueryBuilder(filter)
    queryBuilder.objectId('_id', req.query.id)
    queryBuilder.regex('userName', req.query.userName)
    queryBuilder.regex('firstName', req.query.firstName)
    queryBuilder.regex('lastName', req.query.lastName)
    queryBuilder.regex('phoneNumber', req.query.phoneNumber)
    queryBuilder.regex('email', req.query.email)
    queryBuilder.regex('job', req.query.job)
    queryBuilder.regex('nationalId', req.query.nationalId)
    queryBuilder.boolean('confirmEmail', req.query.confirmEmail)
    queryBuilder.boolean('confirmPhoneNumber', req.query.confirmPhoneNumber)
    queryBuilder.boolean('confirmedProfile', req.query.confirmedProfile)
    queryBuilder.boolean('suspended', req.query.suspended)

    const Account = AccountModel.find<GetAllDtoOut>({
      ...queryBuilder.getFilters,
      _id: { $nin: req.user._id }
    }).select([
      '_id',
      'userName',
      'firstName',
      'lastName',
      'phoneNumber',
      'email',
      'confirmEmail',
      'confirmPhoneNumber',
      'confirmedProfile',
      'suspended',
      'birthDate',
      'job',
      'nationalId',
      'status'
    ])
    const size = req.query.size ? +req.query.size : 10
    if (req.query.page) Account.skip((+req.query.page - 1) * size)
    if (req.query.size) Account.limit(size)
    if (req.query.sortColumn && req.query.sortType)
      Account.sort({ [req.query.sortColumn]: req.query.sortType })

    const items = await Account

    res.status(200).json(items)
  } catch (err) {
    errorStatus500(res, err)
  }
}

/**
 * GET MODEL COUNT
 * @method (GET) /api/admin/users/count
 */
export const getCount = async (req: Request<{}, {}, {}, GetAllDtoIn>, res: Response<number>) => {
  try {
    let filter: Filters | {} = {}

    const queryBuilder = new QueryBuilder(filter)
    queryBuilder.objectId('_id', req.query.id)
    queryBuilder.regex('userName', req.query.userName)
    queryBuilder.regex('firstName', req.query.firstName)
    queryBuilder.regex('lastName', req.query.lastName)
    queryBuilder.regex('phoneNumber', req.query.phoneNumber)
    queryBuilder.regex('email', req.query.email)
    queryBuilder.boolean('confirmEmail', req.query.confirmEmail)
    queryBuilder.boolean('confirmPhoneNumber', req.query.confirmPhoneNumber)
    queryBuilder.boolean('confirmedProfile', req.query.confirmedProfile)
    queryBuilder.boolean('suspended', req.query.suspended)

    const count = await AccountModel.find<number>({
      ...queryBuilder.getFilters,
      _id: { $nin: req.user._id }
    }).countDocuments()

    res.status(200).json(count)
  } catch (err) {
    errorStatus500(res, err)
  }
}

/**
 * GET MODEL BY ID
 * @method (GET) /api/admin/users/:id
 */
export const getById = async (
  req: Request<{ id: string }>,
  res: Response<Partial<GetByIdDtoOut>>
) => {
  try {
    const id = req.params.id
    if (!isValidObjectId(id)) return errorStatusObjectId(res)

    const item = await AccountModel.findById<GetByIdDtoOut>(id)

    const response = pick<GetByIdDtoOut>(item, [
      '_id',
      'userName',
      'firstName',
      'lastName',
      'email',
      'phoneNumber',
      'confirmEmail',
      'confirmedProfile',
      'confirmPhoneNumber',
      'birthDate',
      'job',
      'role',
      'gender',
      'legality',
      'nationalId',
      'suspended'
    ])
    res.status(200).json(response)
  } catch (err) {
    errorStatus500(res, err)
  }
}

/**
 * CREATE MODEL
 * @method (POST) /api/admin/users
 */
export const create = async (
  req: Request<{}, CreateDtoIn>,
  res: Response<Partial<CreateDtoOut>>
) => {
  try {
    const body = pick<CreateDtoIn>(req.body, [
      'userName',
      'firstName',
      'lastName',
      'email',
      'phoneNumber',
      'confirmEmail',
      'confirmedProfile',
      'password',
      'confirmPassword',
      'confirmPhoneNumber',
      'birthDate',
      'legality',
      'gender',
      'role',
      'job',
      'nationalId',
      'suspended'
    ])

    const { error } = userValidator(body)
    if (error) return errorStatus400(res, error)

    const isUserExist = await AccountModel.findOne({
      phoneNumber: body.phoneNumber
    })
    if (!!isUserExist) return errorStatus409(res, StatusCodes.account.USER_EXIST)

    body.password = await hash(req.body.password, 12)
    const { confirmPassword, ...rest } = body

    await AccountModel.create<Partial<CreateDtoIn>>(rest)
    const response = pick(body, [
      'userName',
      'firstName',
      'lastName',
      'email',
      'phoneNumber',
      'confirmEmail',
      'confirmedProfile',
      'confirmPhoneNumber',
      'birthDate',
      'legality',
      'job',
      'gender',
      'nationalId',
      'suspended'
    ])

    res.status(200).json(response)
  } catch (err) {
    errorStatus500(res, err)
  }
}

/**
 * UPDATE MODEL BY ID
 * @method (PUT) /api/admin/users/:id/password
 */
export const updatePasswordById = async (
  req: Request<{ id: string }, { newPassword: string; confirmNewPassword: string }>,
  res: Response<unknown>
) => {
  try {
    const id = req.params.id
    if (!isValidObjectId(id)) return errorStatusObjectId(res)

    const body = pick<{ newPassword: string; confirmNewPassword: string }>(req.body, [
      'newPassword',
      'confirmNewPassword'
    ])

    const { error } = userUpdatePasswordValidator(body)
    if (error) return errorStatus400(res, error)

    const user = await AccountModel.findById(id)
    if (!user) return errorStatus409(res, StatusCodes.account.USER_NOT_FOUND)

    user.password = await hash(req.body.newPassword, 12)
    await user.save()

    res.status(200).json('success')
  } catch (err) {
    errorStatus500(res, err)
  }
}

/**
 * UPDATE MODEL BY ID
 * @method (PUT) /api/admin/users/:id
 */
export const update = async (
  req: Request<{ id: string }, UpdateDtoIn>,
  res: Response<Partial<UpdateDtoOut>>
) => {
  try {
    const id = req.params.id
    if (!isValidObjectId(id)) return errorStatusObjectId(res)

    const body = pick<UpdateDtoIn>(req.body, [
      'userName',
      'firstName',
      'lastName',
      'email',
      'phoneNumber',
      'confirmEmail',
      'confirmedProfile',
      'confirmPhoneNumber',
      'legality',
      'role',
      'gender',
      'birthDate',
      'job',
      'nationalId',
      'suspended'
    ])

    const { error } = userUpdateValidator(body)
    if (error) return errorStatus400(res, error)

    const isUserExist = await AccountModel.findOne({
      phoneNumber: body.phoneNumber,
      _id: { $ne: id }
    })
    if (!!isUserExist) return errorStatus409(res, StatusCodes.account.USER_EXIST)

    await AccountModel.findByIdAndUpdate<Partial<UpdateDtoIn>>(id, body)
    const response = pick(body, [
      'userName',
      'firstName',
      'lastName',
      'email',
      'phoneNumber',
      'confirmEmail',
      'confirmedProfile',
      'confirmPhoneNumber',
      'birthDate',
      'legality',
      'job',
      'nationalId',
      'suspended'
    ])

    res.status(200).json(response)
  } catch (err) {
    errorStatus500(res, err)
  }
}

/**
 * DELETE MODEL BY ID
 * @method (DELETE) /api/admin/users/:id
 */
export const remove = async (req: Request<{ id: string }>, res: Response<string>) => {
  try {
    const id = req.params.id
    if (!isValidObjectId(id)) return errorStatusObjectId(res)

    await AccountModel.deleteOne({ _id: id })

    res.status(200).json('success')
  } catch (err) {
    errorStatus500(res, err)
  }
}
