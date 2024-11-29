import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import recipeRoutes from './routes/recipeRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config(); // Load environment variables

const app = express(); // Initialize Express app
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Add authentication routes
app.use('/api/auth', authRoutes);

// Routes
app.use('/api', recipeRoutes);

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('Error connecting to MongoDB:', error));

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));