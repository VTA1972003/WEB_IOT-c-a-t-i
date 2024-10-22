const { connectToSqlServer, sql } = require('../connect');

// Hiển thị form tạo mới cảm biến
exports.GetCreateCB = (req, res) => {
  res.render('CB/create', { title: 'Thêm cảm biến mới' });
};

// Xử lý tạo mới cảm biến
exports.PostCreateCB = async (req, res) => {
  console.log(req.body);
  const {MaCB, TenCB, XuatxuCB, DongiaCB, LoaiCB, HSD, MaHD } = req.body;
  if (!MaCB || !TenCB || !XuatxuCB || !DongiaCB || !LoaiCB || !HSD || !MaHD) {
    return res.status(400).send("Thiếu thông tin cần thiết.");
  }
  try {
    const pool = await connectToSqlServer();

    const insertQuery = `
      INSERT INTO CB (MaCB, TenCB, XuatxuCB, DongiaCB, LoaiCB, HSD, MaHD)
      VALUES (@MaCB, @TenCB, @XuatxuCB, @DongiaCB, @LoaiCB, @HSD, @MaHD)
    `;

    await pool.request()
      .input('MaCB', sql.VarChar, MaCB)
      .input('TenCB', sql.NVarChar, TenCB)
      .input('XuatxuCB', sql.NVarChar, XuatxuCB)
      .input('DongiaCB', sql.Decimal, DongiaCB)
      .input('LoaiCB', sql.NVarChar, LoaiCB)
      .input('HSD', sql.Date, HSD)
      .input('MaHD', sql.VarChar, MaHD)
      .query(insertQuery);

    res.redirect('/CB');
  } catch (error) {
    console.error("Lỗi tạo mới cảm biến: ", error);
    res.status(500).send("Đã xảy ra lỗi khi tạo mới cảm biến.");
  }
};

// Hiển thị form cập nhật cảm biến
exports.GetUpdateCB = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await connectToSqlServer();

    const selectQuery = 'SELECT * FROM CB WHERE MaCB = @MaCB';
    const result = await pool.request()
      .input('MaCB', sql.VarChar, id)
      .query(selectQuery);

    if (result.recordset.length === 0) {
      return res.status(404).send("Không tìm thấy cảm biến.");
    }

    res.render('CB/update', {
      title: 'Cập Nhật Cảm Biến',
      CB: result.recordset[0]
    });
  } catch (error) {
    console.error("Lỗi lấy thông tin cảm biến: ", error);
    res.status(500).send("Đã xảy ra lỗi khi lấy thông tin cảm biến.");
  }
};

// Xử lý cập nhật cảm biến
exports.PostUpdateCB = async (req, res) => {
  const { id } = req.params;
  const { TenCB, XuatxuCB, DongiaCB, LoaiCB, HSD, MaHD } = req.body;

  try {
    const pool = await connectToSqlServer();

    const updateQuery = `
      UPDATE CB
      SET TenCB = @TenCB,
          XuatxuCB = @XuatxuCB,
          DongiaCB = @DongiaCB,
          LoaiCB = @LoaiCB,
          HSD = @HSD,
          MaHD = @MaHD
      WHERE MaCB = @MaCB
    `;

    const result = await pool.request()
      .input('TenCB', sql.NVarChar, TenCB)
      .input('XuatxuCB', sql.NVarChar, XuatxuCB)
      .input('DongiaCB', sql.Decimal, DongiaCB)
      .input('LoaiCB', sql.NVarChar, LoaiCB)
      .input('HSD', sql.Date, HSD)
      .input('MaHD', sql.VarChar, MaHD)
      .input('MaCB', sql.VarChar, id)
      .query(updateQuery);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).send("Không tìm thấy cảm biến để cập nhật.");
    }

    res.redirect('/CB');
  } catch (error) {
    console.error("Lỗi cập nhật cảm biến: ", error);
    res.status(500).send("Đã xảy ra lỗi khi cập nhật cảm biến.");
  }
};

// Xử lý xóa cảm biến
exports.DeleteCB = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await connectToSqlServer();

    const deleteQuery = 'DELETE FROM CB WHERE MaCB = @MaCB';
    const result = await pool.request()
      .input('MaCB', sql.VarChar, id)
      .query(deleteQuery);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).send("Không tìm thấy cảm biến để xóa.");
    }

    res.redirect('/CB');
  } catch (error) {
    console.error("Lỗi xóa cảm biến: ", error);
    res.status(500).send("Đã xảy ra lỗi khi xóa cảm biến.");
  }
};
