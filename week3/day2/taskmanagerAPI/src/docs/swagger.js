const swaggerJSDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Manager API",
      version: "2.0.0",
      description: `
        A comprehensive Task Manager RESTful API built with Node.js, Express, MongoDB, and JWT authentication.
        
        ## Features
        - 🔐 JWT Authentication & Authorization
        - 📝 Complete CRUD operations for tasks
        - 👤 User management and profiles
        - 🔍 Advanced search and filtering
        - 📊 Task statistics and analytics
        - ✅ Input validation and sanitization
        - 🛡️ Security best practices
        
        ## Getting Started
        1. Register a new account using the \`/api/auth/register\` endpoint
        2. Login to get your JWT token using \`/api/auth/login\`
        3. Click the "Authorize" button below and enter: \`Bearer <your-token>\`
        4. Start managing your tasks!
      `,
      contact: {
        name: "API Support",
        email: "support@taskmanager.com",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: "http://localhost:3002",
        description: "Development server",
      },
      {
        url: "https://hassaan-week3-day2-api.vercel.app",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT token in the format: Bearer <token>",
        },
      },
      schemas: {
        User: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            _id: {
              type: "string",
              description: "User unique identifier",
              example: "507f1f77bcf86cd799439011",
            },
            name: {
              type: "string",
              minLength: 2,
              maxLength: 50,
              description: "User full name",
              example: "John Doe",
            },
            email: {
              type: "string",
              format: "email",
              description: "User email address",
              example: "john.doe@example.com",
            },
            password: {
              type: "string",
              minLength: 6,
              description: "User password (hashed in database)",
              example: "SecurePass123!",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Account creation timestamp",
              example: "2024-01-15T10:30:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Last update timestamp",
              example: "2024-01-15T10:30:00.000Z",
            },
          },
        },
        Task: {
          type: "object",
          required: ["title", "user"],
          properties: {
            _id: {
              type: "string",
              description: "Task unique identifier",
              example: "507f1f77bcf86cd799439012",
            },
            title: {
              type: "string",
              minLength: 1,
              maxLength: 100,
              description: "Task title",
              example: "Complete project documentation",
            },
            description: {
              type: "string",
              maxLength: 500,
              description: "Detailed task description",
              example: "Write comprehensive API documentation with examples and usage guidelines",
            },
            completed: {
              type: "boolean",
              description: "Task completion status",
              example: false,
              default: false,
            },
            priority: {
              type: "string",
              enum: ["low", "medium", "high"],
              description: "Task priority level",
              example: "high",
              default: "medium",
            },
            dueDate: {
              type: "string",
              format: "date-time",
              description: "Task due date",
              example: "2024-02-01T23:59:59.000Z",
            },
            user: {
              type: "string",
              description: "User ID who owns this task",
              example: "507f1f77bcf86cd799439011",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Task creation timestamp",
              example: "2024-01-15T10:30:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Last update timestamp",
              example: "2024-01-15T10:30:00.000Z",
            },
          },
        },
        ApiResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              description: "Request success status",
              example: true,
            },
            data: {
              type: "object",
              description: "Response data payload",
            },
            message: {
              type: "string",
              description: "Response message",
              example: "Operation completed successfully",
            },
          },
        },
        ValidationError: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            data: {
              type: "object",
              nullable: true,
              example: null,
            },
            message: {
              type: "string",
              example: "Validation failed",
            },
            errors: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  field: {
                    type: "string",
                    example: "email",
                  },
                  message: {
                    type: "string",
                    example: "Please provide a valid email address",
                  },
                  value: {
                    type: "string",
                    example: "invalid-email",
                  },
                },
              },
            },
          },
        },
        TaskStats: {
          type: "object",
          properties: {
            totalTasks: {
              type: "number",
              description: "Total number of tasks",
              example: 25,
            },
            completedTasks: {
              type: "number",
              description: "Number of completed tasks",
              example: 15,
            },
            pendingTasks: {
              type: "number",
              description: "Number of pending tasks",
              example: 10,
            },
            completionRate: {
              type: "number",
              description: "Completion rate percentage",
              example: 60,
            },
            priorityBreakdown: {
              type: "object",
              properties: {
                high: {
                  type: "number",
                  example: 5,
                },
                medium: {
                  type: "number",
                  example: 12,
                },
                low: {
                  type: "number",
                  example: 8,
                },
              },
            },
            overdueTasks: {
              type: "number",
              description: "Number of overdue tasks",
              example: 3,
            },
            dueTodayTasks: {
              type: "number",
              description: "Number of tasks due today",
              example: 2,
            },
            recentActivity: {
              type: "number",
              description: "Tasks created in last 7 days",
              example: 8,
            },
          },
        },
      },
    },
    paths: {
      "/": {
        get: {
          tags: ["Health Check"],
          summary: "API Health Check",
          description: "Check if the API is running and accessible",
          responses: {
            200: {
              description: "API is running successfully",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/ApiResponse" },
                      {
                        type: "object",
                        properties: {
                          message: {
                            example: "Task Manager API v2 is running with MongoDB!",
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
      "/api/auth/register": {
        post: {
          tags: ["Authentication"],
          summary: "Register a new user",
          description: "Create a new user account with email and password",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "email", "password"],
                  properties: {
                    name: {
                      type: "string",
                      minLength: 2,
                      maxLength: 50,
                      example: "John Doe",
                    },
                    email: {
                      type: "string",
                      format: "email",
                      example: "john.doe@example.com",
                    },
                    password: {
                      type: "string",
                      minLength: 6,
                      example: "SecurePass123!",
                    },
                  },
                },
                examples: {
                  newUser: {
                    summary: "New user registration",
                    value: {
                      name: "Alice Johnson",
                      email: "alice.johnson@example.com",
                      password: "MySecurePassword123!",
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "User registered successfully",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/ApiResponse" },
                      {
                        type: "object",
                        properties: {
                          data: {
                            type: "object",
                            properties: {
                              token: {
                                type: "string",
                                example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                              },
                              user: {
                                $ref: "#/components/schemas/User",
                              },
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
            400: {
              description: "Validation error or user already exists",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ValidationError" },
                },
              },
            },
          },
        },
      },
      "/api/auth/login": {
        post: {
          tags: ["Authentication"],
          summary: "Login user",
          description: "Authenticate user and return JWT token",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "password"],
                  properties: {
                    email: {
                      type: "string",
                      format: "email",
                      example: "john.doe@example.com",
                    },
                    password: {
                      type: "string",
                      example: "SecurePass123!",
                    },
                  },
                },
                examples: {
                  loginExample: {
                    summary: "User login",
                    value: {
                      email: "alice.johnson@example.com",
                      password: "MySecurePassword123!",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Login successful",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/ApiResponse" },
                      {
                        type: "object",
                        properties: {
                          data: {
                            type: "object",
                            properties: {
                              token: {
                                type: "string",
                                example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                              },
                              user: {
                                $ref: "#/components/schemas/User",
                              },
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
            401: {
              description: "Invalid credentials",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/ApiResponse" },
                      {
                        type: "object",
                        properties: {
                          success: { example: false },
                          message: { example: "Invalid email or password" },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
      "/api/auth/me": {
        get: {
          tags: ["Authentication"],
          summary: "Get current user profile",
          description: "Get the profile information of the currently authenticated user",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "User profile retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/ApiResponse" },
                      {
                        type: "object",
                        properties: {
                          data: {
                            type: "object",
                            properties: {
                              user: { $ref: "#/components/schemas/User" },
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
            401: {
              description: "Unauthorized - Invalid or missing token",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/ApiResponse" },
                      {
                        type: "object",
                        properties: {
                          success: { example: false },
                          message: { example: "Not authorized, token failed" },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
      "/api/tasks": {
        get: {
          tags: ["Tasks"],
          summary: "Get all tasks",
          description:
            "Retrieve all tasks for the authenticated user with optional filtering, searching, and pagination",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "page",
              in: "query",
              description: "Page number for pagination",
              schema: { type: "integer", minimum: 1, default: 1 },
              example: 1,
            },
            {
              name: "limit",
              in: "query",
              description: "Number of tasks per page",
              schema: { type: "integer", minimum: 1, maximum: 100, default: 10 },
              example: 10,
            },
            {
              name: "completed",
              in: "query",
              description: "Filter by completion status",
              schema: { type: "boolean" },
              example: false,
            },
            {
              name: "priority",
              in: "query",
              description: "Filter by priority level",
              schema: { type: "string", enum: ["low", "medium", "high"] },
              example: "high",
            },
            {
              name: "search",
              in: "query",
              description: "Search in task title and description",
              schema: { type: "string" },
              example: "documentation",
            },
          ],
          responses: {
            200: {
              description: "Tasks retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/ApiResponse" },
                      {
                        type: "object",
                        properties: {
                          data: {
                            type: "object",
                            properties: {
                              tasks: {
                                type: "array",
                                items: { $ref: "#/components/schemas/Task" },
                              },
                              pagination: {
                                type: "object",
                                properties: {
                                  currentPage: { type: "integer", example: 1 },
                                  totalPages: { type: "integer", example: 3 },
                                  totalTasks: { type: "integer", example: 25 },
                                  hasNextPage: { type: "boolean", example: true },
                                  hasPrevPage: { type: "boolean", example: false },
                                },
                              },
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["Tasks"],
          summary: "Create a new task",
          description: "Create a new task for the authenticated user",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["title"],
                  properties: {
                    title: {
                      type: "string",
                      minLength: 1,
                      maxLength: 100,
                      example: "Complete project documentation",
                    },
                    description: {
                      type: "string",
                      maxLength: 500,
                      example: "Write comprehensive API documentation with examples",
                    },
                    priority: {
                      type: "string",
                      enum: ["low", "medium", "high"],
                      example: "high",
                    },
                    dueDate: {
                      type: "string",
                      format: "date-time",
                      example: "2024-02-01T23:59:59.000Z",
                    },
                  },
                },
                examples: {
                  urgentTask: {
                    summary: "Urgent task with due date",
                    value: {
                      title: "Fix critical bug in authentication",
                      description: "Users are unable to login due to JWT validation error",
                      priority: "high",
                      dueDate: "2024-01-20T17:00:00.000Z",
                    },
                  },
                  simpleTask: {
                    summary: "Simple task",
                    value: {
                      title: "Update README file",
                      priority: "low",
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Task created successfully",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/ApiResponse" },
                      {
                        type: "object",
                        properties: {
                          data: {
                            type: "object",
                            properties: {
                              task: { $ref: "#/components/schemas/Task" },
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
            400: {
              description: "Validation error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ValidationError" },
                },
              },
            },
          },
        },
      },
      "/api/tasks/stats": {
        get: {
          tags: ["Tasks"],
          summary: "Get task statistics",
          description:
            "Get comprehensive statistics about user tasks including completion rates, priority breakdown, and time-based analytics",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Task statistics retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/ApiResponse" },
                      {
                        type: "object",
                        properties: {
                          data: {
                            type: "object",
                            properties: {
                              stats: { $ref: "#/components/schemas/TaskStats" },
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
      "/api/tasks/:id": {
        get: {
          tags: ["Tasks"],
          summary: "Get task by ID",
          description: "Retrieve a specific task by its ID (user can only access their own tasks)",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "Task ID",
              schema: { type: "string" },
              example: "507f1f77bcf86cd799439012",
            },
          ],
          responses: {
            200: {
              description: "Task retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/ApiResponse" },
                      {
                        type: "object",
                        properties: {
                          data: {
                            type: "object",
                            properties: {
                              task: { $ref: "#/components/schemas/Task" },
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
            404: {
              description: "Task not found",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/ApiResponse" },
                      {
                        type: "object",
                        properties: {
                          success: { example: false },
                          message: { example: "Task not found" },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        put: {
          tags: ["Tasks"],
          summary: "Update task",
          description: "Update a specific task (user can only update their own tasks)",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "Task ID",
              schema: { type: "string" },
              example: "507f1f77bcf86cd799439012",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    title: {
                      type: "string",
                      minLength: 1,
                      maxLength: 100,
                      example: "Updated task title",
                    },
                    description: {
                      type: "string",
                      maxLength: 500,
                      example: "Updated task description",
                    },
                    completed: {
                      type: "boolean",
                      example: true,
                    },
                    priority: {
                      type: "string",
                      enum: ["low", "medium", "high"],
                      example: "medium",
                    },
                    dueDate: {
                      type: "string",
                      format: "date-time",
                      example: "2024-02-15T23:59:59.000Z",
                    },
                  },
                },
                examples: {
                  markCompleted: {
                    summary: "Mark task as completed",
                    value: {
                      completed: true,
                    },
                  },
                  updatePriority: {
                    summary: "Update task priority",
                    value: {
                      priority: "high",
                      dueDate: "2024-01-25T17:00:00.000Z",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Task updated successfully",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/ApiResponse" },
                      {
                        type: "object",
                        properties: {
                          data: {
                            type: "object",
                            properties: {
                              task: { $ref: "#/components/schemas/Task" },
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
            404: {
              description: "Task not found",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/ApiResponse" },
                      {
                        type: "object",
                        properties: {
                          success: { example: false },
                          message: { example: "Task not found" },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ["Tasks"],
          summary: "Delete task",
          description: "Delete a specific task (user can only delete their own tasks)",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "Task ID",
              schema: { type: "string" },
              example: "507f1f77bcf86cd799439012",
            },
          ],
          responses: {
            200: {
              description: "Task deleted successfully",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/ApiResponse" },
                      {
                        type: "object",
                        properties: {
                          message: { example: "Task deleted successfully" },
                        },
                      },
                    ],
                  },
                },
              },
            },
            404: {
              description: "Task not found",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/ApiResponse" },
                      {
                        type: "object",
                        properties: {
                          success: { example: false },
                          message: { example: "Task not found" },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js", "./src/controllers/*.js", "./src/models/*.js"],
  // apis:[path.join(__dirname,"../**/*.js")]
}

const specs = swaggerJSDoc(options)

// Custom CSS for beautiful UI
const customCss = `
  .swagger-ui .topbar { display: none; }
  .swagger-ui .info { margin: 50px 0; }
  .swagger-ui .info .title { color: #2c3e50; font-size: 36px; }
  .swagger-ui .info .description { font-size: 16px; line-height: 1.6; }
  .swagger-ui .scheme-container { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
  .swagger-ui .auth-wrapper { margin: 20px 0; }
  .swagger-ui .btn.authorize { background-color: #28a745; border-color: #28a745; }
  .swagger-ui .btn.authorize:hover { background-color: #218838; border-color: #1e7e34; }
  .swagger-ui .opblock.opblock-post { border-color: #28a745; }
  .swagger-ui .opblock.opblock-post .opblock-summary { border-color: #28a745; }
  .swagger-ui .opblock.opblock-get { border-color: #007bff; }
  .swagger-ui .opblock.opblock-get .opblock-summary { border-color: #007bff; }
  .swagger-ui .opblock.opblock-put { border-color: #ffc107; }
  .swagger-ui .opblock.opblock-put .opblock-summary { border-color: #ffc107; }
  .swagger-ui .opblock.opblock-delete { border-color: #dc3545; }
  .swagger-ui .opblock.opblock-delete .opblock-summary { border-color: #dc3545; }
  .swagger-ui .opblock-tag { font-size: 24px; margin: 40px 0 20px 0; color: #2c3e50; }
  .swagger-ui .parameter__name { font-weight: bold; }
  .swagger-ui .response-col_status { font-weight: bold; }
  .swagger-ui .model-box { background-color: #f8f9fa; border: 1px solid #dee2e6; }
  .swagger-ui .model .model-title { color: #495057; font-weight: bold; }
`

const swaggerOptions = {
  customCss,
  customSiteTitle: "Task Manager API Documentation",
  customfavIcon: "/favicon.ico",
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    docExpansion: "list",
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
    defaultModelsExpandDepth: 2,
    defaultModelExpandDepth: 2,
  },
}

module.exports = {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(specs, swaggerOptions),
}
