const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');
const connectDB = require('./config/db'); // Use the proper path

const app = express();

// Connect Database
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);

module.exports = app;
