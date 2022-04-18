import express from 'express'
import resize from '../utils/resize'
import upload from '../utils/upload'

const routes = express.Router()

routes.post('/', upload, async (req, res) => {
    // console.log(JSON.stringify(req.file))
    if(req.file)
    await resize(__dirname + './' + req.file.originalname)
    // console.log(req.body.height);
    res.sendStatus(200)
})

export default routes
