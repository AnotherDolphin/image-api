import app from '../index'
import supertest from 'supertest'
import fs from 'fs'
import isCached from '../utils/isCached'
import resize from '../utils/resize'
import sizeOf from 'image-size'

const request = supertest(app)

describe('Test image transformation and image finding utilities', () => {

    beforeAll( async () => {
    // upload a sample to test utilities on
        const query = await request
        .post('/post')
        .attach('image', './src/tests/sample.png')
    })

    it('test isCached() to find image', () => {
        expect(isCached('sample.png')).toBeTruthy()
    })

    it('test resize() to correctly transform an image', async () => {
        await resize('./src/tests/sample.png', 150, 150)
        expect(sizeOf('./src/tests/sample@150x150.png').width).toEqual(150)
    })

    // delete generated test images after testing
    afterAll( async () => {
        fs.unlink('./gallery/sample.png', err => {
            console.log('deleted uploaded test image sample') 
        })
        fs.unlink('./gallery/sample@150x150.png', err => {
            console.log('deleted transformed test image sample') 
        })
    })
})
