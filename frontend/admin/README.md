# LoveE-Commerce Admin Dashboard

The admin dashboard for LoveE-Commerce, built with Next.js and TypeScript.

## 🏗️ Project Structure

```
admin/
├── app/              # Next.js app directory
├── components/       # Reusable components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── public/          # Static assets
├── styles/          # Global styles
└── types/           # TypeScript type definitions
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
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
```

## 📚 Features

- **Dashboard Overview**
  - Sales Analytics
  - Order Statistics
  - Revenue Reports
  - Customer Insights

- **Product Management**
  - Add/Edit Products
  - Inventory Management
  - Category Management
  - Bulk Operations

- **Order Management**
  - Order Processing
  - Status Updates
  - Shipping Management
  - Returns Handling

- **User Management**
  - Customer Accounts
  - Admin Users
  - Role Management
  - Permissions

## 🛠️ Tech Stack

- **Next.js** - React Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Redux Toolkit** - State Management
- **React Query** - Data Fetching
- **Chart.js** - Data Visualization
- **React Hook Form** - Form Handling
- **Zod** - Form Validation

## 🎨 UI Components

- **Layout Components**
  - Sidebar Navigation
  - Header
  - Footer
  - Breadcrumbs

- **Data Display**
  - Tables
  - Cards
  - Charts
  - Statistics

- **Form Components**
  - Input Fields
  - Select Dropdowns
  - Date Pickers
  - File Uploads

## 🔒 Authentication

- JWT-based authentication
- Role-based access control
- Protected routes
- Session management

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
