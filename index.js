const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/api/authRoutes');
const classRoutes = require('./routes/api/classRoutes');
const teacherRoutes = require('./routes/api/teacherRoutes');
const studentRoutes = require('./routes/api/studentRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

app.get('/test', (req, res) => {
  res.send('Test route is working');
});

// Route Definitions
app.use('/api/auth', authRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/students',studentRoutes);

// Catch-all route for undefined routes (must be last)
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
