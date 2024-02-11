const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('ingredients').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingle = async (req, res) => {
    const ingredientId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('ingredients').find({ _id: ingredientId });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const postNew = async (req, res) => {
    const ingredient = {
        name: req.body.name,
        type: req.body.type
    };
    const response = await mongodb.getDb().db().collection('ingredients').insertOne(ingredient);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res
            .status(500)
            .json(response.error || 'Sorry, this ingredient was not created.');
    }
};

const putUpdate = async (req, res) => {
    const recipeId = new ObjectId(req.params.id);
    const ingredient = {
        name: req.body.name,
        type: req.body.type
    };
    const response = await mongodb.getDb().db().collection('ingredient').replaceOne({ _id: ingredientId }, ingredient);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Ingredient not updated, check for error.');
    }
};

const deleteIngredient = async (req, res) => {
    const ingredientId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('ingredients').deleteOne({ _id: ingredientId }, true);
    console.log(response);
    if (response, deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || 'Ingredient was not deleted.')
    }
};

module.exports = {
    getAll, 
    getSingle, 
    postNew,
    putUpdate,
    deleteIngredient
}