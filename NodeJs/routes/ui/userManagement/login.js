import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//file imports
import con from '../../../controllers/connector.js'
import { LogValidation } from '../../../controllers/dataValidation.js'
import {PORT} from '../../../server.js'

const router = express.Router();

//registration
router.post('/', async (req, res) => {
    const loginData = req.body
    try {
        await LogValidation(loginData)
    } catch (err) {
        console.log(err)
        return res.status(400).send({ err: 'Incorrect email or password' })
    }

    try {
        const [data] = await con.query(`
        SELECT *
        FROM user
        WHERE email = ?
     `, [loginData.email])
        if (data.length === 0) {
            return res.status(400).send({ err: 'Incorrect email or password' })
        }
        const Auth = await bcrypt.compare(loginData.password, data[0].password)
        if (Auth) {
            const privateKey = process.env.SECRET
            const token = jwt.sign({
                username: data[0].email,
                id: data[0].id
            }, privateKey, {
                expiresIn: '10m'
            })
            return res.cookie('token', `${token} ${data[0].email} ${data[0].id} ${data[0].name}`, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production'
            })
                .status(200)
                .redirect(`http://localhost:${PORT}/`)
        }
        return res.status(400).send({ err: 'Incorrect email or password' })
    } catch (err) {
        return res.status(400).send({ err: 'Unexpected error please try again' })
    }
})


export default router;