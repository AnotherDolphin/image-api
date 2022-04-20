import express from 'express'
import path from 'path'
import isCached from '../utils/isCached'
import resize from '../utils/resize'

const IMG_DIR = __dirname + '/../../gallery/'

const route = express.Router()

// middleware to process resize query
const checkResizeQuery = async (
    req: express.Request,
    res: express.Response,
    next: Function
) => {
    const width = parseInt(req.query.width as string) ?? NaN
    const height = parseInt(req.query.height as string) ?? NaN

    // serve image with if chached with provided dimensions
    const imageCached = isCached(req.params.name, width, height)
    if (imageCached != false) {
        res.locals.target = imageCached
        return next()
    }

    const image = path.normalize(IMG_DIR + req.params.name)

    // skip resize if url has no resize query
    if (!req.query.width && !req.query.height) {
        res.locals.target = image
        return next()
    }

    // get resized image from cache or resize new
    res.locals.target = await resize(image, width, height)
    next()
}

// serve target image / handle not found
route.get('/:name', checkResizeQuery, (req, res) => {
    res.sendFile(res.locals.target, (err) => {
        if (err) res.send('Image does not exist').end()
        else res.end()
    })
})

// redirect empty /image requests to home
route.get('/', (req, res) => res.redirect('/'))

export default route
