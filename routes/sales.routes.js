const express = require('express');

const salesControllers = require('../controllers/salesControllers');
const validate = require('../middlewares/salesValidation');

const router = express.Router();

router.get('/', salesControllers.getAll);

router.get('/:id', salesControllers.getById);

router.post('/', validate.recievedProductsIds, validate.recievedQuantities, salesControllers.add);

router.put(
  '/:id',
  validate.recievedProductsIds,
  validate.recievedQuantities,
  salesControllers.update,
);

module.exports = router;