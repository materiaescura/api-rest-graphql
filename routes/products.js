const express = require('express')
const jwt = require('jsonwebtoken')
const {getAll,  getById, post, put, patch, patchCategories, createImage} = require('../controllers/products.js')
const router = express.Router()
const {restNeedsAuth} = require('../utils/auth.js')

//router.use(needsAuth)
router.get('/', restNeedsAuth,  getAll)
router.get('/:id', getById)
router.post('/', post)
router.put('/:id', put)
router.patch('/:id', patch)
router.patch('/:id/categories', patchCategories)
router.post('/:id/images', createImage)

module.exports = router