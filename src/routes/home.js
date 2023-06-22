import { Router } from 'express'
import dateFormat from 'dateformat'

import User from '../models/user.js'
import Post from '../models/post.js'
import Product from '../models/product.js'

const router = Router()

router.get('/', async (_, res) => res.redirect('/adoption'))

router.get('/adoption', async (req, res) => {
  if (!req.session.userid) return res.redirect('/signin')

  const { search, category, date, location } = req.query

  let params = {
    name:
      search && search !== '' ? { $regex: new RegExp(search, 'i') } : undefined,
    location:
      location && location !== ''
        ? { $regex: new RegExp(location, 'i') }
        : undefined,
    category: category && category !== '' ? category : undefined,
    date: date && date ? date : undefined,
  }

  Object.keys(params).forEach((key) => {
    if (params[key] === undefined) {
      delete params[key]
    }
  })

  const post = await Post.find({
    created_by: { $ne: req.session.profile.username },
    cared_by: { $eq: '' },
    archived: { $ne: true },
    type: 'adoption',
    // request: { $nin: req.session.profile.username },
    ...params,
  }).limit(5)

  const postOwn = await Post.find({
    created_by: { $eq: req.session.profile.username },
    archived: { $ne: true },
  }).limit(5)

  return res.render('pages/home', {
    postType: 'adoption',
    postOwn,
    post,
    dateFormat,
    profile: req.session.profile,
    params: { search, category, date, location },
  })
})

router.get('/pet-sitting', async (req, res) => {
  if (!req.session.userid) return res.redirect('/signin')

  const { search, category, date, location } = req.query
  console.log(
    `🚀 ~ file: home.js:15 ~ router.get ~ search, category, date, location:`,
    search,
    category,
    date,
    location
  )

  let params = {
    name:
      search && search !== '' ? { $regex: new RegExp(search, 'i') } : undefined,
    location:
      location && location !== ''
        ? { $regex: new RegExp(location, 'i') }
        : undefined,
    category: category && category !== '' ? category : undefined,
    date: date && date ? date : undefined,
  }

  Object.keys(params).forEach((key) => {
    if (params[key] === undefined) {
      delete params[key]
    }
  })

  const post = await Post.find({
    created_by: { $ne: req.session.profile.username },
    cared_by: { $eq: '' },
    archived: { $ne: true },
    type: 'pet-sitting',
    // request: { $nin: req.session.profile.username },
    ...params,
  }).limit(5)

  const postOwn = await Post.find({
    created_by: { $eq: req.session.profile.username },
    archived: { $ne: true },
  }).limit(5)

  return res.render('pages/home', {
    postType: 'pet-sitting',
    postOwn,
    post,
    dateFormat,
    profile: req.session.profile,
    params: { search, category, date, location },
  })
})

router.get('/fea-market', async (req, res) => {
  if (!req.session.userid) return res.redirect('/signin')

  const { search, category, date, location } = req.query

  let params = {
    name:
      search && search !== '' ? { $regex: new RegExp(search, 'i') } : undefined,
    location:
      location && location !== ''
        ? { $regex: new RegExp(location, 'i') }
        : undefined,
    category: category && category !== '' ? category : undefined,
    date: date && date ? date : undefined,
  }

  Object.keys(params).forEach((key) => {
    if (params[key] === undefined) {
      delete params[key]
    }
  })

  const product = await Product.find({
    created_by: { $ne: req.session.profile.username },
    sold: { $ne: true },
    // request: { $nin: req.session.profile.username },
    ...params,
  }).limit(5)

  const productOwn = await Product.find({
    created_by: { $eq: req.session.profile.username },
    sold: { $ne: true },
  }).limit(5)

  return res.render('pages/home', {
    postType: 'fea-market',
    productOwn,
    product,
    dateFormat,
    profile: req.session.profile,
    params: { search, category, date, location },
  })
})
export default router
