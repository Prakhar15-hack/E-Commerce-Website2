// config/db.js

// Mongoose ko import kar rahe hain
const mongoose = require('mongoose');

// Database se connect karne ke liye ek function bana rahe hain
const connectDB = async () => {
  try {
    // process.env.MONGO_URI se connection string le rahe hain
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Agar connection successful ho gaya, toh yeh message dikhega
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Agar koi error aaya, toh error message dikhega aur server band ho jayega
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Is function ko export kar rahe hain taaki hum isse server.js mein use kar sakein
module.exports = connectDB;
