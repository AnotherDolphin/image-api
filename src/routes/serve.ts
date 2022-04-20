import express from 'express'
import path from 'path'
import resize from '../utils/resize'

const IMG_DIR = __dirname + '/../../gallery/'

const route = express.Router()

// middleware to apply resize query
const checkResizeQuery = async (
    req: express.Request,
    res: express.Response,
    next: Function
) => {
    const image = path.normalize(IMG_DIR + req.params.name)
    // skip resize if url has no resize query
    if (!image || (!req.query.width && !req.query.height)) {
        res.locals.target = image
        return next()
    }
    const width = parseInt(req.query.width as string) ?? NaN
    const height = parseInt(req.query.height as string) ?? NaN

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
