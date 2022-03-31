const { Router } = require('express');
const FileController = require('../controllers/FileController')

const router = Router();

router
    .post("/file", FileController.createFile)

module.exports = router;
