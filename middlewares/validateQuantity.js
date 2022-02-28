const validateQuantity = (req, _res, next) => {
    const { quantity } = req.body;
  
    if (!quantity) next({ status: 400, message: '"quantity" is required' });
  
    if (quantity <= 0 || !Number.isInteger(quantity)) {
      next({ status: 422, message: '"quantity" must be greater than or equal to 1' });
    }
  
    next();
  };
  
  module.exports = validateQuantity;

  // validete feito com consulta ao repo do Erickson Siqueira: https://github.com/tryber/sd-015-b-store-manager/pull/10/commits/f8eebca0aec30da6e9f975feb04a3c443e0f3f8f
