import express from 'express'
import resize from '../utils/resize'
import upload from '../utils/upload'

const IMG_DIR = 'http://localhost:3000/img/'

const route = express.Router()

route.post('/', upload, async (req, res) => {
    const width = parseInt(req.body.width)
    const height = parseInt(req.body.height)
    const outputFile = await resize(req.file!.path, width, height)
    console.log(req.file!.path)

    if (!outputFile) {
        res.send('Upload failed: Please use a proper image file')
        return
    }
    const url = IMG_DIR + outputFile.replace('gallery\\', '')
    res.redirect(url)
})

export default route
