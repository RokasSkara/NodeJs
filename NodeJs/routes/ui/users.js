import express from 'express';
import isAuth from '../../controllers/authorization.js'
import con from '../../controllers/connector.js'

const router = express.Router()


router.get('/', isAuth, async (req, res) => {
    const id = req.cookies.token.split(' ')[2]
    try {
        const [data] = await con.query(`
        SELECT *
        FROM blog
        WHERE author_id = ?
     `,[id]) 
        res.render('users', {
            css: 'users.css',
            script: 'users.js',
        })
    } catch (err) {
        console.log(err)
    }
})


export default router