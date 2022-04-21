import app from '../index'
import supertest from 'supertest'
import fs from 'fs'
import isCached from '../utils/isCached'

const request = supertest(app)

describe('Test route responses', () => {

    it('upload sample image from local dir', async () => {
        const query = await request
            .post('/post')
            .attach('image', './src/tests/sample.png')
        expect(isCached('sample.png')).toBeTruthy()
    })

    it('request cached image', async () => {
        const query = await request.get('/img/sample.png')
        expect(query.status).toBe(200)
    })

    it('request a missing image', async () => {
        const query = await request.get('/img/bad-path.png')
        expect(query.text).toBe('Image does not exist')
    })

    it('request image without extension', async () => {
        const query = await request.get('/img/bad-path')
        expect(query.text).toBe('requested image file missing extension')
    })

    it('requests new image size', async () => {
        const query = await request.get('/img/sample.png?height=100')
        expect(query.status).toBe(200)
    })

    // delete generated test images after testing
    afterAll( async () => {
        fs.unlink('./gallery/sample.png', err => {
            console.log(err?? 'deleted uploaded test image sample') 
        })
        fs.unlink('./gallery/sample@x100.png', err => {
            console.log(err?? 'deleted resized test image sample') 
        })
    })
})
