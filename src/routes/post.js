import { Router } from 'express'
import mongoose from 'mongoose'

import User from '../models/user.js'
import Post from '../models/post.js'
import Product from '../models/product.js'

import dateFormat from 'dateformat'

const router = Router()

/* ---------------------------------- VIEW ---------------------------------- */

router.get('/post', async (req, res) => {
  if (!req.session.userid) return res.redirect('/signin')

  const Post = await Post.find({
    created_by: { $ne: req.session.profile.username },
    archived: { $eq: false },
  })

  return res.render('pages/post', {
    Post,
    dateFormat,
    profile: req.session.profile,
  })
})

router.get('/post/:id', async (req, res) => {
  if (!req.session.userid) return res.redirect('/signin')

  const post = await Post.findById(req.params.id)

  return res.render('pages/Post', {
    post,
    dateFormat,
    profile: req.session.profile,
  })
})

router.get('/post-own', async (req, res) => {
  if (!req.session.userid) return res.redirect('/signin')

  const post = await Post.find({
    created_by: { $eq: req.session.profile.username },
  })

  return res.render('pages/PostOwn', {
    post,
    dateFormat,
    profile: req.session.profile,
  })
})

/* ---------------------------------- CREATE ---------------------------------- */

router.post('/post', async (req, res) => {
  if (!req.session.userid) return res.redirect('/signin')

  Post({
    ...req.body,
    created_date: new Date(),
    created_by: req.session.profile.username,
  }).save()

  return res.redirect('/post-own')
})

router.post('/post-comment/:id', async (req, res) => {
  if (!req.session.userid) return res.redirect('/signin')
  const { message } = req.body

  await Post.findByIdAndUpdate(req.params.id, {
    $push: {
      comments: {
        date: new Date(),
        message,
        created_by: req.session.profile.username,
      },
    },
  })

  return res.redirect('/post/' + req.params.id)
})

/* ---------------------------------- UPDATES ---------------------------------- */

router.get('/post-request/:id', async (req, res) => {
  if (!req.session.userid) return res.redirect('/signin')

  await Post.findByIdAndUpdate(req.params.id, {
    $push: {
      request: {
        username: req.session.profile.username,
        message: 'N/A',
      },
    },
  })

  return res.redirect('/post/' + req.params.id)
})
router.get('/post-accept/:id', async (req, res) => {
  if (!req.session.userid) return res.redirect('/signin')

  await Post.findByIdAndUpdate(req.params.id, {
    cared_by: req.query.username,
  })

  return res.redirect('/post/' + req.params.id)
})
router.get('/post-takeback/:id', async (req, res) => {
  if (!req.session.userid) return res.redirect('/signin')

  await Post.findByIdAndUpdate(req.params.id, {
    cared_by: '',
    request: [],
    archived: true,
  })

  return res.redirect('/post/' + req.params.id)
})

router.get('/post-cancel/:id', async (req, res) => {
  if (!req.session.userid) return res.redirect('/signin')

  await Post.findByIdAndUpdate(req.params.id, {
    $pull: { request: { username: req.session.profile.username } },
  })

  return res.redirect('/post/' + req.params.id)
})

router.get('/post-delete/:id', async (req, res) => {
  if (!req.session.userid) return res.redirect('/signin')

  await Post.findByIdAndDelete(req.params.id)

  return res.redirect('/post-own')
  image.png
})

export default router
