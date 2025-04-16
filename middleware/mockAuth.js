module.exports = (req, res, next) => {
    req.user = { id: '67ec22b57c22f1891efa281a', email: 'ramon.altair9@gmail.com' }
    req.isAuthenticated = () => true
    next()
}