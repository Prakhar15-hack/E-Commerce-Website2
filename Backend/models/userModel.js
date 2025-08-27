// models/userModel.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Password ko encrypt karne ke liye

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Har user ka email unique hoga
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false, // Default user admin nahi hoga
    },
  },
  {
    timestamps: true,
  }
);

// Login ke time password match karne ke liye method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// User save hone se pehle password ko encrypt karne ke liye
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
