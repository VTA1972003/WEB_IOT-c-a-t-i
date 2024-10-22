const NCCModel = require('../models/Nhacungcapmodel');

exports.getAllNCC = async (req, res) => {
  try {
    const NCCList = await NCCModel.getAllNCC();
    res.render('NCC/index', { title: "Danh sách Nhà cung cấp", NCC: nccList });
  } catch (error) {
    res.status(500).send("Lỗi khi lấy danh sách nhà cung cấp");
  }
};

exports.getCreateNCC = (req, res) => {
  res.render('Nhacungcap/create', { title: "Tạo mới nhà cung cấp" });
};

exports.postCreateNCC = async (req, res) => {
  try {
    await NCCModel.createNCC(req.body);
    res.redirect('/NCC');
  } catch (error) {
    res.status(500).send("Lỗi khi tạo nhà cung cấp mới");
  }
};

exports.getUpdateNCC = async (req, res) => {
  try {
    const NCC = await NCCModel.getNCCById(req.params.id);
    res.render('Nhacungcap/update', { title: "Cập nhật nhà cung cấp", NCC: NCC });
  } catch (error) {
    res.status(500).send("Lỗi khi lấy thông tin nhà cung cấp");
  }
};

exports.postUpdateNCC = async (req, res) => {
  try {
    await NCCModel.updateNCC(req.params.id, req.body);
    res.redirect('/NCC');
  } catch (error) {
    res.status(500).send("Lỗi khi cập nhật nhà cung cấp");
  }
};

exports.deleteNCC = async (req, res) => {
  try { await NCCModel.deleteNCC(req.params.id);
    res.redirect('/NCC');
  } catch (error) {
    res.status(500).send("Lỗi khi xóa nhà cung cấp");
  }
};