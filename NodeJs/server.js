import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import { engine } from 'express-handlebars';
import path from 'path';
//Routes
import homepage from './routes/ui/homepage.js'
import userControl from './routes/ui/userControl.js'

//


const app = express()
const PORT = process.env.UserPort || 3000

// cors options
const options = {
    origin: `http://locahost:${PORT}/`,
    optionsSuccessStatus: 200
}

// handlebars setup
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.json(), express.urlencoded({extended: false}), cors(options), cookieParser(),express.static(path.resolve('public')))


app.use('/', homepage)
app.use('/accesspage', userControl)

app.listen(PORT, () => console.log(`Server live on port ${PORT}`));

export {PORT}