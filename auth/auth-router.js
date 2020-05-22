const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const auth = require('./authenticate-middleware.js')
const db = require('../database/dbConfig.js')

router.get('/users', auth, (req, res) => {
  db('users')
  .then(users => {
    res.status(200).json({ users })
  })
})

router.post('/register', (req, res) => {
  const newUser = req.body;
  const hash = bcrypt.hashSync(newUser.password, 16)
  newUser.password = hash

  db('users')
  .insert(newUser)
  .then(user => {
    res.status(201).json({ userID: user[0] })
  })
  .catch(error => {
    console.error(error)
    res.status(500).json({
      message: 'cannot insert new user'
    })
  })
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db('users')
  .where({ username })
  .first()
  .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = payload(user)
      res.status(200).json({
        message: `User ${user.username} Logged in!`,
        token,
      })
    } else {
      res.status(401).json({
        message: 'Invalid credentials'
      })
    }
  })
});

function payload(user) {
  const payload = {
    userId: user.id,
    username: user.username
  }
  return jwt.sign(payload, process.env.AUTH_SECRET)
}

module.exports = router;
