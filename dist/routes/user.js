"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const router = (0, express_1.Router)();
router.post('/', (req, res) => {
    console.log(req.body);
    res.status(201).send('created');
});
router.route('/:id')
    .get((req, res) => {
    fs_1.default.readFile(`${process.cwd()}/mock-db/users.json`, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Something went wrong');
        }
        let parsedData = JSON.parse(data.toString());
        let user = parsedData.users.filter(user => user.id === Number(req.params.id));
        if (user.length > 0)
            return res.status(200).send(user[0]);
        res.status(404).send(`User with id of ${req.params.id} wasn't found`);
    });
})
    .put((req, res) => {
    res.status(200).send('put');
})
    .delete((req, res) => {
    res.status(200).send('delete');
});
exports.default = router;
