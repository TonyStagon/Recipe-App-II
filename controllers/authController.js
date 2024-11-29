import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const secretKey = process.env.JWT_SECRET || 'defaultsecretkey';

export const registerUser = async(req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;

       
    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, secretKey, { expiresIn: '1h' });
        res.status(200).json({ token, message: 'Login successful!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};