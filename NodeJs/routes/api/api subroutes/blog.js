import e from 'express';
import express from 'express'
import con from '../../../controllers/connector.js'

const router = express.Router();

router.get('/:id?', async (req, res) => {
    try {
        const [data] = await con.query(`
        SELECT *
        FROM blog
        ${req.params.id ? 'WHERE id = ?' : ''}
     `, [req.params.id])
        if (req.params.id === undefined) {
            data.length > 0 ? res.json(data) : res.json({ err: `No data available` })
        } else {
            data.length > 0 ? res.json(data) : res.json({ err: `Blog with id ${req.params.id} not found` })
        }
    } catch (err) {
        console.log(err)
    }
})


export default router