const { composeWith, curry, head, map, modify, tap, prop } = require('ramda')

const composeWithPromise = (...args) =>
    composeWith((f, val) => {
        if (val && val.then) {
            return val.then(f);
        }
        if (Array.isArray(val) && val.length && val[0] && val[0].then) {
            return Promise.all(val).then(f);
        }
        return f(val);
    })(args);


const query = curry((connection, query, data) => connection.query(query, data))
const end = curry((connection, result) => {
    connection.end()
    return result
})

module.exports = {
    composeWithPromise,
    query,
    end,
    head,
    map,
    modify,
    tap,
    prop
}