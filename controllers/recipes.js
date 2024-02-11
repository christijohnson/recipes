const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('recipes').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingle = async (req, res) => {
    const recipeId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('recipes').find({ _id: recipeId });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const postNew = async (req, res) => {
    const recipe = {
        name: req.body.name,
        category: req.body.category,
        prepTime: req.body.prepTime,
        cookTime: req.body.cookTime,
        servings: req.body.servings,
        source: req.body.source,
        ingredients: req.body.ingredients,
        directions: req.body.directions
    };
    const response = await mongodb.getDb().db().collection('recipes').insertOne(recipe);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res
            .status(500)
            .json(response.error || 'Sorry, this recipe was not created.');
    }
};

const putUpdate = async (req, res) => {
    const recipeId = new ObjectId(req.params.id);
    const recipe = {
        name: req.body.name,
        category: req.body.category,
        prepTime: req.body.prepTime,
        cookTime: req.body.cookTime,
        servings: req.body.servings,
        source: req.body.source,
        ingredients: req.body.ingredients,
        directions: req.body.directions
    };
    const response = await mongodb.getDb().db().collection('recipes').replaceOne({ _id: recipeId }, recipe);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Recipe not updated, check for error.');
    }
};

const deleteRecipe = async (req, res) => {
    const recipeId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('recipes').deleteOne({ _id: recipeId }, true);
    console.log(response);
    if (response, deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || 'Recipe was not deleted.')
    }
};

module.exports = {
    getAll, 
    getSingle, 
    postNew,
    putUpdate,
    deleteRecipe
}