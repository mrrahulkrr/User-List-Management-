const express = require('express');
const connectDB = require('./config/db');
const listRoutes = require('./routes/listRoutes');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', listRoutes);

// Connect to DB and start server
connectDB();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
