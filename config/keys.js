if (process.env.NODE_ENV === 'production') {
    // return production keys
    // require and immediately export prod.js
    module.exports = require('./prod');
} else {
    // return development keys
    // require and immediately export dev.js
    module.exports = require('./dev');
}