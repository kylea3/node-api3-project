const express = require('express');
const User = require('./users-model')
const Post = require('../posts/posts-model')
const {validateUserId, validatePost, validateUser} = require('../middleware/middleware')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get()
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({ message: "something happened with the server"})
    })
});

router.get('/:id', validateUserId, (req, res) => {
  User.getById(req.params.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({ message: "something happened with the server"})
    })
});

router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  User.insert({ name: req.name })
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(500).json({ message: "something happened with the server"})
    })
});

router.put('/:id', validateUserId, validatePost, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  User.update(req.params.id, { name: req.name })
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(500).json({ message: "something happened with the server"})
   })
});

router.delete('/:id', validateUserId, async (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  try { await User.remove(req.params.id)
      res.status(200).json(req.user)
    }
    catch(err) {
      res.status(500).json({ message: "something happened with the server"})
    }
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', validateUserId, validatePost, validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;