const express = require('express');
const router = express.Router();

const recipesController = require('../controllers/recipes');

const { auth, requiresAuth } = require('express-openid-connect');

// const config = {
//     authRequired: false,
//     auth0Logout: true,
//     secret: process.env.SECRET,
//     baseURL: process.env.BASE_URL,
//     clientID: process.env.CLIENT_ID,
//     issuerBaseURL: process.env.ISSUER_BASE_URL,
// };

router.get('/', recipesController.getAll);

router.get('/:id', recipesController.getSingle);

router.post('/', requiresAuth(), recipesController.postNew);

router.put('/:id', recipesController.putUpdate);

router.delete('/:id', recipesController.deleteRecipe);

module.exports = router;