import express, { response } from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'
import uniqID from 'uniqid'


const postsRouter = express.Router() //what is express Router doing?

//GETTING THE URL PATH
const currentFilePath = fileURLToPath(import.meta.url)
const currentDirPath = dirname(currentFilePath)
const postsJsonPath = join(currentDirPath, 'posts.json')


postsRouter.post('/', (req, res) => {

    const newPost = { ...req.body, _id: uniqID(), createdAt: new Date() }
    const posts = JSON.parse(fs.readFileSync(postsJsonPath))
    posts.push(newPost)
    fs.writeFileSync(postsJsonPath, JSON.stringify(posts))
    res.status(201).send({ id: newPost.id })

})


postsRouter.get('/', (req, res) => {

    const fileContent = fs.readFileSync(postsJsonPath)
    res.send(JSON.parse(fileContent))
}) //DONE


postsRouter.get('/:postId', (req, res) => {
    const posts = JSON.parse(fs.readFileSync(postsJsonPath))
    const post = posts.find(p => p._id === parseInt(req.params.postId))

    res.send(post)
}) //DONE


postsRouter.put('/:id', (req, res) => {
    res.send('Hello PUT')
})

postsRouter.delete('/:id', (req, res) => {
    res.send('Hello delete')
})

export default postsRouter