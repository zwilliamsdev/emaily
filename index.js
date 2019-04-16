const express = require('express'); // Backend and routing module
const mongoose = require('mongoose'); // Handle MongoDB calls
const keys = require('./config/keys'); // Secret keys and config
require('./models/User'); // Bring in the user schema
// ALL MODELS MUST BE BROUGHT IN BEFORE PASSPORT
require('./services/passport'); // Bring in passport configuration

// Create express object
const app = express();

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