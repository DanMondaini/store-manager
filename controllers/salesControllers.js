const salesServices = require('../services/salesServices');

const getAll = async (_req, res, next) => {
  try {
    const sales = await salesServices.getAll();

    return res.status(200).json(sales);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: 'Invalid id.' });

    const sale = await salesServices.getById(id);

    if (sale.length === 0) return res.statu(404).json({ message: 'Sale not found' });

    return res.status(200).json(sale);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getById,
};