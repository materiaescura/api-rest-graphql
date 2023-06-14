const fs = require('fs')
const {ApolloServer, gql} = require('apollo-server-express')
const path = require('path')
const schema = fs.readFileSync(path.join(__dirname, './schema.graphql'))
const resolvers = require('./resolvers/index.js')
const {graphqlNeedsAuth} = require('../utils/auth.js')

const typeDefs = gql`${schema}`

const graphqlServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
        return graphqlNeedsAuth(req)
    }
})

module.exports = graphqlServer