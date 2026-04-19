const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateToken } = require('../utils/helpers');

// Login user with wallet/password
const loginUser = async (req, res) => {
  try {
    const { walletAddress, password } = req.body;

    if (!walletAddress || !password) {
      return res.status(400).json({ error: 'Wallet address and password required' });
    }

    const user = await User.findOne({ walletAddress });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.json({ 
      success: true, 
      token, 
      user: { id: user._id, walletAddress: user.walletAddress, email: user.email }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Register new user
const registerUser = async (req, res) => {
  try {
    const { walletAddress, password, email } = req.body;

    if (!walletAddress || !password || !email) {
      return res.status(400).json({ error: 'All fields required' });
    }

    const existingUser = await User.findOne({ 
      $or: [{ walletAddress }, { email }] 
    });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ walletAddress, email, password: hashedPassword });
    await user.save();

    const token = generateToken(user);
    res.status(201).json({ 
      success: true, 
      token, 
      user: { id: user._id, walletAddress: user.walletAddress, email: user.email }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Connect existing wallet
const connectWallet = async (req, res) => {
  try {
    const { walletAddress, password } = req.body;

    let user = await User.findOne({ walletAddress });
    if (!user) {
      return res.status(404).json({ error: 'Wallet not found. Please register first.' });
    }

    if (password && !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = generateToken(user);
    res.json({ 
      success: true, 
      token, 
      user: { id: user._id, walletAddress: user.walletAddress }
    });
  } catch (error) {
    console.error('Connect wallet error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { loginUser, registerUser, connectWallet };

