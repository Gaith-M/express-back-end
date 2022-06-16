"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    fs_1.default.readFile(`${process.cwd()}/mock-db/users.json`, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Something went wrong');
        }
        let parsed = data.toString();
        res.status(200).send(parsed);
    });
});
exports.default = router;
