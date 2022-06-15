"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
const posts_1 = __importDefault(require("./routes/posts"));
const port = process.env.PORT || 3333;
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res
        .status(200)
        .send('Basic Structure Set');
});
app.use('/users', users_1.default);
app.use('/posts', posts_1.default);
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
