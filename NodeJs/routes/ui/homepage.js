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
        //in case its empty 
        let empty = 'No blogs yet - Login and click on My Blogs to create one!'
        data.length > 0? empty = false : '';
        
        if (Auth(req, res)) {
            res.status(200).render('home', {
                script: 'home.js',
                css: 'home.css',
                data: data,
                Auth: true,
                user: req.cookies.token.split(' ')[3],
                empty: empty,
            })
        } else {
            res.status(200).render('home', {
                script: 'home.js',
                css: 'home.css',
                data: data,
                Auth: false,
                empty: empty
            })
        }
    } catch (err) {
        res.status(500).json({err: err})
    }
})

export default router