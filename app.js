const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const app = express();
const port = 5000;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


// Import file connect.js để kết nối SQL Server
const { connectToSqlServer } = require('./connect');

//Import route
const routeBill = require('./routes/routeBill');
const routeVTKHO = require('./routes/routeVTKHO');
const routeNhanVien = require('./routes/routeNhanVien');
const routeCamBien = require('./routes/routeCamBien');
const routeDepartment = require('./routes/routeDepartment');
const routeCTNK = require('./routes/routeCTNK');
const routeNhacungcap = require('./routes/routeNhaCungCap');

// Thư mục tĩnh
app.use(express.static(path.join(__dirname, 'public')));

// Sử dụng express-ejs-layouts
app.use(expressLayouts);

// Thiết lập view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Chỉ định layout mặc định
app.set('layout', 'layouts/full-width');

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

app.get('/CB/create', (req, res) => {
  res.render('CB/create', { title: 'Thêm cảm biến mới' });
});


app.post('/CB/create', async(req, res) => {
  const { MaCB, TenCB, XuatxuCB, DongiaCB, LoaiCB, HSD, MaHD } = req.body;

  const query = `
    INSERT INTO CB (MaCB, TenCB, XuatxuCB, DongiaCB, LoaiCB, HSD, MaHD)
    VALUES (@MaCB, @TenCB, @XuatxuCB, @DongiaCB, @LoaiCB, @HSD, @MaHD)
  `;

  const request = new sql.Request();
  request.input('MaCB', sql.VarChar, MaCB);
  request.input('TenCB', sql.VarChar, TenCB);
  request.input('XuatxuCB', sql.VarChar, XuatxuCB);
  request.input('DongiaCB', sql.Decimal, DongiaCB);
  request.input('LoaiCB', sql.VarChar, LoaiCB);
  request.input('HSD', sql.DateTime, HSD);
  request.input('MaHD', sql.VarChar, MaHD);  

  request.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Lỗi khi thêm cảm biến');
    } else {
      res.send('Thêm cảm biến thành công');
    }
  });
});

app.put('/CB/update/:MaCB', async (req, res) => {
  // Lấy mã cảm biến cần sửa từ URL và dữ liệu mới từ req.body
  const { MaCB } = req.params;
  const { TenCB, XuatxuCB, DongiaCB, LoaiCB, HSD, MaHD } = req.body;

  // Tìm cảm biến trong cơ sở dữ liệu hoặc danh sách
  const sensor = sensors.find(sensor => sensor.MaCB === MaCB);

  if (sensor) {
    // Cập nhật thông tin
    sensor.TenCB = TenCB;
    sensor.XuatxuCB = XuatxuCB;
    sensor.DongiaCB = DongiaCB;
    sensor.LoaiCB = LoaiCB;
    sensor.HSD = HSD;
    sensor.MaHD = MaHD;

    res.send('Cập nhật thành công');
  } else {
    res.status(404).send('Cảm biến không tồn tại');
  }
});

app.delete('/CB/delete/:MaCB', (req, res) => {
  const { MaCB } = req.params;

  // Tìm chỉ mục của cảm biến trong danh sách
  const index = sensors.findIndex(sensor => sensor.MaCB === MaCB);

  if (index !== -1) {
    // Xóa cảm biến khỏi danh sách
    sensors.splice(index, 1);

    res.send('Xóa cảm biến thành công');
  } else {
    res.status(404).send('Cảm biến không tồn tại');
  }
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
