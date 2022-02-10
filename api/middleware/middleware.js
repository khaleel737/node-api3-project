const Users = require(`../users/users-model`)
const Posts = require(`../posts/posts-model`)

function logger(req, res, next) {
  // DO YOUR MAGIC
  const timeStamp = new Date().toLocaleString();
  const method = req.method;
  const path = res.originalUrl

  console.log(`your request on ${timeStamp} through ${method} to ${path} is on and on and on`);
  next();

}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try {
    const userID = await Users.getById(req.params.id)
    if(!userID) {
      res.status(404).json({ message: "user not found" })
    } else {
      req.user = userID;
    }
  } catch (err) {
    res.status(500).json({ message: `Could Not Get User ID `})
  }
  next();
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  
 const { name } = req.body;
 if(!name || !name.trim()) {
  res.status(400).json({ message: "missing required name field" })
 } else {
  req.name = name.trim()
  next()
 }

}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body
  if(!text || !text.trim()) {
    res.status(400).json({ message: "missing required text field" })
  } else {
    req.text = text.trim()
    next()
  }

}

// do not forget to expose these functions to other modules
module.exports = {
  logger, 
  validateUser, 
  validateUserId, 
  validatePost
}