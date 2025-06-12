# LoveE-Commerce Backend

The backend service for LoveE-Commerce, built with Node.js, Express.js, and MySQL.

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── schemas/        # Validation schemas
│   ├── utils/          # Utility functions
│   ├── app.js          # Express app setup
│   └── server.js       # Server entry point
├── database_script/    # Database setup scripts
├── test_api/          # API tests
└── views/             # Email templates
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Configure your `.env` file with the following variables:
```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=lovee_commerce
JWT_SECRET=your_jwt_secret
```

4. Set up the database:
```bash
# Run database setup script
cd database_script
mysql -u your_username -p < setup.sql
```

5. Start the development server:
```bash
npm run dev
```

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Product Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Order Endpoints

- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status

## 🛠️ Tech Stack

- **Node.js** - Runtime Environment
- **Express.js** - Web Framework
- **MySQL** - Database
- **JWT** - Authentication
- **Bcrypt** - Password Hashing
- **Nodemailer** - Email Service
- **Multer** - File Upload
- **Joi** - Request Validation
- **Morgan** - HTTP Request Logger
- **Cors** - Cross-Origin Resource Sharing

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 📦 Production Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## 🔒 Security

- JWT Authentication
- Password Hashing
- CORS Configuration
- Rate Limiting
- Input Validation
- SQL Injection Prevention

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.
