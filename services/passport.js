const passport = require("passport"); // OAuth Helper
const GoogleStrategy = require("passport-google-oauth20").Strategy; // Google strategy for Passport
const mongoose = require("mongoose"); // Handle mongodb requests
const keys = require("../config/keys");

const User = mongoose.model("users"); // Tell mongoose to use users schema

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
    // callback to tell passport function is done
    // done(error, object to pass along)
    done(null, user);
  });
});

// Tell passport to use google strategy object
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID, // Client ID from google dev console
      clientSecret: keys.googleClientSecret, // Client secret from google dev console
      callbackURL: "/auth/google/callback",
      proxy: true // Going through the Heroku proxy, fixes redirect_uri mismatch
    },
    // asynchronous function returning promises
    async (accessToken, refreshToken, profile, done) => {
      // Set existingUser as the resolved promise of User.findOne
      const existingUser = await User.findOne({ googleId: profile.id });

      // User exists pass along their profile
      if (existingUser) {
        // callback to tell passport function is done
        // done(error, object to pass along)
        return done(null, existingUser);
      }

      // Write new user to database
      const user = await new User({ googleId: profile.id }).save();
      // callback to tell passport function is done
      // done(error, object to pass along)
      done(null, user);
    }
  )
);
