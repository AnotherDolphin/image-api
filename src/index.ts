import express from 'express'
import post from './routes/post'
import serve from './routes/serve'
import path from 'path'

const app = express()
const port = 3000

// home page to upload new images
app.get('/', (req, res) => {
    res.sendFile('public/index.html', { root: path.resolve(__dirname, '../') })
})

// image serve route
app.use('/img', serve)

// upload route
app.use('/post', post)

app.listen(port, () => console.log('listening ...'))

export default app