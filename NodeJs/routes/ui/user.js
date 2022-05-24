import express from 'express';
import isAuth from '../../controllers/authorization.js'
import con from '../../controllers/connector.js'

const router = express.Router()

//Get Blog info

router.get('/', isAuth, async (req, res) => {
    const id = req.cookies.token.split(' ')[2]
    const user = req.cookies.token.split(' ')[3]
    try {
        const [data] = await con.query(`
        SELECT *
        FROM blog
        WHERE author_id = ?
     `, [id])

        //in case its empty 
        let empty = 'Press Add Blog button above to create one'
        data.length > 0 ? empty = false : '';
        
        res.render('users', {
            css: 'user.css',
            script: 'user.js',
            data: data,
            user: user,
            empty: empty
        })
    } catch (err) {
        res.status(500).send({ error: `Error:` + err })
    }
})

//Post blog

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

//Delete blog

router.get('/delete', isAuth, async (req, res) => {
    try {
        await con.query(`
        DELETE FROM blog
        WHERE id = ? and author_id = ?
    `, [req.query.blogID, req.cookies.token.split(' ')[2]])
        res.status(200).redirect('/user')
    } catch (err) {
        res.status(500).send({ error: `Error:` + err })
    }
})

export default router