const express = require('express')
const router = express.Router()
const productsController = require('./products.js')

router.use('/products',productsController)


module.exports = router