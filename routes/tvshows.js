const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const { check } = require('express-validator')

const { 
  getTvshows,
  createTvshow

} = require('../controllers/tvshowsController')

router.use(ensureAuth)

// @desc    Show add page
// @route   GET /tvshows/add
router.get('/add', ensureAuth, (req, res) => {
  res.render('tvshows/add')
})

// @desc    Process add form
// @route   POST /tvshows
router.post('/', [
  // validation
  check('name', 'Tvshow name is required').not().isEmpty()
], createTvshow)

// @desc    Show all tvshows
// @route   GET /tvshows
router.get('/', getTvshows)




module.exports = router