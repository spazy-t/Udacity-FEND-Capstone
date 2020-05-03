const { app } = require('./../src/server/server')
const request = require('supertest')

describe('app get(/geo/:place)', () => {
    test('gets geo data and send it back', async () => {
        const res = await request(app).get('/geo/'+'Doncaster')
        //const response = 
        expect(res.status).toBe(200)
        //expect(res)
    })
})