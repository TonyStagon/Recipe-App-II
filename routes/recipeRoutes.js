import express from 'express';
import { postRecipe, getRecipes, getRecipeById, updateRecipe, deleteRecipe } from '../controllers/recipeController.js';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/recipes', getRecipes);
router.get('/recipes/:id', getRecipeById);

// Protected routes
router.post('/recipes', authenticate, authorize(['user', 'admin']), postRecipe);
router.put('/recipes/:id', authenticate, authorize(['user', 'admin']), updateRecipe);
router.delete('/recipes/:id', authenticate, authorize(['admin']), deleteRecipe);

export default router;