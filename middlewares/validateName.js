const validateName = (req, _res, next) => {
    const { name } = req.body;
  
    if (!name) next({ status: 400, message: '"name" is required' });
  
    if (name.length <= 5) {
      next({ status: 400, message: '"name" length must be at least 5 characters long' });
    }
  
    next();
  };
  
  module.exports = validateName;