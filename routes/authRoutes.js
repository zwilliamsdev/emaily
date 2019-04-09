const passport = require('passport'); // Bring in passport module

module.exports = (app) => {
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
}