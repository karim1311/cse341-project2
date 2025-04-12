const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function(passport){
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: 'http://localhost:3000/auth/google/callback'
            },

            async (accessToken, refreshToken, profile, done) => {
                try {
                    // Check if user exists
                    let user = await User.findOne({ googleId: profile.id });
            
                    // If user doesn't exist, create new user
                    if (!user) {
                      const email = profile.emails[0].value;
            
            
                      user = await User.create({
                        googleId: profile.id,
                        email: email,
                        name: profile.displayName,
                      });
                      console.log("New user created:", user.email, "with role:", role);
                    }
            
                    return done(null, user);
                  } catch (err) {
                    console.error("Error in Google strategy:", err);
                    return done(err, null);
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