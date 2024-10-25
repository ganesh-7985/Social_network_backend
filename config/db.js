const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
   const connection = await mongoose.connect(process.env.MONGO_URI);
   if(connection){
     console.log("MongoDB connection successful");
   }
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
