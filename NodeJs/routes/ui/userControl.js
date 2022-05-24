import express from 'express'
import register from './userManagement/register.js'
import login from './userManagement/login.js'
import logout from './userManagement/logout.js'

const router = express.Router();


//default view
router.get('/', async (req,res) => {
    res.status(200).render('userControl',{
        script: 'userControl.js',
        css: 'userControl.css'
    })
})

router.use('/register', register)
router.use('/login', login)
router.use('/logout', logout);


export default router