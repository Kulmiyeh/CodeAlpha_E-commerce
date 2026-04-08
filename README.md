 # 🛍️ Modern E-Commerce Store

A high-performance, full-stack e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js) and Vite.

## 📸 Project Snapshots

| Home Page | Product Catalog | Product Details |
| :---: | :---: | :---: |
| ![Home](https://picsum.photos/seed/home/800/450) | ![Catalog](https://picsum.photos/seed/catalog/800/450) | ![Details](https://picsum.photos/seed/details/800/450) |

| Shopping Cart | User Profile | Checkout |
| :---: | :---: | :---: |
| ![Cart](https://picsum.photos/seed/cart/800/450) | ![Profile](https://picsum.photos/seed/profile/800/450) | ![Checkout](https://picsum.photos/seed/checkout/800/450) |

---

## ✨ Key Features

### 🔐 Secure Authentication
- **JWT-based Auth**: Secure login and registration using JSON Web Tokens.
- **Password Hashing**: Industry-standard encryption using `bcryptjs`.
- **Protected Routes**: Middleware-guaranteed access to user profiles and orders.

### 📦 Product Management
- **Dynamic Catalog**: Real-time product fetching with pagination.
- **Advanced Search**: Instant search by keyword with regex matching.
- **Category Filtering**: Browse products by specific categories.
- **Stock Tracking**: Real-time inventory management.

### 🛒 Shopping Experience
- **Interactive Cart**: Add, remove, and update quantities with instant price calculation.
- **Wishlist**: Save items to your personal favorites list.
- **Responsive UI**: Polished design using Tailwind CSS and Motion (Framer Motion).

### 🛠️ Backend & Infrastructure
- **Express API**: Robust RESTful API architecture.
- **MongoDB Integration**: Scalable NoSQL database with Mongoose ODM.
- **Resilient Connection**: Automatic **Mock Data Fallback** if the database is disconnected.
- **Data Seeding**: Built-in scripts to populate the store with sample data.

---

## 🚀 Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide Icons, Motion.
- **Backend**: Node.js, Express, TypeScript.
- **Database**: MongoDB (Mongoose).
- **State Management**: React Context API.
- **Utilities**: Axios, JWT, BcryptJS, Multer.

---

## 🛠️ Setup & Installation

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment Variables**:
   Create a `.env` file based on `.env.example`:
   - `MONGODB_URI`: Your MongoDB connection string.
   - `JWT_SECRET`: Your secret key for token generation.
4. **Seed the Database** (Optional):
   ```bash
   npm run data:import
   ```
5. **Run the Development Server**:
   ```bash
   npm run dev
   ```

---

## 📡 API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get token
- `GET /api/auth/profile` - Get current user profile

### Products
- `GET /api/products` - Get all products (supports search, category, pagination)
- `GET /api/products/:id` - Get single product details
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/myorders` - Get logged-in user's orders
- `GET /api/orders/:id` - Get order by ID

