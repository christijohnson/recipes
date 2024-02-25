const express = require('express');
const router = express.Router();

const ingredientsController = require('../controllers/ingredients');

const { auth, requiresAuth } = require('express-openid-connect');

// const config = {
    // authRequired: false,
//     auth0Logout: true,
//     secret: process.env.SECRET,
//     baseURL: process.env.BASE_URL,
//     clientID: process.env.CLIENT_ID,
//     issuerBaseURL: process.env.ISSUER_BASE_URL,
// };

router.get('/', ingredientsController.getAll);

router.get('/:id', ingredientsController.getSingle);

router.post('/', requiresAuth(), ingredientsController.postNew);

router.put('/:id', ingredientsController.putUpdate);

router.delete('/:id', ingredientsController.deleteIngredient);

module.exports = router;