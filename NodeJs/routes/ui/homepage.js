import express from 'express'

const router = express.Router();

router.get('/', async (req,res) => {
    res.status(200).render('home',{
        script: 'home.js',
        css: 'home.css'
    })
})

export default router