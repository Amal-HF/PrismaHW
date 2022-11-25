import express from 'express'
import movieRouter from './routers/movie.router'
import 'dotenv/config';
import { connectDB } from './config/db.connection';
import userRouter  from './routers/user.router'

const app = express();

// config - db connection
connectDB();

// middleware
app.use(express.json());
app.use('/api/v1/movie', movieRouter)
app.use('/api/v1/user', userRouter)

app.listen(5000, () => {
    console.log("Server is running at port 5000")
})