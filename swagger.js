const swaggerAutogen = require('swagger-autogen')

const doc = {
    info: {
        title: 'tvshows Api',
        description: 'tvshows Api'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
}

const outputFile = './swagger.json'
const endpointsFiles = ['./routes/index.js', './routes/tvshows.js']

// this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc)