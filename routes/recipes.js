const express = require('express');
const router = express.Router();

const recipesController = require('../controllers/recipes');

const { requiresAuth } = require('express-openid-connect');

router.get('/', recipesController.getAll);

router.get('/:id', recipesController.getSingle);

router.post('/', requiresAuth(), recipesController.postNew);

router.put('/:id', requiresAuth(), recipesController.putUpdate);

router.delete('/:id', requiresAuth(), recipesController.deleteRecipe);

module.exports = router;