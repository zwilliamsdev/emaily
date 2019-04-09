const express = require('express'); // Backend and routing module
require('./services/passport'); // Bring in passport configuration

// Create express object
const app = express();

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