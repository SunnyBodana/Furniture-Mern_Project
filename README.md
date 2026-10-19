# Furniture E-Commerce Platform

A comprehensive full-stack web application for online furniture shopping, built with React, Node.js, MongoDB, Firebase, and Stripe.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Project](#running-the-project)
- [Database Setup](#database-setup)
- [API Documentation](#api-documentation)
- [Build Instructions](#build-instructions)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

The Furniture E-Commerce Platform is a modern, scalable web application that enables customers to browse, search, and purchase furniture products online. The platform provides a complete shopping experience with secure authentication, payment processing, and administrative controls.

### Key Highlights

- **Full-Stack Application**: React frontend with Node.js/Express backend
- **Secure Authentication**: Firebase Authentication integration
- **Payment Processing**: Stripe payment gateway integration
- **Database**: MongoDB for flexible data storage
- **Responsive Design**: Mobile-friendly interface using Bootstrap
- **State Management**: Redux Toolkit for efficient state handling
- **Admin Panel**: Complete administrative interface for product and order management

---

## Features

### User Features

- ✅ **User Authentication**
  - Secure registration and login with Firebase
  - Session management
  - Password reset functionality

- ✅ **Product Browsing**
  - Browse products by categories (Chairs, Sofas, Tables)
  - View detailed product information
  - Product images and descriptions
  - Search functionality

- ✅ **Shopping Cart**
  - Add/remove items from cart
  - Update quantities
  - Persistent cart (saved in Redux)
  - Automatic price calculation

- ✅ **Checkout & Payment**
  - Secure Stripe payment integration
  - Order creation and confirmation
  - Order history tracking

### Admin Features

- ✅ **Product Management**
  - Add, update, and delete products
  - Manage product categories
  - Stock management

- ✅ **Order Management**
  - View all orders
  - Update order status
  - Track order details
  - Payment status monitoring

- ✅ **User Management**
  - View user data
  - User role management
  - Contact inquiries handling

- ✅ **Dashboard**
  - Statistics overview
  - Quick access to all features

---

## Technology Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.1.0 | UI library for building user interfaces |
| Redux Toolkit | 2.8.2 | State management |
| Redux Persist | 6.0.0 | State persistence to localStorage |
| React Router | 7.6.2 | Client-side routing |
| Axios | 1.9.0 | HTTP client for API calls |
| Bootstrap | 5.3.6 | CSS framework for responsive design |
| Firebase | 11.9.1 | Authentication service |
| Stripe.js | 7.4.0 | Payment processing client |
| React Icons | 5.5.0 | Icon library |
| Font Awesome | 6.7.2 | Additional icons |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | Latest | JavaScript runtime |
| Express | 5.1.0 | Web framework |
| MongoDB | Latest | NoSQL database |
| Mongoose | 8.0.0 | MongoDB object modeling |
| Firebase Admin SDK | 12.0.0 | Server-side Firebase services |
| Stripe | 18.2.1 | Payment processing SDK |
| CORS | 2.8.5 | Cross-origin resource sharing |
| dotenv | 16.5.0 | Environment variable management |
| Nodemon | 3.1.10 | Development tool (auto-restart) |

### Development Tools

- Visual Studio Code
- MongoDB Compass
- Postman (API testing)
- Git (Version control)
- Chrome DevTools

---

## Project Structure

```
New folder/
├── backend/                    # Backend server
│   ├── src/
│   │   ├── config/            # Configuration files
│   │   │   ├── db.js          # MongoDB connection
│   │   │   └── firebaseAdmin.js  # Firebase Admin setup
│   │   ├── controllers/       # Route controllers
│   │   │   ├── authController.js
│   │   │   ├── orderController.js
│   │   │   ├── paymentController.js
│   │   │   └── productController.js
│   │   ├── middlewares/        # Express middlewares
│   │   │   ├── errorHandler.js
│   │   │   ├── requireAdmin.js
│   │   │   └── requireAuth.js
│   │   ├── models/            # Mongoose models
│   │   │   ├── Order.js
│   │   │   ├── Product.js
│   │   │   └── User.js
│   │   ├── routes/             # API routes
│   │   │   ├── authRoutes.js
│   │   │   ├── orderRoutes.js
│   │   │   ├── paymentRoutes.js
│   │   │   └── productRoutes.js
│   │   ├── scripts/           # Utility scripts
│   │   │   └── seedProducts.js  # Database seeding
│   │   ├── utils/             # Utility functions
│   │   │   └── asyncHandler.js
│   │   ├── app.js             # Express app configuration
│   │   └── server.js          # Server entry point
│   ├── .env.example           # Environment variables template
│   ├── package.json           # Backend dependencies
│   └── index.js               # Entry point
│
├── src/                        # Frontend React application
│   ├── admincomponents/       # Admin-specific components
│   │   └── AdminNavbar.jsx
│   ├── adminpages/            # Admin pages
│   │   ├── AddProducts.jsx
│   │   ├── AdminDash.jsx
│   │   ├── Contacts.jsx
│   │   ├── Products.jsx
│   │   └── UserData.jsx
│   ├── components/            # Reusable components
│   │   ├── home/             # Home page components
│   │   │   ├── PopularProduct.jsx
│   │   │   ├── ProductsonHome.jsx
│   │   │   ├── TestimonialSection.jsx
│   │   │   └── WhyChooseSection.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── Toast.jsx
│   │   └── ToastContainer.jsx
│   ├── contexts/              # React contexts
│   │   └── ToastContext.jsx
│   ├── pages/                 # Page components
│   │   ├── Cart.jsx
│   │   ├── Chair.jsx
│   │   ├── ContactUs.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Oneproduct.jsx
│   │   ├── Register.jsx
│   │   ├── Sofa.jsx
│   │   ├── Table.jsx
│   │   ├── CancelPayment.jsx
│   │   └── SuccessPayment.jsx
│   ├── services/              # API services
│   │   └── api.js
│   ├── store/                 # Redux store
│   │   └── store.js
│   ├── firebase.js            # Firebase configuration
│   ├── App.js                 # Main App component
│   ├── App.css                # Global styles
│   ├── index.js               # React entry point
│   └── index.css              # Base styles
│
├── .env.example               # Frontend environment template
├── .gitignore                 # Git ignore rules
├── package.json               # Frontend dependencies
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
└── README.md                  # This file
```

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** (for version control)

### Additional Requirements

- **Firebase Account** - For authentication
  - Create a project at [Firebase Console](https://console.firebase.google.com/)
  - Enable Authentication (Email/Password)

- **Stripe Account** - For payment processing
  - Create an account at [Stripe](https://stripe.com/)
  - Get API keys from Dashboard

---

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "furniture project/New folder"
```

### 2. Install Frontend Dependencies

```bash
npm install
```

This will install all frontend dependencies listed in `package.json`:
- React and related libraries
- Redux Toolkit and Redux Persist
- React Router
- Bootstrap
- Firebase
- Stripe.js
- And other dependencies

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

This will install all backend dependencies:
- Express
- Mongoose
- Firebase Admin SDK
- Stripe SDK
- CORS
- dotenv
- And other dependencies

---

## Environment Setup

### Frontend Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` and add your configuration:

```env
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:5000/api/v1

# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id

# Stripe
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

### Backend Environment Variables

1. Navigate to backend directory:
```bash
cd backend
```

2. Copy the example environment file:
```bash
cp .env.example .env
```

3. Edit `backend/.env` and add your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
CORS_ORIGINS=http://localhost:3000

# Database
DATABASE_URL=mongodb://localhost:27017/furniture-store
# OR use MongoDB Atlas connection string
# DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/furniture-store

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account-email@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"

# Stripe
STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
STRIPE_SUCCESS_URL=http://localhost:3000/success
STRIPE_CANCEL_URL=http://localhost:3000/cancel

# Admin Configuration
ADMIN_EMAILS=admin@example.com
```

### Getting Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings → Service Accounts
4. Click "Generate New Private Key"
5. Download the JSON file
6. Extract the values for:
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `client_email` → `FIREBASE_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_PRIVATE_KEY` (keep the quotes and `\n` characters)

### Getting Stripe Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to Developers → API Keys
3. Copy:
   - **Publishable key** → `REACT_APP_STRIPE_PUBLISHABLE_KEY` (frontend)
   - **Secret key** → `STRIPE_SECRET_KEY` (backend)
4. For webhooks, go to Developers → Webhooks and create an endpoint

---

## Running the Project

### Development Mode

#### 1. Start MongoDB

**Local MongoDB:**
```bash
# Windows
mongod

# macOS/Linux
sudo mongod
```

**MongoDB Atlas:**
- Use the connection string in your `.env` file
- No local MongoDB installation needed

#### 2. Start Backend Server

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5000`

#### 3. Start Frontend Development Server

Open a new terminal:

```bash
# From project root
npm start
```

The frontend will start on `http://localhost:3000` and automatically open in your browser.

### Production Mode

#### Build Frontend

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

#### Start Backend in Production

```bash
cd backend
npm start
```

---

## Database Setup

### 1. Connect to MongoDB

Ensure MongoDB is running (local or Atlas).

### 2. Seed Initial Data

The project includes a seed script to populate the database with sample products:

```bash
cd backend
npm run seed
```

This will:
- Connect to MongoDB
- Insert sample products (Chairs, Sofas, Tables)
- Display a summary of inserted products

### 3. Database Collections

The application uses three main collections:

- **products**: Product catalog
- **orders**: Customer orders
- **users**: User information (synced with Firebase)

### 4. Verify Database

You can use MongoDB Compass to verify the data:
- Connect to `mongodb://localhost:27017`
- Open the `furniture-store` database
- Check the collections

---

## API Documentation

### Base URL

```
http://localhost:5000/api/v1
```

### Authentication

Most endpoints require authentication. Include the Firebase ID token in the request header:

```
Authorization: Bearer <firebase-id-token>
```

### Endpoints

#### Products

- **GET** `/products` - Get all products
  - Query params: `?category=chair` (optional)
  - Response: Array of products

- **GET** `/products/:id` - Get single product
  - Response: Product object

- **POST** `/products` - Create product (Admin only)
  - Body: `{ title, description, price, image, category, stock }`
  - Response: Created product

- **PUT** `/products/:id` - Update product (Admin only)
  - Body: Product fields to update
  - Response: Updated product

- **DELETE** `/products/:id` - Delete product (Admin only)
  - Response: Success message

#### Orders

- **GET** `/orders` - Get user's orders
  - Requires authentication
  - Response: Array of user's orders

- **GET** `/orders/:id` - Get single order
  - Requires authentication
  - Response: Order object

- **GET** `/orders/all` - Get all orders (Admin only)
  - Requires admin authentication
  - Response: Array of all orders

#### Payments

- **POST** `/checkout/create-session` - Create Stripe checkout session
  - Body: `{ items: [{ productId, quantity }] }`
  - Response: `{ sessionId, url }`

- **POST** `/checkout/webhook` - Stripe webhook endpoint
  - Handles payment events from Stripe

#### Authentication

- **POST** `/auth/verify` - Verify Firebase token
  - Body: `{ token }`
  - Response: User information

---

## Build Instructions

### Frontend Build

```bash
npm run build
```

This creates a production-ready build in the `build/` directory.

### Backend Build

The backend doesn't require a build step. For production:

1. Set `NODE_ENV=production` in `.env`
2. Use a process manager like PM2:
```bash
npm install -g pm2
pm2 start backend/index.js --name furniture-api
```

---

## Testing

### Frontend Testing

```bash
npm test
```

### Manual Testing Checklist

- [ ] User registration and login
- [ ] Product browsing by category
- [ ] Add/remove items from cart
- [ ] Update cart quantities
- [ ] Checkout process
- [ ] Payment processing
- [ ] Order history
- [ ] Admin product management
- [ ] Admin order management
- [ ] Responsive design on mobile

---

## Deployment

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend:
```bash
npm run build
```

2. Deploy the `build/` folder to:
   - **Vercel**: Connect GitHub repo and deploy
   - **Netlify**: Drag and drop `build/` folder or connect repo

3. Set environment variables in the hosting platform's dashboard

### Backend Deployment (Heroku/Railway/AWS)

1. Create account on hosting platform
2. Connect GitHub repository
3. Set environment variables
4. Deploy

### Database Deployment (MongoDB Atlas)

1. Create MongoDB Atlas account
2. Create a cluster
3. Create database user
4. Whitelist IP addresses
5. Get connection string
6. Update `DATABASE_URL` in backend `.env`

### Environment Variables for Production

Update all environment variables with production URLs:
- `REACT_APP_API_BASE_URL` → Production backend URL
- `CORS_ORIGINS` → Production frontend URL
- `STRIPE_SUCCESS_URL` → Production success page URL
- `STRIPE_CANCEL_URL` → Production cancel page URL

---

## Troubleshooting

### Common Issues

#### 1. MongoDB Connection Error

**Problem:** Cannot connect to MongoDB

**Solutions:**
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- Verify MongoDB Atlas IP whitelist
- Check firewall settings

#### 2. Firebase Authentication Error

**Problem:** Authentication not working

**Solutions:**
- Verify Firebase configuration in `.env`
- Check Firebase project settings
- Ensure Email/Password authentication is enabled
- Verify API keys are correct

#### 3. Stripe Payment Error

**Problem:** Payment processing fails

**Solutions:**
- Verify Stripe keys in `.env`
- Check webhook configuration
- Ensure using test keys in development
- Verify webhook secret is correct

#### 4. CORS Error

**Problem:** CORS policy blocking requests

**Solutions:**
- Check `CORS_ORIGINS` in backend `.env`
- Ensure frontend URL is included
- Restart backend server after changes

#### 5. Port Already in Use

**Problem:** Port 3000 or 5000 already in use

**Solutions:**
- Change port in `.env` files
- Kill process using the port:
  - Windows: `netstat -ano | findstr :5000` then `taskkill /PID <pid> /F`
  - macOS/Linux: `lsof -ti:5000 | xargs kill`

#### 6. Module Not Found

**Problem:** Import errors

**Solutions:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check file paths are correct

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is part of an academic submission for MCA-401 Software Project at Dr. Babasaheb Ambedkar Open University.

---

## Contact

**Student:** Sunny M Bodana  
**Enrollment Number:** 224000104844MCA  
**Institution:** Dr. Babasaheb Ambedkar Open University

---

## Acknowledgments

- React team for the excellent framework
- MongoDB for the flexible database solution
- Firebase for authentication services
- Stripe for payment processing
- Bootstrap for the CSS framework
- All open-source contributors

---

## Project Status

✅ **Completed Features:**
- User authentication
- Product catalog
- Shopping cart
- Payment processing
- Order management
- Admin panel
- Responsive design

🚧 **Future Enhancements:**
- Product reviews and ratings UI
- Email notifications
- Advanced search and filters
- Wishlist functionality
- Product recommendations
- Mobile app development
- Analytics dashboard

---

**Last Updated:** January 2026
#   n e w p r o j e c t  
 #   n e w p r o j e c t  
 #   n e w p r o j e c t  
 #   F u r n i t u r e - M e r n _ P r o j e c t  
 
