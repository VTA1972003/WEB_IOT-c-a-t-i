// models/CBModels.js

const { conn, sql } = require("../connect");

async function GetCBList() {
    try {
        const pool = await conn;
        const sqlString = "EXEC dbo.PSP_CB_SelectAll"; // Đảm bảo bao gồm schema nếu cần
        const cbList = await pool
            .request()
            .query(sqlString);
        return cbList.recordset;
    } catch (error) {
        throw error;
    }
}

async function GetCBByID(id) {
    try {
        const pool = await conn;
        const sqlString = "EXEC dbo.PSP_CB_SelectByID @MaCB"; // Bao gồm schema
        const cb = await pool
            .request()
            .input("MaCB", sql.NVarChar(50), id) // Thay đổi từ Int sang NVarChar
            .query(sqlString);
        return cb.recordset[0];
    } catch (error) {
        throw error;
    }
}

async function CreateOrUpdateCB(data) {
    try {
        const pool = await conn;
        const sqlString = "EXEC dbo.PSP_CB_InsertAndUpdate @MaCB, @TenCB, @XuatxuCB, @DongiaCB, @LoaiCB, @HSD, @MaHD"; // Bao gồm schema
        const result = await pool
            .request()
            .input("MaCB", sql.NVarChar(50), data.MaCB) // Thay đổi từ Int sang NVarChar
            .input("TenCB", sql.NVarChar(255), data.TenCB)
            .input("XuatxuCB", sql.NVarChar(255), data.XuatxuCB)
            .input("DongiaCB", sql.Float, data.DongiaCB)
            .input("LoaiCB", sql.NVarChar(255), data.LoaiCB)
            .input("HSD", sql.Date, data.HSD)
            .input("MaHD", sql.NVarChar(50), data.MaHD) // Nếu MaHD cũng là chuỗi, thay đổi kiểu dữ liệu
            .query(sqlString);
        return result;
    } catch (error) {
        throw error;
    }
}

async function DeleteCB(id) {
    try {
        const pool = await conn;
        const sqlString = "EXEC dbo.PSP_CB_Delete @MaCB"; // Bao gồm schema
        const result = await pool
            .request()
            .input("MaCB", sql.NVarChar(50), id) // Thay đổi từ Int sang NVarChar
            .query(sqlString);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    GetCBList,
    GetCBByID,
    CreateOrUpdateCB,
    DeleteCB
};
