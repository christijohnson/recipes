const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    try {
        const recipesCursor = await mongodb.getDb().db().collection('recipes').find();
        
        // Convert cursor to array using toArray() method
        const recipesArray = await recipesCursor.toArray();
        
        // Send response with the array of recipes
        res.status(200).json(recipesArray);
    } catch (error) {
        // Handle error
        console.error("Error while retrieving recipes:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getSingle = async (req, res) => {
    try {
        // Validate recipeId
        const recipeId = req.params.id;
        if (!ObjectId.isValid(recipeId)) {
            return res.status(400).json({ error: 'Invalid recipe ID' });
        }

        // Convert recipeId to ObjectId
        const objectId = new ObjectId(recipeId);

        // Query the database
        const recipe = await mongodb.getDb().db().collection('recipes').findOne({ _id: objectId });

        if (recipe) {
            res.status(200).json(recipe);
        } else {
            res.status(404).json({ error: 'Recipe not found' });
        }
    } catch (error) {
        console.error("Error while retrieving recipe:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const postNew = async (req, res) => {
    try {
        // Validate required fields
        const requiredFields = ['name', 'category', 'prepTime', 'cookTime', 'servings', 'source', 'ingredients', 'directions'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ error: `${field} is required` });
            }
        }

        // Validate data types
        if (typeof req.body.prepTime !== 'string' || typeof req.body.cookTime !== 'string' || typeof req.body.servings !== 'number') {
            return res.status(400).json({ error: 'Invalid data type for servings' });
        }

        // Insert the recipe into the database
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
            res.status(500).json(response.error || 'Sorry, this recipe was not created.');
        }
    } catch (error) {
        console.error("Error while creating new recipe:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const putUpdate = async (req, res) => {
    try {
        // Validate recipeId
        const recipeId = req.params.id;
        if (!ObjectId.isValid(recipeId)) {
            return res.status(400).json({ error: 'Invalid recipe ID' });
        }

        // Validate input fields
        const { name, category, prepTime, cookTime, servings, source, ingredients, directions } = req.body;
        if (!name || !category || typeof prepTime !== 'string' || typeof cookTime !== 'string' || typeof servings !== 'number' || !source || !ingredients || !directions) {
            return res.status(400).json({ error: 'Missing or invalid input fields' });
        }

        // Construct recipe updates
        const recipeUpdates = {
            $set: {
                name,
                category,
                prepTime,
                cookTime,
                servings,
                source,
                ingredients,
                directions
            }
        };

        // Update the recipe in the database
        const response = await mongodb.getDb().db().collection('recipes').updateOne({ _id: new ObjectId(recipeId) }, recipeUpdates);

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Recipe not found' });
        }
    } catch (error) {
        console.error("Error while updating recipe:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteRecipe = async (req, res) => {
    try {
        // Validate recipeId
        const recipeId = req.params.id;
        if (!ObjectId.isValid(recipeId)) {
            return res.status(400).json({ error: 'Invalid recipe ID' });
        }

        // Convert recipeId to ObjectId
        const objectId = new ObjectId(recipeId);

        // Delete the recipe from the database
        const response = await mongodb.getDb().db().collection('recipes').deleteOne({ _id: objectId });

        if (response.deletedCount > 0) {
            res.status(200).send();
        } else {
            res.status(404).json({ error: 'Recipe not found' });
        }
    } catch (error) {
        console.error("Error while deleting recipe:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    getAll, 
    getSingle, 
    postNew,
    putUpdate,
    deleteRecipe
}