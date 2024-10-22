const express = require('express');
const router = express.Router();
const CBController = require('../controllers/CBcontroller');

router.get('/CB', CBController.getAllCB);
router.get('/CB/create', CBController.getCreateCB);
router.post('/CB/create', CBController.postCreateCB);
router.get('/CB/update/:id', CBController.getUpdateCB);
router.post('/CB/update/:id', CBController.postUpdateCB);
router.post('/CB/delete/:id', CBController.deleteCB);

module.exports = router;