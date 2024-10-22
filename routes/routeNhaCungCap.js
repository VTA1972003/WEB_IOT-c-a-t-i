const express = require('express');
const router = express.Router();
const Nhacungcapcontroller = require('../controllers/Nhacungcapcontroller');

router.get('/NCC', Nhacungcapcontroller.getAllNCC);
router.get('/NCC/create', Nhacungcapcontroller.getCreateNCC);
router.post('/NCC/create', Nhacungcapcontroller.postCreateNCC);
router.get('/NCC/update/:id', Nhacungcapcontroller.getUpdateNCC);
router.post('/NCC/update/:id', Nhacungcapcontroller.postUpdateNCC);
router.post('/NCC/delete/:id', Nhacungcapcontroller.deleteNCC);

module.exports = router;