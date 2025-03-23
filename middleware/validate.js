const validator = require('../helpers/validate')

const saveShow = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        episodes: 'required|integer',
        seasons: 'required|integer',
        releasedate: 'required|string',
        enddate: 'string',
        watched: 'required|boolean'
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            })
        } else {
            next()
        }
    })
}

module.exports = {
    saveShow
}