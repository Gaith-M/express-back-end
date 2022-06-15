require('dotenv').config();
import express from 'express';
import userRouter from './routes/users';
import postsRouter from './routes/posts';
import { Request, Response } from "express";

const port = process.env.PORT || 3333;

// Initialize Express
const app = express();

// Placeholder route
app.get('/', (req: Request, res: Response) => {
    res
        .status(200)
        .send('Basic Structure Set')
});

app.use('/users', userRouter);
app.use('/posts', postsRouter);



app.listen(
    port, 
    () => console.log(`Server running on http://localhost:${port}`));