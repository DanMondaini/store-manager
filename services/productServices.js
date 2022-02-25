const ProductsModel = require('../models/productModel');

const getAll = async () => {
  try {
    const result = await ProductsModel.getAll();

    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const findById = async (id) => {
  if (!id || typeof id !== 'number') {
    return false;
  }
  try {
    const result = await ProductsModel.findById(id);

    if (result.length === 0) {
      return false;
    }

    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const create = async ({ name, quantity }) => {
  try {
    const insertId = await ProductsModel.create({ name, quantity });

    const result = await ProductsModel.findById(insertId);

    return result;
  } catch (error) {
    console.log(error);
  }
};

const update = async ({ id, name, quantity }) => {
  try {
    await ProductsModel.update({ id, name, quantity });
    const result = ProductsModel.findById(id);

    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const exclude = async (id) => {
  try {
    await ProductsModel.exclude(id);
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  exclude,
};