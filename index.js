const express = require('express'); // Backend and routing module
const passport = require('passport'); // OAuth Helper
const GoogleStrategy = require('passport-google-oauth20').Strategy; // Google strategy for Passport
const keys = require('./config/keys');

// Create express object
const app = express();

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

// Create route handler
// pass a user on /auth/google to passport and
// attempt to authenticate with google
// scope: What information we are requesting from Google
app.get('/auth/google/', passport.authenticate('google', {
    scope: ['profile', 'email'] // Request users profile and email from google
}));

// This will see the users authentication code from google
// google strategy will now validate the request and send back
// the users data
app.get('/auth/google/callback', passport.authenticate('google'));

// Create port for Heroku / Fallback port
const PORT = process.env.PORT || 5000;

// Port Express is listening on
app.listen(PORT);

// Log success message if server starts correctly
console.log("Server running on port: " + PORT);

/***
 * http://localhost:5000/auth/google/callback
 * 
 * https://console.developers.google.com/apis/credentials? highlightClient=490982879883-3ggkt30r6jib4o3q8vt51lvg9fh7r2c8.apps.googleusercontent.com
 * &project=symbolic-folio-237004
 * &supportedpurview=project
 ***/