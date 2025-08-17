import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';  
// import cors from 'cors';
// import productRoutes from './routes/productRoutes.js';
// import userRoutes from './routes/userRoutes.js';
// import orderRoutes from './routes/orderRoutes.js';
// import uploadRoutes from './routes/uploadRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/hel', (req, res) => {
  res.send(`API is running... at ${PORT}`);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});