const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');
const errorHandler = require('./middlewares/errorHandler');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(cors());
app.use(express.json());

// simple root
app.get('/', (req, res) => {
  res.json({ success: true, data: null, message: 'Task Manager API is running' });
});

// API routes
app.use('/api/tasks', tasksRouter);

// Swagger basic spec (includes request/response examples)
const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Task Manager API',
    version: '1.0.0',
    description: 'A simple in-memory Task Manager API'
  },
  servers: [{ url: 'http://localhost:3002' }],
  components: {
    schemas: {
      Task: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '550e8400-e29b-41d4-a716-446655440000' },
          title: { type: 'string', example: 'Learn Express' },
          completed: { type: 'boolean', example: false }
        }
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          data: { type: 'null', example: null },
          message: { type: 'string', example: 'Task not found' }
        }
      }
    }
  },
  paths: {
    '/api/tasks': {
      get: {
        summary: 'Get all tasks (optional ?title= filter)',
        responses: {
          200: {
            description: 'List of tasks',
            content: {
              'application/json': {
                schema: { type: 'object' },
                example: { success: true, data: [{ id: '...', title: 'Learn', completed: false }], message: 'Tasks retrieved successfully' }
              }
            }
          }
        }
      },
      post: {
        summary: 'Create task',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Task' },
              example: { title: 'Learn Express', completed: false }
            }
          }
        },
        responses: {
          201: {
            description: 'Task created',
            content: {
              'application/json': {
                example: { success: true, data: { id: '...', title: 'Learn Express', completed: false }, message: 'Task created successfully' }
              }
            }
          },
          400: { $ref: '#/components/schemas/ErrorResponse' }
        }
      }
    },
    '/api/tasks/{id}': {
      get: {
        summary: 'Get task by id',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Task', content: { 'application/json': { example: { success: true, data: { id: '...', title: 'Learn', completed: false }, message: 'Task retrieved' } } } },
          404: { $ref: '#/components/schemas/ErrorResponse' }
        }
      },
      put: {
        summary: 'Update task',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              example: { title: 'Learn Node', completed: true }
            }
          }
        },
        responses: {
          200: { description: 'Updated', content: { 'application/json': { example: { success: true, data: { id: '...', title: 'Learn Node', completed: true }, message: 'Task updated successfully' } } } },
          400: { $ref: '#/components/schemas/ErrorResponse' },
          404: { $ref: '#/components/schemas/ErrorResponse' }
        }
      },
      delete: {
        summary: 'Delete task',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Deleted', content: { 'application/json': { example: { success: true, data: null, message: 'Task deleted successfully' } } } },
          404: { $ref: '#/components/schemas/ErrorResponse' }
        }
      }
    }
  }
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// global error handler (must be after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
