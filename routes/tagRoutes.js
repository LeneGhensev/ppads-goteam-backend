const { Router } = require('express');
const TagController = require('../controllers/TagController');


const router = Router();

router
    .get('/tags', TagController.findAllTag)
    .post("/tag", TagController.createTag)
    .delete('/tag/:nome', TagController.destroyTag);

module.exports = router;
