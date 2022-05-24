import express from 'express'
import { Auth } from '../../controllers/authorization.js'
import con from '../../controllers/connector.js'

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [data] = await con.query(`
            SELECT *
            FROM blog
         `)
        if (Auth(req, res)) {
            res.status(200).render('home', {
                script: 'home.js',
                css: 'home.css',
                data: data,
                Auth: true,
                user: req.cookies.token.split(' ')[3],
            })
        } else {
            res.status(200).render('home', {
                script: 'home.js',
                css: 'home.css',
                data: data,
                Auth: false,
            })
        }
    } catch (err) {
        res.status(500).json({err: err})
    }
})

export default router