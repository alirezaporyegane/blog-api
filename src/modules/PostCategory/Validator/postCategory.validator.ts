import joi from 'joi'
import { PostCategoryEntity } from '../Entity/postCategory.entity'
const objectId = require('joi-objectid')

// POST CATEGORIES VALIDATOR
export const postCategoriesPatchValidator = (data: PostCategoryEntity) => {
  const Schema = joi.array().items(
    joi.object({
      _id: [objectId(joi), joi.number().required()],
      name: joi.string().required(),
      altName: joi.string().allow(null).allow(''),
      slug: joi.string().required(),
      metaTitle: joi.string().allow(null).allow(''),
      parentId: [objectId(joi), joi.number().integer(), joi.allow(null).allow('')],
      metaDescription: joi.string().allow(null).allow(''),
      image: joi.string().allow('').allow(null).allow(''),
      sortOrder: joi.number().integer().required(),
      active: joi.boolean(),
      published: joi.date().allow(null).allow('')
    })
  )

  return Schema.validate(data)
}

export const postCategoriesValidator = (data: PostCategoryEntity) => {
  const schema = joi.object({
    name: joi.string().required(),
    altName: joi.string().allow(null).allow(''),
    slug: joi.string().required(),
    metaTitle: joi.string().allow(null).allow(''),
    parentId: [objectId(joi), joi.number().integer(), joi.allow(null).allow('')],
    metaDescription: joi.string().allow(null).allow(''),
    image: joi.string().allow('').allow(null).allow(''),
    sortOrder: joi.number().integer().required(),
    active: joi.boolean(),
    published: joi.date().allow(null).allow('')
  })

  return schema.validate(data)
}
