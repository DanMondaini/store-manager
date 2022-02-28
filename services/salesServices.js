const salesModels = require('../models/salesModel');

const getAll = async () => {
  const sales = await salesModels.getAll();

  return sales;
};

const getById = async (id) => {
  const sale = await salesModels.getById(id);

  return sale;
};

const add = async (recivedSales) => {
  const sales = await salesModels.add(recivedSales);

  return sales;
};

const update = async (id, recivedSales) => {
  const sales = await salesModels.update(id, recivedSales);

  return sales;
};

module.exports = {
  getAll,
  getById,
  add,
  update,
};