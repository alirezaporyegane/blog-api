import { Request, Response } from 'express'
import { pick } from 'lodash'
import { Schema, Types, isValidObjectId } from 'mongoose'
import {
  errorStatus400,
  errorStatus417,
  errorStatus500,
  errorStatusObjectId
} from '../../../../middleware/ErrorMessage'
import StatusCodes from '../../../../middleware/StatusCodes'
import { QueryBuilder } from '../../../../utils/queryBuilder'
import {
  GetAllPostCommentPublicDto,
  GetByIdPostCommentPublicDto,
  GetCountPostCommentPublicDto
} from '../../Dto/Public'
import {
  CreatePostCommentPublicEntity,
  GetAllPostCommentPublicEntity,
  GetAllPostCommentPublicFilter,
  GetByIdPostCommentPublicEntity,
  GetCountPostCommentPublicEntity,
  GetCountPostCommentPublicFilter,
  LikePostCommentPublicParams,
  UpdatePostCommentPublicEntity,
  UpdatePostCommentPublicParams
} from '../../Entity'
import PostCommentsModel from '../../Model'
import PostCommentLikeModel from '../../Model/postCommentLike'
import { postCommentValidator } from '../../Validator/Public/postComment.public.validator'

/**
 * GET ALL MODEL
 * @method (GET) /api/public/post-comments
 */
export const getAll = async (
  req: Request<{}, {}, {}, GetAllPostCommentPublicEntity>,
  res: Response<GetAllPostCommentPublicDto[]>
) => {
  try {
    let filter: GetAllPostCommentPublicFilter | {} = {}
    const queryBuilder = new QueryBuilder(filter)
    queryBuilder.objectId('_id', req.query.id)
    queryBuilder.objectId('userId', req.query.userId)
    queryBuilder.objectId('postId', req.query.postId)
    queryBuilder.boolean('status', req.query.status)
    queryBuilder.string('createdAt', req.query.createdAt)

    const postComments = PostCommentsModel.find<GetAllPostCommentPublicDto>(filter).select([
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
 * @method (GET) /api/public/post-comments/count
 */
export const getCount = async (
  req: Request<{}, {}, {}, GetCountPostCommentPublicEntity>,
  res: Response<GetCountPostCommentPublicDto>
) => {
  try {
    let filter: GetCountPostCommentPublicFilter | {} = {}
    const queryBuilder = new QueryBuilder(filter)
    queryBuilder.objectId('_id', req.query.id)
    queryBuilder.objectId('userId', req.query.userId)
    queryBuilder.objectId('postId', req.query.postId)
    queryBuilder.boolean('status', req.query.status)
    queryBuilder.string('createdAt', req.query.createdAt)

    const count = await PostCommentsModel.find<GetCountPostCommentPublicDto>(
      filter
    ).countDocuments()

    res.status(200).json(count)
  } catch (err) {
    errorStatus500(res, err)
  }
}

/**
 * GET MODEL BY Id
 * @method (GET) /api/public/post-comments/:id
 */
export const getById = async (
  req: Request<GetByIdPostCommentPublicEntity>,
  res: Response<Partial<GetByIdPostCommentPublicDto>>
) => {
  try {
    const id = req.params.id
    if (!isValidObjectId(id)) return errorStatusObjectId(res)

    const item = await PostCommentsModel.findById<GetByIdPostCommentPublicDto>(id)
    let response = pick<GetByIdPostCommentPublicDto>(item, [
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
 * CREATE MODEL
 * @method (POST) /api/public/post-comments
 */
export const create = async (req: Request<{}, CreatePostCommentPublicEntity>, res: Response) => {
  try {
    const body = pick<CreatePostCommentPublicEntity>(req.body, ['body', 'postId', 'parentId'])
    const { error } = postCommentValidator(body)
    if (error) errorStatus400(res, error)

    body.like = 0
    body.replies = 0
    body.status = 'PENDING'
    body.userId = new Types.ObjectId(req.user._id)

    await PostCommentsModel.create(body)
    if (body.parentId) {
      const postComment = await PostCommentsModel.findById(body.parentId)
      if (postComment?.replies !== undefined)
        postComment.replies = postComment.replies + 1
    }

    res.status(200).json('success')
  } catch (err) {
    errorStatus500(res, err)
  }
}

/**
 * UPDATE MODEL BY Id
 * @method (PUT) /api/public/post-comments/:id
 */
export const update = async (
  req: Request<UpdatePostCommentPublicParams, UpdatePostCommentPublicEntity>,
  res: Response
) => {
  try {
    const id = req.params.id
    if (!isValidObjectId(id)) return errorStatusObjectId(res)

    const body = pick<UpdatePostCommentPublicEntity>(req.body, ['body', 'postId', 'parentId'])

    const { error } = postCommentValidator(body)
    if (error) errorStatus400(res, error)

    body.status = 'PENDING'
    body.replies = await PostCommentsModel.find({ parentId: id }).countDocuments()
    body.userId = new Types.ObjectId(req.user._id)

    await PostCommentsModel.findByIdAndUpdate(id, body)

    res.status(200).json('success')
  } catch (err) {
    errorStatus500(res, err)
  }
}

/**
 * LIKE MODEL
 * @method (PUT) /api/public/post-comment/:id/like
 */
export const like = async (req: Request<LikePostCommentPublicParams>, res: Response) => {
  try {
    const id = req.params.id
    if (!isValidObjectId(id)) return errorStatusObjectId(res)

    const postComment = await PostCommentsModel.findById(id)

    if (postComment?.userId === new Types.ObjectId(req.user._id))
      return errorStatus417(res, StatusCodes.postComment.USER_ID_IS_SAME_WITH_POST_COMMENT)

    const likeExist = await PostCommentLikeModel.find({
      postCommentId: id,
      userId: new Schema.ObjectId(req.user._id)
    })

    if (likeExist?.length) {
      if (postComment?.like) postComment.like = postComment?.like - 1
      await PostCommentLikeModel.deleteOne({
        postCommentId: id,
        userId: new Schema.ObjectId(req.user._id)
      })
    } else {
      if (postComment?.like) postComment.like = postComment?.like - 1
      await PostCommentLikeModel.create({
        postCommentId: id,
        userId: new Schema.ObjectId(req.user._id)
      })
    }

    res.status(200).json('success')
  } catch (err) {
    errorStatus500(res, err)
  }
}
