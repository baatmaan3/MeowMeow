import './db/mongoose.js'
import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import sessions from 'express-session'
import logger from 'morgan'
import routes from './routes/index.js'
import { fileURLToPath } from 'url'
import { dirname, join, resolve } from 'path'

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 8080
const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()

// view engine setup
app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: true }))
app.locals.baseURL = `${host}:${port}`

app.use(express.static(join(__dirname, '../node_modules/flowbite/dist/')))
app.use(express.static(join(__dirname, '../dist')))
app.use(express.static(join(__dirname, '../assets')))
app.set('views', join(__dirname, '/views'))
app.set('view engine', 'ejs')

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
  secret: "sheeeesh",
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false
}));
app.use(cookieParser());

Object.values(routes).map(route => app.use(route))

// Server Config
app.listen(port, () => {
  console.clear()
  console.log(`> Time: ${new Date()}\n> Host: ${host}\n> Post: ${port} \n----------------------------------------`)
})
