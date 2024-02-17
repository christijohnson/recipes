const mongodb = require('../db/connect');
// const ObjectId = require('mongodb').ObjectId;
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    try {
        const ingredientsCursor = await mongodb.getDb().db().collection('ingredients').find();

        // Convert cursor to array using toArray() method
        const ingredientsArray = await ingredientsCursor.toArray();

        // Send response with the array of ingredients
        res.status(200).json(ingredientsArray);
    } catch (error) {
        // Handle error
        console.error("Error while retrieving ingredients:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getSingle = async (req, res) => {
    try {
        const ingredientId = req.params.id;

        // Validate ingredientId
        if (!ObjectId.isValid(ingredientId)) {
            return res.status(400).json({ error: 'Invalid ingredient ID' });
        }

        // Convert ingredientId to ObjectId
        const objectId = new ObjectId(ingredientId);

        // Find ingredient by _id
        const ingredient = await mongodb.getDb().db().collection('ingredients').findOne({ _id: objectId });

        if (ingredient) {
            res.status(200).json(ingredient);
        } else {
            res.status(404).json({ error: 'Ingredient not found' });
        }
    } catch (error) {
        console.error("Error while retrieving ingredient:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const postNew = async (req, res) => {
    try {
        // Check if name and type are provided in the request body
        if (!req.body.name || !req.body.type) {
            return res.status(400).json({ error: 'Name and type are required fields' });
        }

        // Check if name and type are strings
        if (typeof req.body.name !== 'string' || typeof req.body.type !== 'string') {
            return res.status(400).json({ error: 'Name and type must be strings' });
        }

        // Add additional validation here
        
        // If all validations pass, proceed to create the ingredient

        const ingredient = {
            name: req.body.name,
            type: req.body.type
        };
        const response = await mongodb.getDb().db().collection('ingredients').insertOne(ingredient);
        
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json({ error: 'Sorry, this ingredient was not created.' });
        }
    } catch (error) {
        console.error("Error while creating ingredient:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const putUpdate = async (req, res) => {
    try {
        const ingredientId = req.params.id;
        const { name, type } = req.body;

        // Validate ingredientId
        if (!ObjectId.isValid(ingredientId)) {
            return res.status(400).json({ error: 'Invalid ingredient ID' });
        }

        // Validate name and type
        if (!name || typeof name !== 'string' || !type || typeof type !== 'string') {
            return res.status(400).json({ error: 'Invalid name or type' });
        }

        const objectId = new ObjectId(ingredientId);
        const ingredientUpdates = {
            $set: {
                name: name,
                type: type
            }
        };

        const response = await mongodb.getDb().db().collection('ingredients').updateOne({ _id: objectId }, ingredientUpdates);

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Ingredient not updated, check for error.');
        }
    } catch (error) {
        console.error("Error while updating ingredient:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteIngredient = async (req, res) => {
    try {
        const ingredientId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().db().collection('ingredients').deleteOne({ _id: ingredientId });
        console.log(response);
        if (response.deletedCount > 0) {
            res.status(200).send();
        } else {
            res.status(500).json(response.error || 'Ingredient was not deleted.');
        }
    } catch (error) {
        console.error("Error while deleting ingredient:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    getAll, 
    getSingle, 
    postNew,
    putUpdate,
    deleteIngredient
}