// server.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');
const productRoutes = require('./routes/productRoutes.js');
const userRoutes = require('./routes/userRoutes.js'); // User routes ko import kiya

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json()); // Yeh line zaroori hai taaki server JSON data samajh sake

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes); // Naye user routes ko use kiya

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} par chal raha hai`);
});
