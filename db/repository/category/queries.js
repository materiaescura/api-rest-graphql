const updateQuery = 'UPDATE categories SET category=:category WHERE id=:id'
const selectQuery = 'SELECT * FROM categories'
const insertQuery = 'INSERT INTO categories (category) VALUES (:category)'
const deleteQuery = 'DELETE FROM categories WHERE id=:id limit 1'

module.exports = {
    updateQuery,
    selectQuery,
    insertQuery,
    deleteQuery
}