"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/', (req, res) => {
    console.log(req.body);
    res.status(201).send('created');
});
router.route('/:id')
    .get((req, res) => {
    res.status(200).send('get');
})
    .put((req, res) => {
    res.status(200).send('put');
})
    .delete((req, res) => {
    res.status(200).send('delete');
});
exports.default = router;
