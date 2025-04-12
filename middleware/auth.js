module.exports = {
    ensureAuth: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next()
        } 

        res.redirect('/login.html')
    },
    ensureGuest: function(req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect('/dashboard')
        } else {
            return next()
        }
    },
}