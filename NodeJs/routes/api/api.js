import express from 'express'
import users from './api subroutes/users.js'
import blog from './api subroutes/blog.js'

const router = express.Router();

router.use('/users', users)
router.use('/blog', blog)

export default router