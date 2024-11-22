import express from 'express';
import { postRecipe } from './controller/recipeConstructor';

const router = express.Router();

// Create a new recipe
router.post('/recipes', postRecipe)


// Get all recipes with pagination
router.get('/recipes', async(req, res) => {
    try {
        const { page = 1, pageSize = 10 } = req.query;
        const recipes = await Recipe.find()
            .skip((page - 1) * pageSize)
            .limit(parseInt(pageSize));
        const total = await Recipe.countDocuments();
        res.json({ total, page: parseInt(page), pageSize: parseInt(pageSize), recipes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a recipe by ID
router.get('/recipes/:id', async(req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a recipe by ID
router.put('/recipes/:id', async(req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRecipe) return res.status(404).json({ error: 'Recipe not found' });
        res.json(updatedRecipe);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a recipe by ID
router.delete('/recipes/:id', async(req, res) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!deletedRecipe) return res.status(404).json({ error: 'Recipe not found' });
        res.json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;