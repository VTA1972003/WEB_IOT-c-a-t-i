const mongoose = require('mongoose');

const CBSchema = new mongoose.Schema({
  // Định nghĩa cấu trúc của Cảm Biến
  name: String,
  description: String
});

const CBModel = mongoose.model('CB', CBSchema);

exports.getAllCB = async () => {
  return await CBModel.find();
};

exports.getCBById = async (id) => {
  return await CBModel.findById(id);
};

exports.createCB = async (data) => {
  return await CBModel.create(data);
};

exports.updateCB = async (id, data) => {
  return await CBModel.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteCB = async (id) => {
  return await CBModel.findByIdAndRemove(id);
};