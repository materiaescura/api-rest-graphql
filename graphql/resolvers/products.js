const {ApolloError} = require('apollo-server-express')
const {Products} = require('../../db/index.js')

const getAllProducts = async (context, {filter}) => {
    
    const products = filter?.categoryId
                    ? await Products.findAllByCategory({categoryId: filter.categoryId})
                    : await Products.findAll()

    return products
}

const createProduct =  async (context, {input}) => {
    const {product, price} = input
    const [{insertId}] = await Products.create({product, price})
    console.log(insertId)
    return {
        product,
        price
    }
}

const deleteProduct = async(context, {id}) => {
    await Products.remove({id})
    return true
}

const updateProduct = async(context, {id, input}) => {
    
    const oldProduct = await Products.findById({id})

    if(!oldProduct) throw new Error('Product not found')

    const [product, categories] = filterInput(input)
    
    if(Object.keys(product).length > 0) await Products.update({id, ...product})
    
    if(categories.length > 0) {
       try {
         await Products.updateCategories([id, categories])
       } catch (e) {
        throw new Error('Categories not found')
       }
    }

    return {
       ...oldProduct,
       ...product
    }
}

const filterInput = input => {
   const productProps = ['price', 'product'].reduce((product, prop) => {
    if(prop in input) {
        product[prop] = input[prop]
    }
    return product
    }, {})

    const categories = input?.categories ? input.categories : []

    return [productProps, categories]
}

const createImageOnProduct = async (context, {productId, input}) => {
    const {url, description} = input
    
    try {
        await Products.addImage({url, description, product_id:productId})
    } catch {
        throw Error('Product not found')
    }

    return {
        url, description
    }
}

const deleteImageOnProduct = async (context, {productId, id}) => {
    await Products.removeImage({id})
    return true
}

module.exports = {
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    createImageOnProduct,
    deleteImageOnProduct
    
}