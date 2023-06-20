const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
function authenticateToken(req, res, next) {
    const token = req.headers.authorization;
    const trusted_routes = ["/login", "/register", '/'];
    if (trusted_routes.includes(req.path)) {
      return next();
    }
    if (token == null) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    } else {
      jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
          return res.status(401).json({ msg: "Token is not valid" });
        }
        req.user = user;
        next();
      });
    }
}

module.exports = authenticateToken;
