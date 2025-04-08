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
            message: 'Error retrieving pets'
        })
    }
}