const ProductsServices = require('../services/productServices');

const validateName = (name) => {
  if (!name) {
    return {
      code: 400,
      message: '"name" is required',
    };
  }

  if (name.length < 5) {
    return {
      code: 422,
      message: '"name" length must be at least 5 characters long',
    };
  }

  return true;
};

const validateQuantity = (quantity) => {
  if (quantity === undefined) {
    return {
      code: 400,
      message: '"quantity" is required',
    };
  }

  if (quantity <= 0) {
    return {
      code: 422,
      message: '"quantity" must be greater than or equal to 1',
    };
  }

  return true;
};

const validateProducts = async (req, res, next) => {
  const { name, quantity } = req.body;
  const { method } = req;
  const productsInDataBase = await ProductsServices.getAll();
  const hasThisProduct = productsInDataBase.some((product) => product.name === name);

  if (hasThisProduct && method === 'POST') {
    return res.status(409).json({ message: 'Product already exists' });
  } 

  const validName = validateName(name);
  if (validName.code) {
    return res.status(validName.code).json({ message: validName.message });
  }

  const validQuantity = validateQuantity(quantity);
  if (validQuantity.code) {
    return res.status(validQuantity.code).json({ message: validQuantity.message });
  }

  next();
};

module.exports = validateProducts;

// consultei o repositorio do Claudio Cassimiro para realização: https://github.com/tryber/sd-015-b-store-manager/pull/7/commits