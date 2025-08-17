# Tea E-Commerce API Testing Guide

## Overview
This guide provides step-by-step instructions for testing the Tea E-Commerce API using Postman and other tools.

## Prerequisites
- Node.js and npm installed
- MongoDB running locally or connection string ready
- Postman installed (optional but recommended)

## Setup Instructions

### 1. Environment Setup
\`\`\`bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your MongoDB URI and other settings

# Start the server
npm start
\`\`\`

### 2. Access API Documentation
- Open browser and go to: `http://localhost:5000/api-docs`
- Interactive Swagger UI with all endpoints documented

## Testing Workflow

### Step 1: Health Check
\`\`\`bash
GET http://localhost:5000/api/health
\`\`\`
Expected: 200 OK with server status

### Step 2: User Registration
\`\`\`bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "Password123"
}
\`\`\`
Expected: 201 Created with user data and JWT token

### Step 3: User Login
\`\`\`bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "Password123"
}
\`\`\`
Expected: 200 OK with JWT token
**Important**: Copy the token for subsequent requests

### Step 4: Get Products (Public)
\`\`\`bash
GET http://localhost:5000/api/products
\`\`\`
Expected: 200 OK with paginated product list

### Step 5: Filter Products
\`\`\`bash
GET http://localhost:5000/api/products?collection=Green Tea&page=1&limit=5
\`\`\`
Expected: 200 OK with filtered results

### Step 6: Search Products
\`\`\`bash
GET http://localhost:5000/api/products/search?q=green
\`\`\`
Expected: 200 OK with search results

### Step 7: Add to Cart (Authenticated)
\`\`\`bash
POST http://localhost:5000/api/cart
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "productId": "PRODUCT_ID_FROM_STEP_4",
  "quantity": 2
}
\`\`\`
Expected: 200 OK with updated cart

### Step 8: Get Cart
\`\`\`bash
GET http://localhost:5000/api/cart
Authorization: Bearer YOUR_JWT_TOKEN
\`\`\`
Expected: 200 OK with cart contents

### Step 9: Update Cart Item
\`\`\`bash
PUT http://localhost:5000/api/cart/CART_ITEM_ID
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "quantity": 3
}
\`\`\`
Expected: 200 OK with updated cart

### Step 10: Admin Operations (Admin Token Required)
First, login with admin credentials:
\`\`\`bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@teashop.com",
  "password": "admin123"
}
\`\`\`

Then create a product:
\`\`\`bash
POST http://localhost:5000/api/products
Authorization: Bearer ADMIN_JWT_TOKEN
Content-Type: application/json

{
  "name": "Test Tea",
  "description": "A test tea product",
  "price": 19.99,
  "weight": "100g",
  "collection": "Green Tea",
  "origin": "China",
  "flavour": "Fresh",
  "quality": "Premium",
  "caffeine": "Medium",
  "stock": 100
}
\`\`\`

## Postman Collection

Import the provided `postman-collection.json` file into Postman for automated testing:

1. Open Postman
2. Click "Import" button
3. Select `docs/postman-collection.json`
4. Collection will be imported with all endpoints and environment variables

### Using Postman Collection
1. Run "Register User" or "Login User" first
2. JWT token will be automatically saved to collection variables
3. All subsequent requests will use the saved token
4. Product IDs and cart item IDs are automatically captured

## Common Testing Scenarios

### Scenario 1: Complete User Journey
1. Register new user
2. Browse products with filters
3. Add multiple items to cart
4. Update quantities
5. Remove items
6. Clear cart

### Scenario 2: Admin Workflow
1. Login as admin
2. Create new products
3. Update existing products
4. View product statistics
5. Manage inventory

### Scenario 3: Error Handling
1. Try accessing protected routes without token
2. Submit invalid data (test validation)
3. Try to add out-of-stock items to cart
4. Access non-existent resources

## Expected Response Formats

### Success Response
\`\`\`json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
\`\`\`

### Error Response
\`\`\`json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
\`\`\`

## Troubleshooting

### Common Issues
1. **401 Unauthorized**: Check JWT token in Authorization header
2. **400 Bad Request**: Verify request body format and required fields
3. **404 Not Found**: Check endpoint URLs and resource IDs
4. **500 Server Error**: Check server logs and database connection

### Debug Tips
- Check server console for detailed error logs
- Use Swagger UI for interactive testing
- Verify environment variables are set correctly
- Ensure MongoDB is running and accessible

## Performance Testing
For load testing, consider using tools like:
- Apache Bench (ab)
- Artillery.js
- Postman Collection Runner

Example Artillery config:
\`\`\`yaml
config:
  target: 'http://localhost:5000'
  phases:
    - duration: 60
      arrivalRate: 10
scenarios:
  - name: "Get Products"
    requests:
      - get:
          url: "/api/products"
\`\`\`

## Security Testing
- Test JWT token expiration
- Verify admin-only endpoints are protected
- Test input validation and sanitization
- Check for SQL injection vulnerabilities (though using MongoDB)
- Verify CORS settings
