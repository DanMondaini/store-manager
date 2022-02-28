const express = require('express');

const productsControllers = require('../controllers/productsControllers');

const validate = require('../middlewares/productsValidation');

const router = express.Router();

router.get('/', productsControllers.getAll);

router.post('/', validate.recivedName, validate.recivedQuantity, productsControllers.add);

router.put('/:id', validate.recivedName, validate.recivedQuantity, productsControllers.update);

router.delete('/:id', productsControllers.exclude);

router.get('/:id', productsControllers.getById);

module.exports = router;