const express = require('express')
const {getAll,  getById, post, put, patch, patchCategories, createImage} = require('../controllers/products.js')
const router = express.Router()

router.get('/', getAll)
router.get('/:id', getById)
router.post('/', post)
router.put('/:id', put)
router.patch('/:id', patch)
router.patch('/:id/categories', patchCategories)
router.post('/:id/images', createImage)

module.exports = router