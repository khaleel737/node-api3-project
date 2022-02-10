const express = require('express');

const Users = require('./users-model')
const Posts = require('../posts/posts-model')

const  { validateUserId, validateUser, validatePost } = require(`../middleware/middleware`)

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', async (req, res) => {
  try {

    // RETURN AN ARRAY WITH ALL THE USERS
    const allUsers = await Users.get(req.params);
    res.status(200).json(allUsers)
  } catch (err) {
    res.status(404).json({ message: `Request not found` })
  }
});

router.get('/:id', validateUserId,  (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  // RETURN AN ARRAY WITH ALL THE USERS
    res.json(req.user)
  
});

router.post('/', validateUser, async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid


    // RETURN AN ARRAY WITH ALL THE USERS
    const insertUser = await Users.insert({ name: req.name});
    res.status(201).json(insertUser)
    next();
  
});

router.put('/:id', validateUserId, validateUser, async (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try {
    // RETURN AN ARRAY WITH ALL THE USERS
    const updateUser = await Users.update(req.params.id, {name: req.name});
    res.status(200).json(updateUser)
  } catch (err) {
    res.status(404).json({ message: `Update countered Error` })
  }
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  try {
    // RETURN AN ARRAY WITH ALL THE USERS
    const deleteUser = await Users.remove(req.params.id);
    res.json(deleteUser)
  } catch (err) {
    next(err)
  }
});

router.get('/:id/posts', validateUserId, async (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  try {

  
   const findPosts = await Posts.getUserPosts(req.params.id);
    res.status(200).json(findPosts)
  } catch (err) {
    res.status(404).json({ message: `Request not found` })
  }
});

router.post('/:id/posts', async (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try {

    // RETURN AN ARRAY WITH ALL THE USERS
    const findPosts = await Posts.insert(req.params.id);
    res.status(200).json(findPosts)
  } catch (err) {
    res.status(404).json({ message: `Request not found` })
  }
  
});

// do not forget to export the router

module.exports = router;
