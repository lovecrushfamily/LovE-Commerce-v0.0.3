# LoveE-Commerce Modern Landing Page

The customer-facing frontend for LoveE-Commerce, built with React and Tailwind CSS.

## 🏗️ Project Structure

```
modern-landing-page/
├── src/
│   ├── components/    # Reusable components
│   ├── pages/        # Page components
│   ├── hooks/        # Custom React hooks
│   ├── context/      # React context
│   ├── utils/        # Utility functions
│   ├── assets/       # Static assets
│   └── styles/       # Global styles
├── public/           # Public assets
└── tests/           # Test files
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
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
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

4. Start the development server:
```bash
npm run dev
```

## 📚 Features

- **Home Page**
  - Hero Section
  - Featured Products
  - Categories Showcase
  - Special Offers

- **Product Catalog**
  - Product Listings
  - Filtering & Sorting
  - Search Functionality
  - Category Navigation

- **Shopping Experience**
  - Shopping Cart
  - Wishlist
  - Product Reviews
  - Related Products

- **User Features**
  - User Registration
  - Profile Management
  - Order History
  - Address Book

## 🛠️ Tech Stack

- **React** - UI Library
- **Tailwind CSS** - Styling
- **Redux Toolkit** - State Management
- **React Router** - Routing
- **Axios** - HTTP Client
- **Stripe** - Payment Processing
- **React Query** - Data Fetching
- **Framer Motion** - Animations

## 🎨 UI Components

- **Layout Components**
  - Navigation Bar
  - Footer
  - Sidebar
  - Modal

- **Product Components**
  - Product Card
  - Product Grid
  - Product Details
  - Image Gallery

- **Cart Components**
  - Cart Item
  - Cart Summary
  - Checkout Form
  - Order Confirmation

## 🔒 Authentication

- JWT-based authentication
- Social login integration
- Password recovery
- Email verification

## 📱 Responsive Design

- Mobile-first approach
- Responsive layouts
- Touch-friendly interfaces
- Cross-browser compatibility

## 📦 Production Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details. 