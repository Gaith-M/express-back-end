require("dotenv").config();
import express from "express";
import usersRouter from "./routes/users";
import postsRouter from "./routes/posts";
import userRouter from "./routes/user";
import { Request, Response } from "express";

const port = process.env.PORT || 3333;

// Initialize Express
const app = express();

// setup middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Placeholder route
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Basic Structure Set");
});

app.use("/users", usersRouter);
app.use("/user", userRouter);
app.use("/posts", postsRouter);

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);


