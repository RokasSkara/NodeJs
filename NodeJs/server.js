import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

const options = {
    origin: `http://locahost:3000/`,
    optionsSuccessStatus: 200
}

app.use(express.json(), express.urlencoded({extended: false}), cors(options), cookieParser())


app.use('/', (req,res) => {
    res.status(200).send({msg: 'Hello'})
})

app.listen(3000, () => console.log(`Server live`));