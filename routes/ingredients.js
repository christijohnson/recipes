const express = require('express');
const router = express.Router();

const ingredientsController = require('../controllers/ingredients');

router.get('/', ingredientsController.getAll);

router.get('/:id', ingredientsController.getSingle);

router.post('/', ingredientsController.postNew);

router.put('/:id', ingredientsController.putUpdate);

router.delete('/:id', ingredientsController.deleteIngredient);

module.exports = router;