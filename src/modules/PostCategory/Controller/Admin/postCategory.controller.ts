import { Request, Response } from 'express'
import { pick } from 'lodash'
import mongoose from 'mongoose'
import {
  errorStatus400,
  errorStatus500,
  errorStatusObjectId
} from '../../../../middleware/ErrorMessage'
import { PostCategoryDto } from '../../Dto/postCategory.dto'
import { PostCategoryEntity } from '../../Entity/postCategory.entity'
import PostCategoryModel from '../../Model'
import {
  postCategoriesPatchValidator,
  postCategoriesValidator
} from '../../Validator/postCategory.validator'

/**
 * GET ALL
 * @method (GET) /api/admin/post-categories
 */
export const getAll = async (req: Request, res: Response) => {
  try {
    const items: PostCategoryDto[] = await PostCategoryModel.find().select([
      '_id',
      'name',
      'altName',
      'slug',
      'parentId',
      'sortOrder'
    ])

    res.status(200).json(items)
  } catch (err) {
    errorStatus500(res, err)
  }
}

/**
 * GET MODEL BY ID
 * @method (GET) /api/admin/post-categories/:id
 */
export const getById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    if (!mongoose.isValidObjectId(id)) return errorStatusObjectId(res)

    const item = await PostCategoryModel.findById(id)
    const response = pick(item, [
      '_id',
      'name',
      'altName',
      'slug',
      'parentId',
      'sortOrder',
      'active',
      'image',
      'metaTitle',
      'metaDescription',
      'published'
    ])

    res.status(200).json(response)
  } catch (err) {
    errorStatus500(res, err)
  }
}

/**
 * CREATE MODEL
 * @method (POST) /api/admin/post-categories
 */
export const create = async (req: Request, res: Response) => {
  try {
    const body: PostCategoryEntity = pick(req.body, [
      'name',
      'altName',
      'slug',
      'parentId',
      'sortOrder',
      'active',
      'image',
      'metaTitle',
      'metaDescription',
      'published'
    ])
    const { error } = postCategoriesValidator(body)
    if (error) return errorStatus400(res, error)

    await PostCategoryModel.create(body)

    res.status(200).json(body)
  } catch (err) {
    errorStatus500(res, err)
  }
}

/**
 * UPDATE MODEL BY ID
 * @method (PUT) /api/admin/post-categories/:id
 */
export const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    if (!mongoose.isValidObjectId(id)) return errorStatusObjectId(res)

    const body: PostCategoryEntity = pick(req.body, [
      'name',
      'altName',
      'slug',
      'parentId',
      'sortOrder',
      'active',
      'image',
      'metaTitle',
      'metaDescription',
      'published'
    ])
    const { error } = postCategoriesValidator(body)
    if (error) return errorStatus400(res, error)

    await PostCategoryModel.findByIdAndUpdate(id, body)
    const response = { _id: id, ...body }

    res.status(200).json(response)
  } catch (err) {
    errorStatus500(res, err)
  }
}

/**
 * CREATE, UPDATE AND DELETE MODEL
 * @method (PATCH) /api/admin/post-categories
 */
export const upsert = async (req: Request, res: Response) => {
  try {
    const { error } = postCategoriesPatchValidator(req.body)
    if (error) return errorStatus400(res, error)

    // FIND VALID OBJECT ID
    const body = req.body.filter((item: PostCategoryDto) => typeof item._id === 'string')

    // FIND ITEMS THAT ARE NOT IN THE DATABASE AND REMOVE THEME
    const removAbleItems = await PostCategoryModel.find({
      _id: {
        $nin:
          body.map(
            (item: PostCategoryDto) =>
              typeof item._id === 'string' && new mongoose.Types.ObjectId(item._id)
          ) || []
      }
    })

    await Promise.all(
      removAbleItems.map(async (item) => {
        // const post = await PostModel.find({ primaryCategoryId: item._id })
        // if (post.length >= 1) return $errorStatus417(res)

        await PostCategoryModel.findByIdAndDelete({ _id: item._id })
      })
    )

    // FIND THE ITEM WITH ID NEGATIVE AND CREATE
    const insertAbleItems = req.body.filter(
      (item: PostCategoryDto) => typeof item._id === 'number' && item._id < 0
    )

    await Promise.all(
      insertAbleItems.map(async (item: PostCategoryDto) => {
        const { _id, ...rest } = item
        let id = _id

        let newItem = await PostCategoryModel.create(rest)

        const postCategory = await PostCategoryModel.find({ parentId: id })
        if (postCategory.length >= 1) {
          postCategory.forEach(async (i) => {
            i.parentId = String(newItem._id) || null

            await i.save()
          })
        }
      })
    )

    // UPDATE IN DATABASE BY ID
    await Promise.all(
      body.map(async (item: PostCategoryDto) => {
        await PostCategoryModel.findByIdAndUpdate(item._id, item, { upsert: true })
      })
    )

    res.status(200).json('success')
  } catch (err) {
    errorStatus500(res, err)
  }
}

/**
 * DELETE MODEL BY ID
 * @method (DELETE) /api/admin/post-categories/:id
 */
export const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    if (!mongoose.isValidObjectId(id)) return errorStatusObjectId(res)

    await PostCategoryModel.deleteOne({ _id: id })

    res.status(200).json('success')
  } catch (err) {
    errorStatus500(res, err)
  }
}
