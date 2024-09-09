const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const adminRoutes = require('./routes/api/adminRoutes');
const studentRoutes = require('./routes/api/studentRoutes');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

console.log("Mongo Uri",process.env.MONGO_URI);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.use('/api/admin', adminRoutes);
app.use('/api/student',studentRoutes);

// Catch-all route for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Mongo Uri",process.env.MONGO_URI);

});

module.exports = app;
