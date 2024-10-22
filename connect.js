var sql = require('mssql/msnodesqlv8');

// các thông tin kết nối
var config = {
  server: "DESKTOP-30LB2GF\\SQLEXPRESS01", 
  database: "LH21A2S_BC40_CSDL_3", 
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true,
    trustServerCertificate: true, 
  }
};

const connectToSqlServer = async () => {
  try {
    const pool = await sql.connect(config);
    console.log("Kết nối thành công với SQL Server");
    return pool;
  } catch (err) {
    console.error("Lỗi kết nối tới SQL Server: ", err);
    throw err; 
  }
};

module.exports = {
  connectToSqlServer, 
  sql
};