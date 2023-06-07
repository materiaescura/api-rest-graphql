const connection = require('./connection.js')
const Categories = require('./repository/category/index.js')
const Products = require('./repository/products/index.js')


module.exports = {
    Categories: Categories(connection),
    Products: Products(connection)
}