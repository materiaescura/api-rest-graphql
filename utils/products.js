const {composeWithPromise, modify, map} = require('./functional.js')

const productWithImage = ({id, product, price, ...image }) => ({ id, product, price, image })

const mapProductWithImage = composeWithPromise(map(productWithImage))

const mapPaginatedProductWithImage = modify('data', mapProductWithImage)

module.exports = {
    mapProductWithImage,
    mapPaginatedProductWithImage
}