const express = require('express')
const router = express.Router()

const postsController = require('../controllers/posts.controller')

router.get('/', postsController.getAll)
router.get('/:id', postsController.getById)
router.post('/', postsController.create)
router.patch('/:id', postsController.update)
router.delete('/:id', postsController.delete)

module.exports = router
