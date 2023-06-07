const express = require('express')
const graphqlServer = require('./graphql/index.js')
const app = express()
const routes = require('./routes/index.js')
const port = 3000

//rest
app.use(express.json())
app.use(routes)


//grapql

graphqlServer.applyMiddleware({app})

app.listen(port, error => {
    if(error) console.log('Not possible to listen on port ' + port)
    else console.log('Server running on port ' + port)
})