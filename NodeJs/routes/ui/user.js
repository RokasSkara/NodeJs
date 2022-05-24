import express from 'express';
import isAuth from '../../controllers/authorization.js'
import con from '../../controllers/connector.js'

const router = express.Router()


router.get('/', isAuth, async (req, res) => {
    const id = req.cookies.token.split(' ')[2]
    const user = req.cookies.token.split(' ')[3]
    try {
        const [data] = await con.query(`
        SELECT *
        FROM blog
        WHERE author_id = ?
     `,[id]) 
        res.render('users', {
            css: 'user.css',
            script: 'user.js',
            data: data,
            user: user
        })
    } catch (err) {
        res.status(500).send({ error: `Error:` + err })
    }
})

router.post('/', isAuth, async (req, res) => {
    try {
        await con.query(`
        INSERT INTO blog (author_id, title, content, created_at)
        VALUES(?,?,?,?)
     `, [req.cookies.token.split(' ')[2], req.body.title, req.body.content, new Date().toLocaleString('LT')])
        res.redirect('/user')
    } catch (err) {
        res.status(500).send({ error: `Error:` + err })
    }
})


export default router