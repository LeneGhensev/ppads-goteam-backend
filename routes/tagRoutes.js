const { Router } = require('express');
const TagController = require('../controllers/TagController');
const Authentication = require("../security/authentication");


const router = Router();

router
    .get('/tags', TagController.findAllTag)
    .post("/tag", Authentication.verifyJWT, Authentication.verifyAdmin, TagController.createTag)
    .delete('/tag/:nome', Authentication.verifyJWT, Authentication.verifyAdmin, TagController.destroyTag);

module.exports = router;
