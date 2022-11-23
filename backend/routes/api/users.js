const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;

    let duplicateError = [];
    let emptyError = [];

    const validEmail = await User.findOne({
      where: { email }
    });

    if (validEmail) {
      duplicateError.push("User with that email already exists")
    };

    const validUserName = await User.findOne({
      where: { username }
    });

    if (validUserName) {
      duplicateError.push("User with that username already exists")
    };

    if (!req.body.firstName) {
      emptyError.push("First Name is required")
    };

    if (!req.body.lastName) {
      emptyError.push("Last Name is required")
    };

    if (!req.body.username) {
      emptyError.push("Username is required")
    };

    if (duplicateError.length) {
      return res.status(403).json(duplicateError);
    }

    if (emptyError.length) {
      return res.status(400).json(emptyError)
    }

    const user = await User.signup({ email, username, password, firstName, lastName });

    const token = await setTokenCookie(res, user);

    const newUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      token: token,
    };

    return res.json(newUser)
  }
);


module.exports = router;
