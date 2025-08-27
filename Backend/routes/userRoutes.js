// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { authUser, registerUser, getUserProfile } = require('../controllers/userController.js');
const { protect } = require('../middleware/authMiddleware.js'); // Middleware ko import kiya

router.post('/', registerUser);
router.post('/login', authUser);
// Naya profile route, isko 'protect' middleware se protect kiya hai
router.get('/profile', protect, getUserProfile);

module.exports = router;
