// import { promises as fs } from 'fs'
import routes from '../routes/post'
import resize from '../utils/resize'
import sizeOf from 'image-size'
import path from 'path'

import app from '../index'
import supertest from 'supertest'

const request = supertest(app)

describe('specpecpe thisisis', () => {
    it('expect this to equal 6', () => {
        expect(2 * 3).toEqual(6)
    })

    it('test image resizing', async () => {
        const imgPath = path.resolve('./gallery/shot.png')
        const resizedFile = await resize(imgPath, 200)
        const dimensions = await sizeOf(resizedFile!)
        expect(dimensions.width).toEqual(200)
    })
})

fdescribe('Test endpoint responses', () => {
    it('gets the api endpoint', async () => {
        const response = await request.get('/')
        expect(response.status).toBe(200)
    })

    it('request resized image', async () => {
        const query = await request.get('/img/shot.png?height=100')
        expect(query.status).toBe(200)
    })
})
