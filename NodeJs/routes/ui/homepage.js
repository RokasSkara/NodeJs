import express from 'express'
import { Auth } from '../../controllers/authorization.js'

const router = express.Router();

router.get('/', async (req,res) => {
    if(Auth(req,res)){
        res.status(200).render('home',{
            script: 'home.js',
            css: 'home.css',
            Auth: true,
            user: req.cookies.token.split(' ')[3],
        })
    } else {
        res.status(200).render('home',{
            script: 'home.js',
            css: 'home.css',
            Auth: false,
        })
    }

})

export default router