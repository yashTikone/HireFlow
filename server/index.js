require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

const connectDB = require('./config/db');

const authRoutes = require('./Authentication/authRoutes');
const profileRoutes = require('./Profiles/profileRoutes');
const jobRoutes = require('./Jobs/jobRoutes');
const applicationRoutes = require('./Applications/applicationRoutes');

const app = express();

// CORS configuration: allow local development and deployed frontend
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://hireflow-chi-bice.vercel.app'
    ]
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

// Health check
app.get('/', (req, res) => {
    res.json({
        name: 'HireFlow API',
        status: 'running'
    });
});

// Error handling
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        return res.status(400).json({
            message: error.message
        });
    }

    if (error) {
        return res.status(400).json({
            message: error.message
        });
    }

    next();
});

// Connect to MongoDB
connectDB();

// Start server
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`HireFlow API listening on port ${port}`);
});