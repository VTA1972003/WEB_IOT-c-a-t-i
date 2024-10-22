const express = require('express');
const router = express.Router();
const { connectToSqlServer, sql } = require('../connect');
const CBController = require('../controllers/CBcontrollerss');

// Route: GET /CB --> hiển thị danh sách cảm biến
router.get('/', async (req, res) => {
  try {
    const pool = await connectToSqlServer();
    const sqlString = 'SELECT * FROM CB';

    const result = await pool.request().query(sqlString);

    // Khởi tạo biến message
    let message = "";

    if (result.recordset.length === 0) {
      message = "Không có dữ liệu cảm biến.";
    }

    res.render('CB/index', {
      title: "Sensor List",
      CB: result.recordset,
      message: message // Truyền message vào view
    });
  } catch (err) {
    console.error("Lỗi truy vấn: ", err);
    res.status(500).send("Đã xảy ra lỗi khi lấy danh sách cảm biến.");
  }
});

// Route: GET /CB/create --> hiển thị form tạo mới cảm biến
router.get('/create', CBController.GetCreateCB);

// Route: POST /CB/create --> xử lý tạo mới cảm biến
router.post('/create', CBController.PostCreateCB);

// Route: GET /CB/update/:id --> hiển thị form cập nhật cảm biến
router.get('/update/:id', CBController.GetUpdateCB);

// Route: POST /CB/update/:id --> xử lý cập nhật cảm biến
router.post('/update/:id', CBController.PostUpdateCB);

// Route: POST /CB/delete/:id --> xử lý xóa cảm biến
router.post('/delete/:id', CBController.DeleteCB);

module.exports = router;
