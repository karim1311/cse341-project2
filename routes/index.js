const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.use('/', require('./swagger'))

const Tvshow = require('../models/Tvshow')

// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  })
})

// @desc    Dashboard
// @route   GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const tvshows = await Tvshow.find({ user: req.user.id }).lean()
    res.render('dashboard', {
      name: req.user.firstName,
      tvshows,
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

module.exports = router