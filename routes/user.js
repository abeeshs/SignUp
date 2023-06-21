const express = require('express')
const { SignupController, LoginController } = require('../controllers/userController')
const { userProtect } = require('../middleware/authMiddleware')

const router = express.Router()

const signupController = new SignupController()
const loginController = new LoginController()


router.post('/signup', signupController.signup)
router.post('/signin', loginController.login)


module.exports = router