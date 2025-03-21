const router = require('express').Router()

router.use('/', require('./swagger'))

router.get('/', (req, res) => {
    res.send('Hello world')
})

router.use('/series', require('./series'))

module.exports = router