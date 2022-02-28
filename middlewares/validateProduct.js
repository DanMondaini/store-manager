const validateProductId = (req, _res, next) => {
    const { productId } = req.body;
  
    if (!productId) next({ status: 400, message: '"productId" is required' });
  
    next();
  };
  
  module.exports = validateProductId;