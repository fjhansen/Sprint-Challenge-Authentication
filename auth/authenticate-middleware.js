const jwt = require('jsonwebtoken')

// require('dotenv').config();

module.exports = (req, res, next) => {
const token = req.headers.auth
const secret = process.env.AUTH_SECRET

if(token) {
  jwt.verify(token, secret, (error, decodedToken) => {
    if (error) {
      res.status(401).json({
        you: 'shall not pass!'
      })
    } else {
      req.decodedToken = decodedToken
      next();
    }
  })
} else {
  res.status(400).json({
    message: 'Missing Credentials, Please provide'
  })
}

};

