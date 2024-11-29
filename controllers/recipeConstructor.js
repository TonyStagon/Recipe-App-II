import Recipe from "../../models/recipe"; // Adjust the import path to the location of your schema

export const postRecipe = async(req, res) => {
    try {
        // Extract recipe data from the request body
        const { title, description, ingredients, instructions } = req.body;

        // Validate required fields
        if (!title || !description || !ingredients || !instructions) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create a new Recipe instance with the provided data
        const recipe = new Recipe({
            title,
            description,
            ingredients,
            instructions,
        });

        // Save the recipe to the database
        const savedRecipe = await recipe.save();

        // Send a success response with the saved recipe
        res.status(201).json(savedRecipe);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: error.message });
    }
};