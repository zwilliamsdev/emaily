const passport = require('passport'); // OAuth Helper
const GoogleStrategy = require('passport-google-oauth20').Strategy; // Google strategy for Passport
const mongoose = require('mongoose'); // Handle mongodb requests
const keys = require('../config/keys');

const User = mongoose.model('users'); // Tell mongoose to use users schema

// Tell passport to use google strategy object
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID, // Client ID from google dev console
    clientSecret: keys.googleClientSecret, // Client secret from google dev console
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Check to see if the user already is registered
    // Returns a promise not an object or user info directly
    User.findOne({
            googleId: profile.id
        })
        // Promise returned by findOne
        .then((existingUser) => {
            if (existingUser) {
                // User has already registered do not create a record
                // Done: error(s), record
                done(null, existingUser);
            } else {
                // User is not registered create a new record
                // Create a new user object, save it to the DB
                new User({
                        // Google ID from the profile passed in by oauth
                        googleId: profile.id
                    })
                    // Save to DB
                    .save()
                    // Tell passport everything is done
                    // null - no errors, user - newly created user
                    .then(user => done(null, user));
            }
        });
}));