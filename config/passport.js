const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function(passport){
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: 'https://cse341-project2-6ivw.onrender.com/auth/google/callback'
            },

            async (accessToken, refreshToken, profile, done) => {
                const newUser = {
                    googleId: profile.id,
                    displayName: profile.displayName,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    image: profile.photos[0].value
                }

                try{
                    let user = await User.findOne({ googleId: profile.id })

                    if (user){
                        done(null, user)
                        console.log('uuser already exists')
                        res.status(404).send()
                    } else {
                        user = await User.create(newUser)
                        done(null, user)
                    }
                } catch (err) {
                    console.error(err)
                }
}))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id)
            done(null, user)
        } catch (err) {
            done(err, null)
        }
    })
}