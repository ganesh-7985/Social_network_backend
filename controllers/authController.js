const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Parent = require('../models/Parent');
require('dotenv').config();

const JWT_SECRET = process.env.SECRET_KEY

const register = async (req, res) => {
  try {
    const { name, email, password, school, grade, section, society } = req.body;
    const existingParent = await Parent.findOne({ email });
    if (existingParent) {
      return res.status(400).json({ message: 'Parent already registered.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const parent = await Parent.create({
      name,
      email,
      password: hashedPassword,
      school,
      grade,
      section,
      society,
    });

    res.status(201).json({ message: 'Parent registered successfully', parentId: parent._id });
  } catch (error) {
    res.status(500).json({ message: 'Error registering parent', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const parent = await Parent.findOne({ email });
    if (!parent) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, parent.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ parentId: parent._id }, JWT_SECRET, { expiresIn: '2h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// Middleware to authenticate requests

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.parentId = decoded.parentId; 
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};


module.exports = { register, login, authenticate };