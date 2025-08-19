// src/docs/swagger.js
// Generates the swagger specification and provides UI options for swagger-ui-express

const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Manager API',
      version: '2.0.0',
      description: 'Task Manager API with MongoDB, JWT auth, express-validator and Swagger docs',
      contact: {
        name: 'Sheikh Sb',
        email: 'you@example.com'
      }
    },
    servers: [
      { url: `http://localhost:${process.env.PORT || 3002}`, description: 'Local server' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '64ef3a8b2f1b2c001234abcd' },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', format: 'email', example: 'john@example.com' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        UserRegister: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', format: 'email', example: 'john@example.com' },
            password: { type: 'string', example: 'secret123' }
          }
        },
        UserLogin: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email', example: 'john@example.com' },
            password: { type: 'string', example: 'secret123' }
          }
        },
        AuthResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            data: {
              type: 'object',
              properties: {
                user: { $ref: '#/components/schemas/User' },
                token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR...' }
              }
            },
            message: { type: 'string', example: 'Login successful' }
          }
        },
        Task: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '64ef3b9d9b1e7b001234abcd' },
            title: { type: 'string', example: 'Buy groceries' },
            completed: { type: 'boolean', example: false },
            user: { type: 'string', example: '64ef3a8b2f1b2c001234abcd' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        TaskCreate: {
          type: 'object',
          required: ['title'],
          properties: {
            title: { type: 'string', example: 'Buy groceries' },
            completed: { type: 'boolean', example: false }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            data: { type: 'null', example: null },
            message: { type: 'string', example: 'Error message' }
          }
        },
        Stats: {
          type: 'object',
          properties: {
            total: { type: 'integer', example: 10 },
            completed: { type: 'integer', example: 4 },
            pending: { type: 'integer', example: 6 }
          }
        }
      }
    },
    tags: [
      { name: 'Auth', description: 'Authentication & user management' },
      { name: 'Tasks', description: 'Task CRUD operations' }
    ],
    security: [] // top-level (individual route security is set where needed)
  },
  apis: ['./src/routes/*.js'] // path to files with JSDoc comments for routes
};

const swaggerSpec = swaggerJsdoc(options);

// UI options for swagger-ui-express
const swaggerUiOptions = {
  explorer: true, // show search box
  swaggerOptions: {
    persistAuthorization: true, // keep token after page reload
    defaultModelsExpandDepth: -1 // hide schemas by default (cleaner UI)
  },
  customSiteTitle: 'Task Manager API Docs',
  customCss: `
    /* custom css to slightly refine the UI */
    .swagger-ui .topbar { background-color: #111827; }
    .swagger-ui .topbar .download-url-wrapper { display: none; }
    .swagger-ui .info { box-shadow: 0 2px 6px rgba(2,6,23,0.2); border-radius: 8px; padding: 12px; }
  `
};

module.exports = {
  swaggerSpec,
  swaggerUiOptions
};
