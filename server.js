const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
 const cors = require('cors');
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ limit: '50mb' }));

app.use(cors());
// Define Routes
app.use('/api/members', require('./routes/api/members'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/leader', require('./routes/api/leader'));
app.use('/api/curator', require('./routes/api/curator'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
 
}

app.use(express.static(path.join(__dirname, 'dist')));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
