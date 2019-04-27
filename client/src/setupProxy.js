const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  // /api and /auth/google requests get forwarded to localhost:5000
  // request location is brought along as well ex localhost:5000/auth/google
  app.use(proxy(["/api", "/auth/google"], { target: "http://localhost:5000" }));
};
