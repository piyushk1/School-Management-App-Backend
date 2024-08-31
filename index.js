const express = require('express');
const app = express();

const mongoose = require('mongoose');

const cors = require('cors');

require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());

// Import route files
const adminRoutes = require('./routes/api/adminRoutes');
const teacherRoutes = require('./routes/api/teacherRoutes');
const studentRoutes = require('./routes/api/studentRoutes');
const authRoutes = require('./routes/api/authRoutes');
// Apply routes
app.use('/api/admin', adminRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/auth', authRoutes);






const uri = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);  // Authentication routes
app.use('/api/admin', adminRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/student', studentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Catch-all route for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;


