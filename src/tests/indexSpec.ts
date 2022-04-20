import app from '../index'
import supertest from 'supertest'

const request = supertest(app)

describe('test server run', () => {
    it('main enpoint success', async () => {
        const response = await request.get('/')
        expect(response.status).toBe(200)
    })
})

