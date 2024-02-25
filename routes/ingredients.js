const express = require('express');
const router = express.Router();

const ingredientsController = require('../controllers/ingredients');

const { requiresAuth } = require('express-openid-connect');

router.get('/', ingredientsController.getAll);

router.get('/:id', ingredientsController.getSingle);

router.post('/', requiresAuth(), ingredientsController.postNew);

router.put('/:id', requiresAuth(), ingredientsController.putUpdate);

router.delete('/:id', requiresAuth(), ingredientsController.deleteIngredient);

module.exports = router;