const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('tvshows').find()
    result.toArray().then((shows) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(shows)
    })
//     mongodb
//     .getDatabase()
//     .db()
//     .collection('tvshows')
//     .find()
//     .toArray((err, lists) => {
//       if (err) {
//         res.status(400).json({ message: err })
//       }
//     res.setHeader('Content-Type', 'application/json');
//     res.status(200).json(lists);
//   });
}

const getSingle = async (req, res) => {
    const showId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db().collection('tvshows').find({ _id: showId})
    result.toArray().then((shows) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(shows[0])
    })
}

const createShow = async (req, res) => {
    const show = {
        name: req.body.name,
        episodes: req.body.episodes,
        seasons: req.body.seasons,
        releasedate: req.body.releasedate,
        enddate: req.body.enddate,
        watched: req.body.watched
    }

    const response = await mongodb.getDatabase().db().collection('tvshows').insertOne(show)
    if(response.acknowledged) {
        res.status(201).json(response)
    } else {
        res.status(500).json(response.error || `Some error creating the show.`)
    }
}

const updateShow = async (req, res) => {
    // validation
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid show id to update the show.')
    }

    const showId = new ObjectId(req.params.id)

    const show = {
        name: req.body.name,
        episodes: req.body.episodes,
        seasons: req.body.seasons,
        releasedate: req.body.releasedate,
        enddate: req.body.enddate,
        watched: req.body.watched
    }

    const response = await mongodb.getDatabase().db().collection('tvshows').replaceOne({ _id: showId }, show)
    if (response.modifiedCount > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || `Some error occurred while updating the show.`)
    }
}

const deleteShow = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid show id to delete a show.')
    }
    const showId = new ObjectId(req.params.id)
    const response = await mongodb.getDatabase().db().collection('tvshows').deleteOne({ _id: showId })
    if (response.deletedCount > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || `Some error occurred while deleting the show.`)
    }
}

module.exports = {
    getAll,
    getSingle,
    createShow,
    updateShow,
    deleteShow
}