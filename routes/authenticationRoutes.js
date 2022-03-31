const { Router } = require('express');
const Authentication = require('../security/authentication');

const router = Router();
router
    .post('/login', Authentication.login);


    module.exports = router;
