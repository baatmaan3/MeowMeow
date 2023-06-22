import { Router } from 'express'
import mongoose from 'mongoose'

import User from '../models/user.js'
import Product from '../models/product.js'

import dateFormat from 'dateformat'

const router = Router()

router.get('/product', async (req, res) => {
  if (!req.session.userid) return res.redirect('/signin')

  const product = await Product.find({
    created_by: { $ne: req.session.profile.username },
  })

  return res.render('pages/product', {
    product,
    dateFormat,
    profile: req.session.profile,
  })
})
router.get('/product/:id', async (req, res) => {
  if (!req.session.userid) return res.redirect('/signin')

  const product = await Product.findById(req.params.id)

  return res.render('pages/product', {
    product,
    dateFormat,
    profile: req.session.profile,
  })
})
router.get('/product-own', async (req, res) => {
  if (!req.session.userid) return res.redirect('/signin')

  const product = await Product.find({
    created_by: { $eq: req.session.profile.username },
  })
  return res.render('pages/productOwn', {
    product,
    dateFormat,
    profile: req.session.profile,
  })
})
router.get('/product-bought', async (req, res) => {
  if (!req.session.userid) return res.redirect('/signin')

  const product = await Product.find({
    sold_to: { $eq: req.session.profile.username },
  })

  return res.render('pages/productBought', {
    product,
    dateFormat,
    profile: req.session.profile,
  })
})

router.post('/product-buy', async (req, res) => {
  if (!req.session.userid) return res.redirect('/signin')
  const { product_id } = req.body

  await Product.findByIdAndUpdate(product_id, {
    sold: true,
    sold_to: req.session.profile.username,
  })

  return res.redirect('/productBought')
})

/* ---------------------------------- POST ---------------------------------- */

router.post('/product', async (req, res) => {
  if (!req.session.userid) return res.redirect('/signin')

  console.log(req.body)
  Product({
    ...req.body,
    created_date: new Date(),
    created_by: req.session.profile.username,
  }).save()

  return res.redirect('/product-own')
})

router.get('/product-pay', async (req, res) => {
  if (!req.session.userid) return res.redirect('/signin')

  await Product.findByIdAndUpdate(req.query.post, {
    $push: { request: req.session.profile.username },
  })
  await User.findByIdAndUpdate(req.session.userid, {
    $push: { cared_to: req.query.post },
  })

  return res.redirect('/product/' + req.query.post)
})

router.get('/product-delete/:id', async (req, res) => {
  if (!req.session.userid) return res.redirect('/signin')

  await Product.findByIdAndDelete(req.params.id)

  return res.redirect('/product-own')
})

export default router
