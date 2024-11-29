import Recipe from '../models/recipe.js';

// GET all recipes with pagination
export const getRecipes = async(req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        const recipes = await Recipe.find().skip(skip).limit(Number(limit));
        const totalRecipes = await Recipe.countDocuments();

        res.status(200).json({
            recipes,
            pagination: {
                totalItems: totalRecipes,
                currentPage: Number(page),
                totalPages: Math.ceil(totalRecipes / limit),
            },
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET a single recipe by ID
export const getRecipeById = async(req, res) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findById(id);

        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found.' });
        }

        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST a new recipe
export const postRecipe = async(req, res) => {
    try {
        const { title, description, ingredients, instructions } = req.body;

        if (!title || !description || !ingredients || !instructions) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const recipe = new Recipe({
            title,
            description,
            ingredients,
            instructions,
        });

        const savedRecipe = await recipe.save();
        res.status(201).json(savedRecipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// PUT (update) a recipe by ID
export const updateRecipe = async(req, res) => {
    try {
        const { id } = req.params;
        const { title, description, ingredients, instructions } = req.body;

        const updatedRecipe = await Recipe.findByIdAndUpdate(
            id, { title, description, ingredients, instructions }, { new: true, runValidators: true }
        );

        if (!updatedRecipe) {
            return res.status(404).json({ error: 'Recipe not found.' });
        }

        res.status(200).json(updatedRecipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE a recipe by ID
export const deleteRecipe = async(req, res) => {
    try {
        const { id } = req.params;

        const deletedRecipe = await Recipe.findByIdAndDelete(id);

        if (!deletedRecipe) {
            return res.status(404).json({ error: 'Recipe not found.' });
        }

        res.status(200).json({ message: 'Recipe deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};