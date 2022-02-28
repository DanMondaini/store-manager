const recievedProductsIds = (req, _res, next) => {
    const sales = req.body;
  
    sales.forEach((sale) => {
      const { productId } = sale;
      if (!productId) next({ status: 400, message: '"productId" is required' });
    });
  
    next();
  };
  
  const recievedQuantitys = (req, _res, next) => {
    const sales = req.body;
  
    sales.forEach((sale) => {
      const { quantity } = sale;
      if (!quantity) next({ status: 400, message: '"quantity" is required' });
      if (quantity <= 0) {
        next({ status: 422, message: '"quantity" must be greater than or equal to 1' });
      }
    });
  
    next();
  };
  
  module.exports = {
    recievedProductsIds,
    recievedQuantitys,
  };