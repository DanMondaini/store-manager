const productsServices = require('../services/productsServices');

const getAll = async (req, res, next) => {
  try {
    const products = await productsServices.getAll();
    return res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: 'Inválid id.' });

    const product = await productsServices.getById(id);

    if (product.length === 0) return res.status(404).json({ message: 'Product not found' });

    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getById,
};