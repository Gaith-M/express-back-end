"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = require("fs");
const router = (0, express_1.Router)();
const getUser = (req, res, next) => {
    let id = req.params.id;
    id = typeof Number(id) === 'number' ? Number(id) : 0;
    if (id) {
        (0, fs_1.readFile)(`${process.cwd()}/mock-db/users.json`, (err, data) => {
            if (err) {
                console.log('error: \n', err);
                return res.status(500).send('something went wrong');
            }
            let parsed = JSON.parse(data.toString());
            let user = parsed.users.filter((u) => u.id === id);
            if (user.length <= 0) {
                return res.status(404).send(`User with the id ${id} doesn't exist`);
            }
            req.user = user[0];
            next();
        });
    }
    else {
        return res.status(400).send('Invalid ID ... only numbers are allowed');
    }
};
router.post('/', (req, res) => {
    console.log(req.body);
    res.status(201).send('created');
});
router.route('/:id')
    .get(getUser, (req, res) => res.status(200).send(req.user))
    .put((req, res) => {
    res.status(200).send('put');
})
    .delete((req, res) => {
    res.status(200).send('delete');
});
exports.default = router;
