const { Router } = require('express');
const TesteController = require('../controllers/TesteController');
const Authentication = require("../security/authentication")

const router = Router();

router
    .post("/teste", TesteController.create)
    
module.exports = router;
