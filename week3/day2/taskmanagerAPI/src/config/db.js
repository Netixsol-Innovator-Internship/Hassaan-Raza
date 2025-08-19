// const mongoose = require("mongoose")

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGODB_URI)
//     console.log(`MongoDB Connected: ${conn.connection.host}`)
//   } catch (error) {
//     console.error("MongoDB connection error:", error.message)
//     process.exit(1)
//   }
// }

// module.exports = connectDB




const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ DB Connection Failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;



// const mongoose = require("mongoose")

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGODB_URI, {
//       bufferCommands: false,
//       bufferMaxEntries: 0,
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       maxPoolSize: 1, // Maintain up to 1 socket connection for serverless
//       serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
//       socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
//     })
//     console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
//     return conn
//   } catch (error) {
//     console.error("❌ MongoDB connection error:", error.message)
//     throw error
//   }
// }

// module.exports = connectDB
