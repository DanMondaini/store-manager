const express = require('express');

const productsControllers = require('../controllers/productsControllers');

const validate = require('../middlewares/validate');

const router = express.Router();

router.get('/', productsControllers.getAll);

router.post('/', validate.recivedName, validate.recivedQuantity, productsControllers.add);

router.put('/:id', validate.recivedName, validate.recivedQuantity, productsControllers.update);

module.exports = router;