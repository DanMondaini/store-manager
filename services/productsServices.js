const productsModel = require('../models/productsModel');

const getAll = async () => {
  const result = await productsModel.getAll();

  return result;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);

  return product;
};

const add = async (name, quantity) => {
  const product = await productsModel.add(name, quantity);

  return product;
};

const update = async (id, name, quantity) => {
  const product = await productsModel.update(id, name, quantity);

  return product;
};

module.exports = {
  getAll,
  getById,
  add,
  update,
};