# Tea E-Commerce Frontend

A modern, responsive tea e-commerce website built with Vite, React, and JavaScript, integrated with a comprehensive Express.js backend API.

## Features

- **Authentication System**: User registration, login, and profile management
- **Product Catalog**: Dynamic product listings with filtering and search
- **Shopping Cart**: Full cart functionality with real-time updates
- **Responsive Design**: Mobile-first design that works on all devices
- **Real-time Data**: All data fetched dynamically from backend API
- **Modern UI**: Clean, professional design with smooth animations

## Tech Stack

### Frontend
- **Vite** - Fast build tool and development server
- **React 18** - Modern React with hooks
- **JavaScript** - ES6+ with modern syntax
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons

### Backend Integration
- **Express.js** - Node.js web framework
- **MongoDB** - NoSQL database
- **JWT Authentication** - Secure user authentication
- **Swagger Documentation** - API documentation

## Project Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB database
- Backend server running

### Installation & Setup

1. **Clone and Setup Frontend**
   \`\`\`bash
   # If you haven't already, create the project directory
   mkdir tea-ecommerce
   cd tea-ecommerce
   
   # The frontend code is already generated in your v0 project
   # Download the ZIP from v0 or push to GitHub
   \`\`\`

2. **Environment Variables**
   Create a `.env` file in the frontend root:
   \`\`\`env
   VITE_API_URL=http://localhost:5000/api
   \`\`\`

3. **Install Dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

4. **Setup Backend** (if not already done)
   \`\`\`bash
   # In a separate directory
   mkdir backend
   cd backend
   
   # Copy the backend files from the provided documentation
   # Create package.json, server.js, and all controller/model files
   
   # Install backend dependencies
   npm install
   
   # Create .env file for backend
   echo "PORT=5000
   MONGODB_URI=mongodb://localhost:27017/tea-ecommerce
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=30d
   FRONTEND_URL=http://localhost:3000" > .env
   \`\`\`

5. **Start Development Servers**
   
   **Backend (Terminal 1):**
   \`\`\`bash
   cd backend
   npm run dev
   # Server will start on http://localhost:5000
   # API docs available at http://localhost:5000/api-docs
   \`\`\`
   
   **Frontend (Terminal 2):**
   \`\`\`bash
   cd frontend  # or your frontend directory
   npm run dev
   # App will start on http://localhost:3000
   \`\`\`

### Project Structure

\`\`\`
tea-ecommerce/
├── src/                     # Source code
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── AuthModal.jsx   # Authentication modal
│   │   ├── Header.jsx      # Navigation header
│   │   ├── ProductCard.jsx # Product display card
│   │   └── ...
│   ├── contexts/           # React contexts
│   │   ├── AuthContext.jsx # Authentication state
│   │   └── CartContext.jsx # Shopping cart state
│   ├── lib/                # Utilities
│   │   └── api.js          # API service functions
│   ├── pages/              # Page components
│   │   └── HomePage.jsx    # Main landing page
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
├── package.json            # Dependencies and scripts
└── README.md               # This file
\`\`\`

## API Integration

The frontend integrates with the following backend endpoints:

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Products
- `GET /api/products` - Get products with filtering
- `GET /api/products/:id` - Get single product
- `GET /api/products/search` - Search products

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item
- `DELETE /api/cart/:itemId` - Remove cart item
- `GET /api/cart/summary` - Get cart summary

## Key Features

### Dynamic Data Loading
- All product data fetched from backend API
- Real-time cart updates
- Search functionality with backend integration
- Collection filtering based on actual product data

### Authentication Flow
- JWT-based authentication
- Persistent login state
- Protected cart functionality
- User profile management

### Shopping Cart
- Add/remove items
- Quantity management
- Real-time total calculation
- Cart persistence across sessions

### Responsive Design
- Mobile-first approach
- Touch-friendly interactions
- Optimized for all screen sizes
- Fast loading with proper image optimization

## Development

### Available Scripts
- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically

### API Testing
- Backend API documentation: `http://localhost:5000/api-docs`
- Test endpoints with the Swagger UI
- Health check: `GET http://localhost:5000/api/health`

## Deployment Options

### Option 1: Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables:
   - `VITE_API_URL=https://your-backend-url.com/api`
4. Deploy automatically on push

**Vercel Configuration:**
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

### Option 2: Netlify
1. Push code to GitHub
2. Connect repository to Netlify
3. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Set environment variables in Netlify dashboard

### Option 3: Docker
\`\`\`bash
# Build the Docker image
docker build -t tea-ecommerce-frontend .

# Run the container
docker run -p 3000:80 -e VITE_API_URL=https://your-backend-url.com/api tea-ecommerce-frontend
\`\`\`

### Option 4: Static Hosting (GitHub Pages, etc.)
\`\`\`bash
# Build for production
npm run build

# Upload the 'dist' folder to your static hosting provider
\`\`\`

## Environment Variables

### Development (.env)
\`\`\`env
VITE_API_URL=http://localhost:5000/api
\`\`\`

### Production
\`\`\`env
VITE_API_URL=https://your-production-backend.com/api
\`\`\`

**Important:** All environment variables must be prefixed with `VITE_` to be accessible in the browser.

## Backend Setup Guide

### Quick Backend Setup
1. Create a new directory for your backend
2. Copy the provided Express.js backend code
3. Install dependencies: `npm install express mongoose cors helmet bcryptjs jsonwebtoken swagger-jsdoc swagger-ui-express dotenv`
4. Set up MongoDB (local or MongoDB Atlas)
5. Configure environment variables
6. Start the server: `npm run dev`

### Backend Environment Variables
\`\`\`env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tea-ecommerce
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:3000
\`\`\`

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend CORS is configured for your frontend URL
   - Check that `FRONTEND_URL` is set correctly in backend

2. **API Connection Issues**
   - Verify `VITE_API_URL` is set correctly
   - Ensure backend server is running
   - Check network tab in browser dev tools

3. **Build Issues**
   - Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
   - Check for any TypeScript files that weren't converted

4. **Environment Variables Not Working**
   - Ensure variables are prefixed with `VITE_`
   - Restart development server after adding new variables

## Performance Optimizations

- **Code Splitting**: Automatic with Vite
- **Image Optimization**: Lazy loading implemented
- **Bundle Analysis**: Run `npm run build` to see bundle size
- **Caching**: Static assets cached with proper headers

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Submit a pull request

## License

This project is licensed under the MIT License.
