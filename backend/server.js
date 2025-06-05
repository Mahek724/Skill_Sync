const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const auth = require('./routers/auth');



dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // must be specific, not '*'
  credentials: true               // allows cookies/auth headers
}));

// Routes
app.use('/api/auth', auth);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));