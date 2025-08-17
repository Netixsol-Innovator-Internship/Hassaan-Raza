import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Tea E-Commerce API",
            version: "1.0.0",
            description:
                "A comprehensive REST API for tea e-commerce platform with authentication, product management, and cart functionality",
            contact: {
                name: "Tea Shop API Support",
                email: "support@teashop.com",
            },
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Development server",
            },
            {
                url: "https://your-production-url.com",
                description: "Production server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "User ID",
                        },
                        name: {
                            type: "string",
                            description: "User's full name",
                        },
                        email: {
                            type: "string",
                            format: "email",
                            description: "User's email address",
                        },
                        role: {
                            type: "string",
                            enum: ["user", "admin"],
                            description: "User role",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Account creation date",
                        },
                    },
                },
                Product: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            description: "Product ID",
                        },
                        name: {
                            type: "string",
                            description: "Product name",
                        },
                        description: {
                            type: "string",
                            description: "Product description",
                        },
                        price: {
                            type: "number",
                            format: "float",
                            description: "Product price",
                        },
                        weight: {
                            type: "string",
                            description: "Product weight (e.g., 100g, 1kg)",
                        },
                        collection: {
                            type: "string",
                            enum: ["Green Tea", "Black Tea", "White Tea", "Oolong Tea", "Herbal Tea", "Pu-erh Tea"],
                            description: "Tea collection category",
                        },
                        origin: {
                            type: "string",
                            description: "Tea origin country/region",
                        },
                        flavour: {
                            type: "string",
                            description: "Tea flavour profile",
                        },
                        quality: {
                            type: "string",
                            enum: ["Premium", "Standard", "Organic", "Fair Trade"],
                            description: "Tea quality grade",
                        },
                        caffeine: {
                            type: "string",
                            enum: ["High", "Medium", "Low", "Caffeine-Free"],
                            description: "Caffeine level",
                        },
                        image: {
                            type: "string",
                            description: "Product image URL",
                        },
                        stock: {
                            type: "integer",
                            description: "Available stock quantity",
                        },
                        isActive: {
                            type: "boolean",
                            description: "Product availability status",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Product creation date",
                        },
                    },
                },
                CartItem: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            description: "Cart item ID",
                        },
                        product: {
                            $ref: "#/components/schemas/Product",
                        },
                        quantity: {
                            type: "integer",
                            minimum: 1,
                            description: "Item quantity",
                        },
                        price: {
                            type: "number",
                            format: "float",
                            description: "Item price at time of adding to cart",
                        },
                    },
                },
                Cart: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            description: "Cart ID",
                        },
                        user: {
                            type: "string",
                            description: "User ID",
                        },
                        items: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/CartItem",
                            },
                        },
                        totalAmount: {
                            type: "number",
                            format: "float",
                            description: "Total cart amount",
                        },
                        totalItems: {
                            type: "integer",
                            description: "Total number of items",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Cart creation date",
                        },
                    },
                },
                Error: {
                    type: "object",
                    properties: {
                        success: {
                            type: "boolean",
                            example: false,
                        },
                        message: {
                            type: "string",
                            description: "Error message",
                        },
                        errors: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    field: {
                                        type: "string",
                                    },
                                    message: {
                                        type: "string",
                                    },
                                },
                            },
                        },
                    },
                },
                Success: {
                    type: "object",
                    properties: {
                        success: {
                            type: "boolean",
                            example: true,
                        },
                        message: {
                            type: "string",
                            description: "Success message",
                        },
                        data: {
                            type: "object",
                            description: "Response data",
                        },
                    },
                },
            },
        },
        tags: [
            {
                name: "Authentication",
                description: "User authentication and profile management",
            },
            {
                name: "Products",
                description: "Product management and catalog operations",
            },
            {
                name: "Cart",
                description: "Shopping cart operations",
            },
            {
                name: "Health",
                description: "API health check",
            },
        ],
    },
    apis: ["./routes/*.js", "./controllers/*.js"], // Path to the API files
}

const specs = swaggerJsdoc(options)

export { specs, swaggerUi }
