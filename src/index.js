
import express from 'express'
import userRouter from './routes/userRotes.js'
import { connectDB } from './config/dbConnect.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

await connectDB()

app.use(userRouter)

app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`)
})