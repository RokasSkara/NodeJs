/*

    JS will be used to authorize users and refresh authorization tokens
    1. Auth function used to verify user
    2. isAuth - middleware to view user only info
    3. refreshToken - token refresh function to create new token (refreshing 10m expiraiton timeframe)

*/

import jwt from 'jsonwebtoken'

// 1. Auth function used to verify user
let Auth = (req, res) => {
    let x = false;
    const privateKey = process.env.SECRET
    const token = req.cookies.token?.split(' ')[0]
    jwt.verify(token, privateKey, (err, decoded) => {
        if (err) {
            x = false
        } else {
            refreshToken(req.cookies.token, res)
            x = true;
        }
    })
    return x;
}

// isAuth - middleware to view user info *only for verified
let isAuth = (req, res, next) => {
    try {
        const privateKey = process.env.SECRET
        const token = req.cookies.token?.split(' ')[0]
        jwt.verify(token, privateKey, (err, decoded) => {
            if (err) {
                return res.status(400).send({ err: 'Incorrect or expired token - please login a gain' })
            } else {
                refreshToken(req.cookies.token, res)
                return next();
            }
        })
    } catch (err) {
        return res.status(400).send({ err: 'Incorrect or expired token - please log in a gain' })
    }
}

//3. refreshToken - token refresh function to create new token (refreshing 10m expiraiton timeframe)
let refreshToken = (req, res) => {
    const email = req.split(' ')[1]
    const id = req.split(' ')[2]
    const name = req.split(' ')[3]

    const privateKey = process.env.SECRET
    const token = jwt.sign({
        username: email,
        id: id
    }, privateKey, {
        expiresIn: '10m'
    })

    return res.cookie("token", `${token} ${email} ${id} ${name}`, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    })
}

export default isAuth
export { Auth }