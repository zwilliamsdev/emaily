const passport = require('passport'); // OAuth Helper
const GoogleStrategy = require('passport-google-oauth20').Strategy; // Google strategy for Passport
const keys = require('../config/keys');

// Tell passport to use google strategy object
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID, // Client ID from google dev console
    clientSecret: keys.googleClientSecret, // Client secret from google dev console
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    console.log('Access Token: ' + accessToken);
    console.log('Refresh Token: ' + refreshToken);
    console.log('Profile: ' + JSON.stringify(profile));
}));