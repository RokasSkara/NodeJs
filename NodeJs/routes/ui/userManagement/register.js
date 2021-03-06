import express from 'express'
import bcrypt from 'bcrypt'

//local imports
import con from '../../../controllers/connector.js'
import RegValidation from '../../../controllers/dataValidation.js'
import {PORT} from '../../../server.js'

const router = express.Router();

//registration
router.post('/', async(req,res) => {
    const request = req.body
    const hashedPass = await bcrypt.hash(request.password, 5);

    if(RegValidation(request)){
        try {
            await con.query(`
                INSERT INTO user (name, email, password, register_time)
                VALUES (?,?,?,?)
            `, [request.name, request.email, hashedPass, new Date().toLocaleString('LT')])
            res.redirect(`http://localhost:${PORT}/userManagement`)
        } catch (err) {
            res.status(500).send({ error: `Error:` + err })
        }
    } else {
        res.status(400).send('Incorrect information provided, check and try again')
    }
})


export default router;