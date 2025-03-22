const express = require('express')
const router = express.Router()

const showsController = require('../controllers/shows')
const validation  = require('../middleware/validate')

router.get('/', showsController.getAll)

router.get('/:id', showsController.getSingle)

router.post('/', validation.saveShow, showsController.createShow)

router.put('/:id', validation.saveShow, showsController.updateShow)

router.delete('/:id', showsController.deleteShow)

module.exports = router