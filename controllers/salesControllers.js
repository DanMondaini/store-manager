const ProductsServices = require('../services/productsServices');

const getAll = async (_req, res) => {
  const result = await ProductsServices.getAll();

  return res.status(200).json(result);
};

module.exports = {
  getAll,
};