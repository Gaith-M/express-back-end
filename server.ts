import { Request, Response } from "express"; // Request & Response interfaces
import express from 'express';

let port = process.env.PORT || 3000;

// Initialize Express
const app = express();

// Placeholder route
app.get('/', (req: Request, res: Response) => {
    res
        .status(200)
        .send('Basic Structure Set')
});



app.listen(
    port, 
    () => console.log(`Server running on http://localhost:${port}`));