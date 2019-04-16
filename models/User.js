// Handle Mongo DB requests
const mongoose = require('mongoose');
// Destructure the mongoose schema property to the variable Schema
const {
    Schema
} = mongoose;


// Schema defines the structure of the user collection
const userSchema = new Schema({
    googleId: String
});

// Tell mongoose to create the model
// arguments: name of model, name of schema
mongoose.model('users', userSchema);