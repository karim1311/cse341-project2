const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('tvshows').find()
    result.toArray().then((shows) => {
        res.setHeader('Content-Type', 'application/json')
    })
}

const getSingle = async (req, res) => {
    const showId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db().collection('tvshows').find({ _id: showId })
    result.toArray().then((shows) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(shows[0])
    })
}

