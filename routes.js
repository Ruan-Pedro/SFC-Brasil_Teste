
const express = require('express');
const router = require('express').Router();
const Auth = require('./auth');
const teste1 = require("./teste1");
const teste2 = require("./teste2");
const teste3 = require("./teste3");
const teste4 = require("./teste4");
const teste5 = require("./teste5");

router.get('/', function (req, res) {
    res.send(`get user/ </br>
    get users/ </br>
    post users/ </br>
    delete users/ </br>
    put users/ </br>
    `);
});

router.get("/user", Auth.optional,express.json(), teste1.getUser);
router.get("/users", Auth.optional, express.json(), teste1.getUsers);
router.post("/users", Auth.required, express.json(), teste2)
router.delete("/users", Auth.required, express.json(), teste3)
router.put("/users", Auth.required, express.json(), teste4)
router.get("/users/access", Auth.optional, express.json(), teste5);

module.exports = router