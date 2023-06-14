const {Products} = require('../db/index.js')

const ifProductExistsThenExecute = async (res, id, fn) => {
    const product = await Products.findById({id})
    
    if(!product) {
        return res.send({
            success: false,
            message:'Product not found'
        })
    } else {
        return fn(product)
    }
}

const getAll = async(req, res) => {
    const {categoryId} = req.query
    const products = await Products.findAll()
    console.log(res.locals.user)
    return res.send( {
        success: true,
        products 
    })
}

const getById = async (req, res) => {
    const {id} = req.params

    return await ifProductExistsThenExecute(res, id, product => {
            return res.send({
                success: true,
                product
            })
        })
}

const post = async(req, res) => {
    await Products.create(req.body)
    return res.send({
        success: true,
        data: req.body
    })
}


const put = async(req, res) => {
    const {id} = req.params
    return await ifProductExistsThenExecute(res, id, async (_) => {
        const {price, product} = req.body
        Products.update({id, price, product})
        return res.send({
            success: true
        })
    })
}


const patch = async(req, res) => {
    const {id} = req.params
    const {price, product} = req.body
    Products.update({id, price, product})
    return res.send({
        success: true
    })
}

const patchCategories = async(req, res) => {
    const id = parseInt(req.params.id)
    return  await ifProductExistsThenExecute(res, id, async (_) => {
        const {categories} = req.body
   
        try {
            await Products.updateCategories([id, categories])
            return res.send({
                success: true
            })
        } catch {
            return res.send({
                success: false,
                message: 'Categories not found'
            })
        }
    })
}

const createImage = async (req, res) => {
    const {id} = req.params
    return await ifProductExistsThenExecute(res, id, async(_) => {
        const {url, description} = req.body
        const imageId = await Products.addImage({url, description, product_id:id})
       
       return res.send({
        success: true,
        image:{
            id: imageId,
            url,
            description
        }
       })
    })
}

module.exports = {
    getAll,
    getById,
    post,
    put,
    patch,
    patchCategories,
    createImage
}
