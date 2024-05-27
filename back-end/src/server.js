import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from './dbConnect.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
}));
app.use(express.json()); // Middleware to parse JSON request bodies

app.get('/rooms', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM room');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Endpoint to handle login requests
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Check if the user exists in the database
        const userQuery = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = userQuery.rows[0];

        // If user does not exist
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        // If passwords don't match
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // If email and password are correct, generate a JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the token in the response
        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

//---------------------------------------------------------------------------------------------
// Endpoint to handle signup requests
//---------------------------------------------------------------------------------------------
app.post('/signup', async (req, res) => {
    const { email, passwordHash, firstName, lastName } = req.body;

    if (!email || !passwordHash || !firstName || !lastName) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if the user already exists
        const userQuery = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userQuery.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(passwordHash, 10);

        // Insert the new user into the database
        const newUserQuery = `
            INSERT INTO users (email, password_hash, first_name, last_name)
            VALUES ($1, $2, $3, $4)
            RETURNING id, email, first_name, last_name
        `;
        const newUser = await pool.query(newUserQuery, [email, hashedPassword, firstName, lastName]);

        // Generate a JWT token
        const token = jwt.sign({ userId: newUser.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, user: newUser.rows[0] });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
