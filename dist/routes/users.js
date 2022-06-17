"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    let { query } = req;
    fs_1.default.readFile(`${process.cwd()}/mock-db/users.json`, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Something went wrong');
        }
        let parsed = JSON.parse(data.toString());
        if (query.page && typeof Number(query.page) === 'number') {
            let currentPage = Number(query.page);
            let previousPage = currentPage > 1 ? currentPage - 1 : 0;
            let perPage = typeof Number(query.rows) === 'number' && Number(query.rows) > 0 ? Number(query.rows) : 10;
            let paginated = parsed.users.slice(previousPage * perPage, currentPage * perPage);
            return res.status(200).send(paginated);
        }
        res.status(200).send(parsed.users);
    });
});
exports.default = router;
