const { Router } = require('express');
const FileController = require('../controllers/FileController')
const Authentication = require("../security/authentication");

const router = Router();

router
    .post("/file", Authentication.verifyJWT, Authentication.verifyAdmin, FileController.createFile)

module.exports = router;
