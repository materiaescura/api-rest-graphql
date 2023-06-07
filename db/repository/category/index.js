
const {
    composeWithPromise,
    query,
    head
    } = require('../../../utils/functional.js')
const {
    selectQuery,
    updateQuery,
    insertQuery,
    deleteQuery} = require('./queries.js')



const repository = connection => {

    const queryConnection = query(connection)

    const findAll = () => composeWithPromise(
        head,
        queryConnection(selectQuery)
    )({})

    const create = composeWithPromise(
        queryConnection(insertQuery)
    )
    
    const update = composeWithPromise(
        queryConnection(updateQuery)
    )

    const remove =  composeWithPromise(
        queryConnection(deleteQuery)
    )


    return {
        findAll,
        create,
        update,
        remove,
    }
}

module.exports = repository