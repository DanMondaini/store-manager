const productsModel = require('../models/productsModel');

const getAll = async () => {
  const result = await productsModel.getAll();

  return result;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);

  return product;
};

module.exports = {
  getAll,
  getById,
};