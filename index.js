const express = require('express'); // Backend and routing module
const mongoose = require('mongoose'); // Handle MongoDB calls
const keys = require('./config/keys'); // Secret keys and config
const cookieSession = require('cookie-session'); // Give us the ability to use cookies
const passport = require('passport'); // Import passport
require('./models/User'); // Bring in the user schema
// ALL MODELS MUST BE BROUGHT IN BEFORE PASSPORT
require('./services/passport'); // Bring in passport configuration

// Create express object
const app = express();

app.use(
    cookieSession({
        // 30 days: 30d * 24h * 60m * 60s * 1000ms
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey] // Encryption key to sign cookie
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Initialize database connection
mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true
});

// Return the authRoutes function
// and then immediatelly call function
// with the app object
require('./routes/authRoutes')(app);

// Create port for Heroku / Fallback port
const PORT = process.env.PORT || 5000;

// Port Express is listening on
app.listen(PORT);

// Log success message if server starts correctly
console.log("Server running on port: " + PORT);