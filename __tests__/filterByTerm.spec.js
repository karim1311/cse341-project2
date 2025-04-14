const userId = new mongoose.Types.ObjectId().toString();

const Tvshow = require('../models/TvshowModel')
// const TestResponse = require('../lib/test-response')

jest.setTimeout(60000)

describe('Tvshow routes', () => {
    test('Get tvshows by its Id', async () => {
        const _tvshow = {
            _id: '67f97510d6fadf08884176db',
            members: [],
            projects: []
        }

        mockingoose(Tvshow).toReturn(_tvshow, 'find')

        const req = {
            params: { userId: '67eb08a839363becc211c6e6'}
        }

        const res = new TestResponse()

        await retrieveOne(req, res)
        expect(res.statusCode).toBe(201)
        expect(res.data).toEqual(_tvshow)
    })
})

