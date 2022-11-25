import express from 'express'
import movieRouter from './routers/movie.router'
import 'dotenv/config';
import { connectDB } from './config/db.connection';

const app = express();

// config - db connection
connectDB();

// middleware
app.use(express.json());
app.use('/api/v1/movie', movieRouter)

app.listen(5000, () => {
    console.log("Server is running at port 5000")
})