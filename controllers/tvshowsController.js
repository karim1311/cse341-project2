const Tvshow = require('../models/TvshowModel')

// @desc Get all tvshows
// @route GET /tvshows
exports.getTvshows = async (req, res) => {
    try {
        const tvshows = await Tvshow.find({ userId: req.user.id }).sort({ name: 1 })

        res.json({
            success: true,
            count: tvshows.length,
            data: tvshows
        })
    } catch (err) {
        console.error('error retrieving tvshows:', err)
        res.status(500).json({
            success:false,
            message: 'Error retrieving tvshows'
        })
    }
}

// @desc    Create new tvshow
// @route   POST /api/tvshows
exports.createTvshow = async (req, res) => {
    try {
      // Add the current user's ID to the tvshow data
      req.body.userId = req.user.id;
      
      // Create the new pet
      const tvshow = await Tvshow.create(req.body);
      
      res.status(201).json({
        success: true,
        data: tvshow
      });
    } catch (err) {
      console.error('Error creating tvshow:', err);
      
      // Check for validation error
      if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
        return res.status(400).json({
          success: false,
          message: messages.join(', ')
        });
      }
      
      res.status(500).json({
        success: false,
        message: 'Error creating tvshow'
      });
    }
  };