"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
let port = process.env.PORT || 3000;
// Initialize Express
const app = (0, express_1.default)();
// Placeholder route
app.get('/', (req, res) => {
    res
        .status(200)
        .send('Basic Structure Set');
});
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
