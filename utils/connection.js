const booleanMap = str => ({true:true, false:false})
const queryWithPaginated = connection => queryDB => async ({ pageSize = 1, currentPage = 0 }) => {

    const [records] = await connection.query(`${queryDB} limit ${currentPage * pageSize}, ${pageSize + 1}`)
    const recordsIsGreaterThanPageSize = records.length > pageSize
    const init = arr => arr.slice(0, -1)
    return {
        data: recordsIsGreaterThanPageSize ? init(records) : records,
        hasNext: recordsIsGreaterThanPageSize
    }
}

module.exports = {
    booleanMap,
    queryWithPaginated
}