const express = require('express');
const ViewsController = require('../controllers/viewController.js')
const AuthController = require('../controllers/authController.js');

const router = express.Router()

router.get('/', AuthController.isLoggedIn, ViewsController.getOverview)
router.get('/login',AuthController.isLoggedIn, ViewsController.getLoginForm)
router.get('/tour/:slug',AuthController.isLoggedIn, ViewsController.getTour)
router.get('/me', AuthController.protect, ViewsController.getAccount)

module.exports = router; 