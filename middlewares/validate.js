const recivedName = (req, _res, next) => {
    const { name } = req.body;
    if (!name) next({ status: 400, message: '"name" is required' });
  
    if (name.length <= 5) {
      next({ status: 422, message: '"name" length must be at least 5 characters long' });
    }
  
    next();
  };
  
  const recivedId = (req, _res, next) => {
    const { productId } = req.body;
  
    if (!productId) next({ status: 400, message: '"productId" is required' });
  
    next();
  };
  
  const recivedQuantity = (req, _res, next) => {
    const { quantity } = req.body;
  
    console.log(quantity);
  
    if (!quantity && quantity !== 0) next({ status: 400, message: '"quantity" is required' });
  
    if (quantity <= 0) {
      next({ status: 422, message: '"quantity" must be greater than or equal to 1' });
    }
  
    next();
  };
  
  module.exports = {
    recivedName,
    recivedId,
    recivedQuantity,
  };