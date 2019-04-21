const passport = require('passport'); // OAuth Helper
const GoogleStrategy = require('passport-google-oauth20').Strategy; // Google strategy for Passport
const mongoose = require('mongoose'); // Handle mongodb requests
const keys = require('../config/keys');

const User = mongoose.model('users'); // Tell mongoose to use users schema

// Generate identifying piece of information about user
// This gets the users ID from the DB (Not the profile ID)
// This way if they used another strategy to register we
// can still find their profile. googleId -> mongo db id
// user - user just pulled from database from passport.use
passport.serializeUser((user, done) => {
    // Callback to tell passport we have finished
    // error if any exists, user ID
    done(null, user.id);
});

// Opposite of serializing the user
// Take the users ID and turn it into
// a profile ID. mongo db id -> googleId
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

// Tell passport to use google strategy object
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID, // Client ID from google dev console
    clientSecret: keys.googleClientSecret, // Client secret from google dev console
    callbackURL: '/auth/google/callback',
    proxy: true // Going through the Heroku proxy, fixes redirect_uri mismatch
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