const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const app = express();
const port = 5000;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
// Import file connect.js để kết nối SQL Server
const { connectToSqlServer } = require('./connect');
// Thư mục tĩnh
app.use(express.static(path.join(__dirname, 'public')));
// Sử dụng express-ejs-layouts
app.use(expressLayouts);
// Thiết lập view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Chỉ định layout mặc định
app.set('layout', 'layouts/full-width');
//Import route
const routeBill = require('./routes/routeBill');
const routeVTKHO = require('./routes/routeVTKHO');
const routeNhanVien = require('./routes/routeNhanVien');
const routeCamBien = require('./routes/routeCamBien');
const routeDepartment = require('./routes/routeDepartment');
const routeCTNK = require('./routes/routeCTNK');
const routeNhacungcap = require('./routes/routeNhaCungCap');
// Sử dụng các route
app.use('/Hoadon', routeBill);
app.use('/VTKHO', routeVTKHO);
app.use('/Nhanvien', routeNhanVien);
app.use('/Nhacungcap', routeNhacungcap);
app.use('/CB', routeCamBien);
app.use('/CTNK', routeCTNK);
app.use('/department', routeDepartment);

app.get('/', async (req, res) => {
  res.render('index', {
    title: 'Trang chủ'
  });
});

// Kết nối SQL Server trước khi khởi động server
connectToSqlServer()
  .then(() => {
    app.listen(port, () => {
      console.info(`App listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Lỗi kết nối SQL Server, không thể khởi động ứng dụng: ", err);
});
