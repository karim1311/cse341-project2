const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const mongodb = require('./data/database')
const app = express()

const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-with, Content-Type, Accept, Z-Key'
    )
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
})
app.use('/', require('./routes'))

process.on('uncaughtException', (err,origin) => {
    console.log(process.stderr.fd, `Caught Exception: ${err}\n` + `Exception origin: ${origin}`)
})

mongodb.initDb((err) => {
    if(err) {
        console.log(err)
    }
    else {
        app.listen(port, () => {console.log(`Daatabase is listening and node running on port ${port}`)})
    }
})