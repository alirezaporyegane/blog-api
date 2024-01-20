import { Request, Response } from 'express'
import { pick } from 'lodash'
import { isValidObjectId } from 'mongoose'
import {
  errorStatus400,
  errorStatus500,
  errorStatusObjectId
} from '../../../middleware/ErrorMessage'
import { QueryBuilder } from '../../../utils/queryBuilder'
import { PostCategoryDto } from '../../PostCategory/Dto/postCategory.dto'
import PostCategoryModel from '../../PostCategory/Model/index'
import { Role } from '../../Shared/Account/Entity/account.entity'
import {
  CreatePostsDto,
  DeletePostDto,
  GetAllPostsDto,
  GetByIdPostsDto,
  GetCountPostsDto,
  UpdatePostsDto
} from '../Dto'
import {
  CreatePostsEntity,
  DeletePostsEntity,
  GetAllPostsEntity,
  GetAllPostsFilter,
  GetByIdEntity,
  GetCountPostsEntity,
  UpdateParams,
  UpdatePostsEntity
} from '../Entity'
import PostModel from '../Model/post.model'
import { createValidator, updateValidator } from '../Validator/post.validator'

/**
 * GET ALL MODEL
 * @method (GET) /api/admin/posts
 */
export const getAll = async (
  req: Request<{}, {}, {}, GetAllPostsEntity>,
  res: Response<GetAllPostsDto[]>
) => {
  try {
    let filter: GetAllPostsFilter | {} = {}

    const queryBuilder = new QueryBuilder(filter)
    queryBuilder.objectId('_id', req.query.id)
    queryBuilder.regex('name', req.query.name)
    queryBuilder.regex('slug', req.query.slug)
    queryBuilder.boolean('active', req.query.active)
    queryBuilder.string('publish', req.query.publish)
    queryBuilder.string('createdAt', req.query.createdAt)
    queryBuilder.string('categoryId', req.query.categoryId)

    const posts = PostModel.find<GetAllPostsDto>(queryBuilder.getFilters).select([
      '_id',
      'name',
      'slug',
      'active',
      'createdAt',
      'publish'
    ])
    const size = req.query.size ? +req.query.size : 10
    if (req.query.page) posts.skip((+req.query.page - 1) * size)
    if (req.query.size) posts.limit(size)
    if (req.query.sortColumn && req.query.sortType)
      posts.sort({ [req.query.sortColumn]: req.query.sortType })

    if (req.user && req.user.role.includes(Role.WRITER)) {
      posts.where('userId').equals(req.user._id)
    }

    const items = await posts

    res.status(200).json(items)
  } catch (err) {
    errorStatus500(res, err)
  }
}

/**
 * GET MODEL COUNT
 * @method (GET) /api/admin/posts/count
 */
export const getCount = async (
  req: Request<{}, {}, {}, GetCountPostsEntity>,
  res: Response<GetCountPostsDto>
) => {
  try {
    let filter: GetAllPostsFilter | {} = {}

    const queryBuilder = new QueryBuilder(filter)
    queryBuilder.objectId('_id', req.query.id)
    queryBuilder.regex('name', req.query.name)
    queryBuilder.regex('slug', req.query.slug)
    queryBuilder.boolean('active', req.query.active)
    queryBuilder.string('publish', req.query.publish)
    queryBuilder.string('createdAt', req.query.createdAt)
    queryBuilder.string('categoryId', req.query.categoryId)

    const count = await PostModel.find(queryBuilder.getFilters).countDocuments()

    res.status(200).json(count)
  } catch (err) {
    errorStatus500(res, err)
  }
}

/**
 * GET MODEL BY Id
 * @method (GET) /api/admin/posts/:id
 */
export const getById = async (
  req: Request<GetByIdEntity>,
  res: Response<Partial<GetByIdPostsDto>>
) => {
  try {
    const id = req.params.id
    if (!isValidObjectId(id)) return errorStatusObjectId(res)

    const item = await PostModel.findById<GetByIdPostsDto>(id)
    let response = pick<GetByIdPostsDto>(item, [
      '_id',
      'name',
      'slug',
      'image',
      'header',
      'excerpt',
      'lead',
      'body',
      'metaTitle',
      'metaDescription',
      'active',
      'categoryId',
      'publish',
      'readTime'
    ])

    if (response.categoryId) {
      const category = await PostCategoryModel.findById<Pick<PostCategoryDto, '_id' | 'name'>>(
        response.categoryId
      ).select(['_id', 'name'])

      response.category = { value: category?._id || '', text: category?.name || '' }
    }

    res.status(200).json(response)
  } catch (err) {
    errorStatus500(res, err)
  }
}

/**
 * CREATE MODEL
 * @method (POST) /api/admin/posts
 */
export const create = async (
  req: Request<{}, CreatePostsEntity>,
  res: Response<Partial<CreatePostsDto>>
) => {
  try {
    const body = pick<CreatePostsEntity>(req.body, [
      'name',
      'slug',
      'image',
      'header',
      'excerpt',
      'lead',
      'body',
      'metaTitle',
      'metaDescription',
      'active',
      'categoryId',
      'publish',
      'readTime'
    ])
    const { error } = createValidator(body)
    if (error) errorStatus400(res, error)

    body.userId = req.user._id
    body.like = 0
    body.comments = 0
    body.view = 0
    body.rate = 0

    await PostModel.create(body)

    res.status(200).json(body)
  } catch (err) {
    errorStatus500(res, err)
  }
}

/**
 * UPDATE MODEL BY ID
 * @method (PUT) /api/admin/posts/:id
 */
export const update = async (
  req: Request<UpdateParams, UpdatePostsEntity>,
  res: Response<Partial<UpdatePostsDto>>
) => {
  try {
    const id = req.params.id
    if (!isValidObjectId(id)) return errorStatusObjectId(res)

    const body = pick<UpdatePostsEntity>(req.body, [
      'name',
      'slug',
      'image',
      'header',
      'excerpt',
      'lead',
      'body',
      'metaTitle',
      'metaDescription',
      'active',
      'categoryId',
      'publish',
      'readTime'
    ])

    const { error } = updateValidator(body)
    if (error) errorStatus400(res, error)

    await PostModel.findByIdAndUpdate<UpdatePostsDto>(id, body)

    res.status(200).json(body)
  } catch (err) {
    errorStatus500(res, err)
  }
}

/**
 * DELETE MODEL BY ID
 * @method (DELETE) /api/admin/posts/:id
 */
export const remove = async (req: Request<DeletePostsEntity>, res: Response<DeletePostDto>) => {
  try {
    const id = req.params.id
    if (!isValidObjectId(id)) return errorStatusObjectId(res)

    await PostModel.deleteOne({ _id: id })

    res.status(200).json('success')
  } catch (err) {
    errorStatus500(res, err)
  }
}
