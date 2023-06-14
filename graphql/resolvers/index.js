const { AuthenticationError } = require('apollo-server-express')
const {getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    createImageOnProduct,
    deleteImageOnProduct} = require('./products.js')

const needsAuth = resolver => {
    return async(parent, args, context) => {
        if(!context.user) {
            throw new AuthenticationError('Needs Auth')
        }

        return resolver(parent, args, context)
    }
}

const resolvers = {
    Query: {
        getAllProducts: needsAuth(getAllProducts)
    },
    Mutation: {
        createProduct,
        deleteProduct,
        updateProduct,
        createImageOnProduct,
        deleteImageOnProduct
    }
}

module.exports = resolvers