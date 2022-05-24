import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import { engine } from 'express-handlebars';
import path from 'path';
//Routes
import homepage from './routes/ui/homepage.js'
import userControl from './routes/ui/userControl.js'
import user from './routes/ui/user.js'
import API from './routes/api/api.js'
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

app.use(express.json(), express.urlencoded({ extended: false }), cors(options), cookieParser(), express.static(path.resolve('public')))

//UI part
app.use('/', homepage)
app.use('/userManagement', userControl)
app.use('/user', user)

//API part
app.use('/api', API)

app.listen(PORT, () => console.log(`Server live on port ${PORT}`));

export { PORT }