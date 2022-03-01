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

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const product = await productsServices.add(name, quantity);

    if (!product) return res.status(409).json({ message: 'Product already exists' });

    return res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;

    const product = await productsServices.update(id, name, quantity);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};
const exclude = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsServices.exclude(id);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    return res.status(204).json();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  exclude,
};