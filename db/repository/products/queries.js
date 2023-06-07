const findAllQuery = `
SELECT
p.id as id, p.product as product, p.price as price,
i.url as url, i.description as description
FROM products as p
LEFT JOIN images as i
ON p.id = i.product_id
GROUP BY p.id`

const findAllByCategoryQuery = `
SELECT
p.id as id, p.product as product, p.price as price,
i.url as url, i.description as description
FROM products as p
LEFT JOIN images as i
ON p.id = i.product_id
WHERE p.id in (select distinct product_id from products_categories where category_id = :categoryId)
group by p.id
`
const insertQuery = 'INSERT INTO products (product, price) VALUES (:product, :price)'

const insertImagesQuery = 'INSERT INTO images (url, description, product_id) VALUES (:url,:description,:product_id)'
const removeImageQuery = 'DELETE FROM images WHERE id=:id'

const updateQuery = ({id, ...data}) => {
    const fields = Object.keys(data)
                    .map(prop => `${prop}=:${prop}`)
                    .join(',')
    return `UPDATE products SET ${fields} WHERE id=:id`
}

const removeQuery = 'DELETE FROM products WHERE id=:id limit 1'

const getByIdQuery = 'SELECT * FROM products WHERE id=:id'

const removeCategoryQuery = 'DELETE FROM products_categories WHERE product_id = ?'

const insertCategoryQuery = 'INSERT INTO products_categories (product_id, category_id) VALUES (?,?)'

module.exports = {
    findAllQuery,
    findAllByCategoryQuery,
    insertQuery,
    insertImagesQuery,
    updateQuery,
    removeQuery,
    removeCategoryQuery,
    insertCategoryQuery,
    getByIdQuery,
    removeImageQuery
}