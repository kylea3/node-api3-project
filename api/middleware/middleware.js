const User = require('../users/users-model')

function logger(req, res, next) {
  console.log(`Request Method: ${req.method} Request URL: ${req.url} Timestamp: ${Date.now()}`)
  next();

}

async function validateUserId(req, res, next) {
  try {
  const id = await User.getById(req.params.id);
  if(!id) {
    next({ status: 404, message: "user not found" })
  } else {
    req.user = id;
    next();
  }
  }
  catch (err) {
    res.status(500).json({ 
      message: 'problem finding user'
    })
  }
}

function validateUser(req, res, next) {
      const { name } = req.body;
    if(!name) {
      next({ message: "missing required name field" })
    } else {
      next()
    }
  }

function validatePost(req, res, next) {
  const { text } = req.body;
    if(!text) {
      next({ message: "missing required text field" })
    } else {
      next()
    }
}

// do not forget to expose these functions to other modules
module.exports = {
  validatePost,
  validateUser,
  validateUserId,
  logger
}