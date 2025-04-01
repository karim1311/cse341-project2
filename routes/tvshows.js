const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Tvshow = require('../models/Tvshow')

// @desc    Show add page
// @route   GET /tvshows/add
router.get('/add', ensureAuth, (req, res) => {
  res.render('tvshows/add')
})

// @desc    Process add form
// @route   POST /tvshows
router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id
    await Tvshow.create(req.body)
    res.redirect('/dashboard')
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

// @desc    Show all tvshows
// @route   GET /tvshows
router.get('/', ensureAuth, async (req, res) => {
  try {
    const tvshows = await Tvshow.find({ status: 'public' })
      .populate('user')
      .sort({ createdAt: 'desc' })
      .lean()
      

      // Check if the request expects JSON (via the Accept header)
      if (req.accepts('json')) {
      // If the client accepts JSON, return the JSON response
      return res.status(200).json(tvshows);
    }

    // res.status(200).json(tvshows)
    // res.status(200).json(tvshows)
    // i will only send back json
    res.render('tvshows/index', {
      tvshows,
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

// @desc    Show single story
// @route   GET /tvshows/:id
router.get('/:id', ensureAuth, async (req, res) => {
  try {
    let tvshow = await Tvshow.findById(req.params.id).populate('user').lean()

    if (!tvshow) {
      return res.render('error/404')
    }

    if (tvshow.user._id != req.user.id && tvshow.status == 'private') {
      res.render('error/404')
    } else {
      res.render('tvshows/show', {
        tvshow,
      })
    }
  } catch (err) {
    console.error(err)
    res.render('error/404')
  }
})

// @desc    Show edit page
// @route   GET /tvshows/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
  try {
    const tvshow = await Tvshow.findOne({
      _id: req.params.id,
    }).lean()

    if (!tvshow) {
      return res.render('error/404')
    }

    if (tvshow.user != req.user.id) {
      res.redirect('/tvshows')
    } else {
      res.render('tvshows/edit', {
        tvshow,
      })
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})

// @desc    Update tvshow
// @route   PUT /tvshows/:id
router.put('/:id', ensureAuth, async (req, res) => {
  try {
    let tvshow = await tvshow.findById(req.params.id).lean()

    if (!tvshow) {
      return res.render('error/404')
    }

    if (tvshow.user != req.user.id) {
      res.redirect('/tvshows')
    } else {
      tvshow = await tvshow.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      })

      res.redirect('/dashboard')
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})

// @desc    Delete tvshow
// @route   DELETE /tvshows/:id
router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    let tvshow = await tvshow.findById(req.params.id).lean()

    if (!tvshow) {
      return res.render('error/404')
    }

    if (tvshow.user != req.user.id) {
      res.redirect('/tvshows')
    } else {
      await tvshow.deleteOne({ _id: req.params.id })
      res.redirect('/dashboard')
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})

// @desc    User tvshows
// @route   GET /tvshows/user/:userId
router.get('/user/:userId', ensureAuth, async (req, res) => {
  try {
    const tvshows = await tvshow.find({
      user: req.params.userId,
      status: 'public',
    })
      .populate('user')
      .lean()

    res.render('tvshows/index', {
      tvshows,
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

//@desc Search tvshows by title
//@route GET /tvshows/search/:query
router.get('/search/:query', ensureAuth, async (req, res) => {
  try{
      const tvshows = await tvshow.find({title: new RegExp(req.query.query,'i'), status: 'public'})
      .populate('user')
      .sort({ createdAt: 'desc'})
      .lean()
     res.render('tvshows/index', { tvshows })
  } catch(err){
      console.log(err)
      res.render('error/404')
  }
})


module.exports = router