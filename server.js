import express from 'express'
import bodyParser from 'body-parser'
import viewEngine from './configs/viewEngine.js'
import initWebRoutes from './routes/web.js'
import cors from 'cors'
import connectDB from './configs/connectDB.js'

require('dotenv').config()

let cookieParser = require('cookie-parser')
let app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
viewEngine(app)
initWebRoutes(app)
connectDB(app)
let port = process.env.PORT
app.listen(port, () => {
  console.log(`Backend Nodejs is running on the port: `, port)
})
