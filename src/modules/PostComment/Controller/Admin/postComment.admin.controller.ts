import { Request, Response } from 'express'
import { pick } from 'lodash'
import { isValidObjectId } from 'mongoose'
import {
  errorStatus400,
  errorStatus500,
  errorStatusObjectId
} from '../../../../middleware/ErrorMessage'
import StatusCodes from '../../../../middleware/StatusCodes'
import { QueryBuilder } from '../../../../utils/queryBuilder'
import { GetAllPostCommentDto, GetByIdPostCommentDto, GetCountPostCommentDto } from '../../Dto'
import {
  GetAllPostCommentEntity,
  GetAllPostCommentFilter,
  GetByIdPostCommentEntity,
  GetCountPostCommentEntity,
  GetCountPostCommentFilter,
  UpdatePostCommentEntity
} from '../../Entity'
import { UpdatePostCommentParams } from '../../Entity/Admin/update.postComment.entity'
import PostCommentsModel from '../../Model'
import { updateValidator } from '../../Validator/Admin/postComment.admin.validator'

/**
 * GET ALL MODEL
 * @method (GET) /api/admin/post-comments
 */
export const getAll = async (
  req: Request<{}, {}, {}, GetAllPostCommentEntity>,
  res: Response<GetAllPostCommentDto[]>
) => {
  try {
    let filter: GetAllPostCommentFilter | {} = {}
    const queryBuilder = new QueryBuilder(filter)
    queryBuilder.objectId('_id', req.query.id)
    queryBuilder.objectId('userId', req.query.userId)
    queryBuilder.objectId('postId', req.query.postId)
    queryBuilder.boolean('status', req.query.status)
    queryBuilder.string('createdAt', req.query.createdAt)

    const postComments = PostCommentsModel.find<GetAllPostCommentDto>(filter).select([
      '_id',
      'createdAt',
      'userId',
      'postId',
      'parentId',
      'like',
      'status'
    ])

    const size = req.query.size ? +req.query.size : 10
    if (req.query.page) postComments.skip((+req.query.page - 1) * size)
    if (req.query.size) postComments.limit(size)
    if (req.query.sortColumn && req.query.sortType)
      postComments.sort({ [req.query.sortColumn]: req.query.sortType })

    const items = await postComments

    res.status(200).json(items)
  } catch (err) {
    errorStatus500(res, err)
  }
}

/**
 * GET MODEL COUNT
 * @method (GET) /api/admin/post-comments/count
 */
export const getCount = async (
  req: Request<{}, {}, {}, GetCountPostCommentEntity>,
  res: Response<GetCountPostCommentDto>
) => {
  try {
    let filter: GetCountPostCommentFilter | {} = {}
    const queryBuilder = new QueryBuilder(filter)
    queryBuilder.objectId('_id', req.query.id)
    queryBuilder.objectId('userId', req.query.userId)
    queryBuilder.objectId('postId', req.query.postId)
    queryBuilder.boolean('status', req.query.status)
    queryBuilder.string('createdAt', req.query.createdAt)

    const count = await PostCommentsModel.find<GetCountPostCommentDto>(filter).countDocuments()

    res.status(200).json(count)
  } catch (err) {
    errorStatus500(res, err)
  }
}

/**
 * GET MODEL BY Id
 * @method (GET) /api/admin/post-comment/:id
 */
export const getById = async (
  req: Request<GetByIdPostCommentEntity>,
  res: Response<Partial<GetByIdPostCommentDto>>
) => {
  try {
    const id = req.params.id
    if (!isValidObjectId(id)) return errorStatusObjectId(res)

    const item = await PostCommentsModel.findById<GetByIdPostCommentDto>(id)
    let response = pick<GetByIdPostCommentDto>(item, [
      '_id',
      'createdAt',
      'userId',
      'postId',
      'parentId',
      'like',
      'status',
      'body',
      'rejectComment',
      'replies',
      'updatedAt',
      'readTime'
    ])

    res.status(200).json(response)
  } catch (err) {
    errorStatus500(res, err)
  }
}

/**
 * UPDATE MODEL BY Id
 * @method (PUT) /api/admin/post-comment/:id
 */
export const update = async (
  req: Request<UpdatePostCommentParams, UpdatePostCommentEntity>,
  res: Response
) => {
  try {
    const id = req.params._id
    if (!isValidObjectId(id)) return errorStatusObjectId(res)

    const body = pick<UpdatePostCommentEntity>(req.body, ['_id', 'status', 'rejectComment'])
    const { error } = updateValidator(body)
    if (error) errorStatus400(res, error)

    const item = await PostCommentsModel.findById(id)
    if (!item) return errorStatus400(res, StatusCodes.postComment.POST_COMMENTS_NOT_FOUND)

    if (typeof body.status === 'boolean') item.status = body.status

    await item?.save()

    res.status(200).json('success')
  } catch (err) {
    errorStatus500(res, err)
  }
}
