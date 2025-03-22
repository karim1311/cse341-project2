const swaggerAutogen = require('swagger-autogen')

const doc = {
    info: {
        title: 'Series API',
        description: 'TV series, shows and anime API'
    },
    host: 'https://cse341-project2-6ivw.onrender.com',
    schemes: ['https']
}

const outputFile = './swagger.json'
const endpointsFiles = ['./routes/index.js']

// this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc)
