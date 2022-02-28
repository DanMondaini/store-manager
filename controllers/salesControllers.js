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

    const sales = await salesServices.getById(id);

    if (sales.length === 0) return res.status(404).json({ message: 'Sale not found' });

    return res.status(200).json(sales);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  try {
    const recivedSales = req.body;
    const sales = await salesServices.add(recivedSales);

    return res.status(201).json(sales);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const recivedSales = req.body;
    const { id } = req.params;

    const sales = await salesServices.update(id, recivedSales);

    return res.status(200).json(sales);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getById,
  add,
  update,
};