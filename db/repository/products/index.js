const { composeWithPromise, query, head, prop} = require('../../../utils/functional.js')
const {queryWithPaginated} = require('../../../utils/connection.js')
const {mapProductWithImage, mapPaginatedProductWithImage} = require('../../../utils/products.js')
const {
    findAllQuery,
    findAllByCategoryQuery,
    insertQuery,
    insertImagesQuery,
    updateQuery,
    removeQuery,
    removeCategoryQuery,
    insertCategoryQuery,
    getByIdQuery,
    removeImageQuery} = require ('./queries.js')


const productsRepository = (connection) => {

    const queryConnection = query(connection)

    const findAll = async () => composeWithPromise(
        mapProductWithImage,
        head,
        queryConnection(findAllQuery)
    )({})

    const findAllByCategory =  composeWithPromise(
        mapProductWithImage,
        head,
        queryConnection(findAllByCategoryQuery)
    )


    const findAllPaginated = composeWithPromise(
        mapPaginatedProductWithImage,
        queryWithPaginated(connection))(findAllQuery)

    const create = composeWithPromise(
        queryConnection(insertQuery)
    )

    const addImage = composeWithPromise(
        prop('insertId'),
        head,
        queryConnection(insertImagesQuery)
    )

    const removeImage = composeWithPromise(
        queryConnection(removeImageQuery)
    )

    const update = data => composeWithPromise(
        queryConnection(updateQuery(data))
    )(data)


    const remove = composeWithPromise(
        queryConnection(removeQuery)
    )

    const findById = composeWithPromise(
        head,
        head,
        queryConnection(getByIdQuery)
    )

    const updateCategories = async ([id, categories]) => {
        await connection.query('START TRANSACTION')
        await queryConnection(removeCategoryQuery)([id])
        for (category of categories) await queryConnection(insertCategoryQuery)([id, category])
        await connection.query('COMMIT')
    }



    return {
        findAll,
        findAllByCategory,
        findAllPaginated,
        create,
        addImage,
        removeImage,
        update,
        remove,
        findById,
        updateCategories
    }
}

module.exports = productsRepository