import joi from 'joi'
import { CreatePostsEntity, UpdatePostsEntity } from '../Entity'
const objectId = require('joi-objectid')

export const createValidator = (data: Partial<CreatePostsEntity>) => {
  const schema = joi.object<CreatePostsEntity>({
    name: joi.string().required(),
    slug: joi.string().required(),
    lead: joi.string().allow('').allow(null),
    image: joi.string().required(),
    header: joi.string().allow('').allow(null),
    body: joi.string().required(),
    active: joi.boolean(),
    metaTitle: joi.string().allow('').allow(null),
    metaDescription: joi.string().allow('').allow(null),
    categoryId: [objectId(joi), joi.string().required()],
    excerpt: joi.string().allow(null).allow(''),
    readTime: joi.number().integer().required(),
    publish: joi.date().required()
  })

  return schema.validate(data)
}

export const updateValidator = (data: Partial<UpdatePostsEntity>) => {
  const schema = joi.object<UpdatePostsEntity>({
    _id: [objectId(joi), joi.string().required()],
    name: joi.string().required(),
    slug: joi.string().required(),
    lead: joi.string().allow('').allow(null),
    image: joi.string().required(),
    header: joi.string().allow('').allow(null),
    body: joi.string().required(),
    active: joi.boolean(),
    metaTitle: joi.string().allow('').allow(null),
    metaDescription: joi.string().allow('').allow(null),
    categoryId: [objectId(joi), joi.string().required()],
    excerpt: joi.string().allow(null).allow(''),
    readTime: joi.number().integer().required(),
    publish: joi.date().required()
  })

  return schema.validate(data)
}



