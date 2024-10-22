const mongoose = require('mongoose');

const NCCSchema = new mongoose.Schema({
  // Định nghĩa cấu trúc của Nhà cung cấp
  name: String,
  description: String
});

const NCCModel = mongoose.model('NCC', NCCSchema);

exports.getAllNCC = async () => {
  return await NCCModel.find();
};

exports.getNCCById = async (id) => {
  return await NCCModel.findById(id);
};

exports.createNCC = async (data) => {
  return await NCCModel.create(data);
};

exports.updateNCC = async (id, data) => {
  return await NCCModel.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteNCC = async (id) => {
  return await NCCModel.findByIdAndRemove(id);
};