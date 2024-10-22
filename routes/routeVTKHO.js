const express = require('express');
const router = express.Router();
const { connectToSqlServer, sql } = require('../connect');
const CBController = require('../controllers/CBcontroller');

router.get('/', async (req, res) => {
  try {
    // Kết nối đến SQL Server và lấy pool kết nối
    const pool = await connectToSqlServer();
    
    // Câu lệnh SQL để lấy dữ liệu từ bảng 'CB'
    const sqlString = 'SELECT * FROM VTKHO';

    // Thực hiện truy vấn
    const result = await pool.request().query(sqlString);

    // Kiểm tra dữ liệu
    if (result.recordset.length === 0) {
      return res.render('VTKHO/index', {
        title: "Vị trí kho",
        VTKHO: [],
        message: "Không có dữ liệu."
      });
    }

    // Trả về trang view với dữ liệu
    res.render('VTKHO/index', {
      title: "Vị trí kho",
      VTKHO: result.recordset,
    });
  } catch (err) {
    // Xử lý lỗi nếu xảy ra
    console.error("Lỗi truy vấn: ", err);
    res.status(500).send("Đã xảy ra lỗi khi lấy danh sách.");
  }
});

// Route: GET /CB/create --> hiển thị form tạo mới cảm biến
router.get('/CB/create', CBController.GetCreateCB);

// Route: GET /CB/update/:id --> hiển thị form cập nhật cảm biến
router.get('/update/:id', CBController.GetUpdateCB);

// Route: POST /CB/update/:id --> xử lý cập nhật cảm biến
router.post('/update/:id', CBController.PostUpdateCB);

// Route: POST /CB/delete/:id --> xử lý xóa cảm biến
router.post('/delete/:id', CBController.DeleteCB);

module.exports = router;
