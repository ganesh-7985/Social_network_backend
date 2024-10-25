const express = require('express');
const connectDB = require('./config/db');
const circleRoutes = require('./routes/circleRoutes');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();
connectDB();

app.use(express.json());
app.use('/api', circleRoutes);
app.use('/api', postRoutes);
app.use('/api',authRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
