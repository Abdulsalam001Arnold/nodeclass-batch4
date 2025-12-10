
import express from 'express'
import userRouter from './routes/userRotes.js'
import { connectDB } from './config/dbConnect.js'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())
await connectDB()

app.use(userRouter)

app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`)
})