const express = require('express');
const app = express();

// Create route handler
app.get('/', (req, res) => {
    res.send({
        hi: 'there'
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log("Server running on port: " + PORT);