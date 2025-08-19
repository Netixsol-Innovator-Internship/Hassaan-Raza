require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const { swaggerSpec, swaggerUiOptions } = require('./docs/swagger');
const errorHandler = require('./middlewares/errorHandler');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const PORT = process.env.PORT || 3002;

const start = async () => {
  await connectDB();

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/', (req, res) => {
    res.json({ success: true, data: null, message: 'Task Manager API v2 is running' });
  });

  app.use('/api/users', authRoutes);
  app.use('/api/tasks', taskRoutes);

  // Serve swagger UI with full spec + UI options
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

  // global error handler
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📚 Swagger docs: http://localhost:${PORT}/api-docs`);
  });
};

start().catch(err => {
  console.error('Failed to start server:', err);
});
