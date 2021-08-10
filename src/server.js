import express from 'express'
import listEndpoints from 'express-list-endpoints'
import postsRouter from './services/posts/index.js'

const server = express()
const port = 3001


//Routes


server.use(express.json())
server.use('/students', postsRouter)
console.table(listEndpoints(server))


server.listen(port, () => {
    console.log('Server listening on port' + port);
})

