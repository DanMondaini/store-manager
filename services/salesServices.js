const salesModels = require('../models/salesModel');

const getAll = async () => {
  const sales = await salesModels.getAll();

  return sales;
};

const getById = async (id) => {
  const sale = await salesModels.getById(id);

  return sale;
};

module.exports = {
  getAll,
  getById,
};