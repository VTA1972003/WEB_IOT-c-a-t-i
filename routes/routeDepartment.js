const express = require('express');
var routes = express.Router();
var { conn, sql } = require('../connect');

// URL: localhost:3000/department
// Lấy danh sách các phòng ban trong database

routes.get('/', async (req, res) => {
  try {
    // Lấy pool kết nối
    var pool = await conn;
    // Câu lệnh SQL để lấy dữ liệu từ bảng 'department'
    var sqlString = 'SELECT * FROM CB';
    // Thực hiện truy vấn
    var result = await pool.request().query(sqlString);
    // Trả về trang view với dữ liệu
    res.render('departments/index', {
      title: "Sensor list",
      departments: result.recordset,
    });
  } catch (err) {
    // Xử lý lỗi nếu xảy ra
    console.error("Lỗi truy vấn: ", err);
    res.status(500).send("Đã xảy ra lỗi khi lấy danh sách phòng ban.");
  }
});
//url: localhost:3000/department/5
routes.get('/:MaCB',async (req, res) => {
  try {
    // Lấy pool kết nối
    var pool = await conn;
    var id=req.params.id;
    // Câu lệnh SQL để lấy dữ liệu từ bảng 'department'
    var sqlString = 'SELECT * FROM CB where MaCB =@varMaCB';
    // Thực hiện truy vấn
    var result = await pool.request().input('varMaCB',sql.NVarChar,MaCB).query(sqlString);
    // Trả về trang view với dữ liệu
    res.render('departments/Detail', {
      title: "CB list",
      department: result.recordset[0],
    });
  } catch (err) {
    // Xử lý lỗi nếu xảy ra
    console.error("Lỗi truy vấn: ", err);
    res.status(500).send("Đã xảy ra lỗi khi lấy danh sách phòng ban.");
  }
});
module.exports = routes;