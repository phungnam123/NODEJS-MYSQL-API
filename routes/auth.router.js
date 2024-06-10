const express = require('express')
const router = express.Router()
const authRoutes = require('../controllers/auth.controller')

router.post('/register', authRoutes.register)
router.post('/login', authRoutes.login)

module.exports = router
