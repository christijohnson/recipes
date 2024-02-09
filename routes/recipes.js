const express = require('express');
const router = express.Router();

const recipesController = require('../controllers/recipes');

router.get('/', recipesController.getAll);

router.get('/:id', recipesController.getSingle);

router.post('/', recipesController.postNew);

router.put('/:id', recipesController.putUpdate);

router.delete('/:id', recipesController.deleteRecipe);

module.exports = router;