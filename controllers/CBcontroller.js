const CBModel = require('../models/CBmodel');

exports.getAllCB = async (req, res) => {
  try {
    const cbList = await CBModel.getAllCB();
    res.render('CB/index', { title: "Danh sách Cảm Biến", CB: cbList });
  } catch (error) {
    res.status(500).send("Lỗi khi lấy danh sách cảm biến");
  }
};

exports.getCreateCB = (req, res) => {
  res.render('CB/create', { title: "Tạo mới Cảm Biến" });
};

exports.postCreateCB = async (req, res) => {
  try {
    await CBModel.createCB(req.body);
    res.redirect('/CB');
  } catch (error) {
    res.status(500).send("Lỗi khi tạo cảm biến mới");
  }
};

exports.getUpdateCB = async (req, res) => {
  try {
    const cb = await CBModel.getCBById(req.params.id);
    res.render('CB/update', { title: "Cập nhật Cảm Biến", CB: cb });
  } catch (error) {
    res.status(500).send("Lỗi khi lấy thông tin cảm biến");
  }
};

exports.postUpdateCB = async (req, res) => {
  try {
    await CBModel.updateCB(req.params.id, req.body);
    res.redirect('/CB');
  } catch (error) {
    res.status(500).send("Lỗi khi cập nhật cảm biến");
  }
};

exports.deleteCB = async (req, res) => {
  try { await CBModel.deleteCB(req.params.id);
    res.redirect('/CB');
  } catch (error) {
    res.status(500).send("Lỗi khi xóa cảm biến");
  }
};