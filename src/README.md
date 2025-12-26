# Maji Freshi Admin Dashboard

A comprehensive React admin dashboard for managing water delivery operations.

## 🚀 Features

### Core Functionality
- **Dashboard Overview** - Real-time stats, charts, and recent orders
- **Order Management** - Track, assign drivers, and update order status
- **Product Management** - Full CRUD operations for product catalog
- **Customer Management** - View customer data and purchase history
- **Driver Management** - Manage delivery fleet and track availability
- **Authentication** - JWT-based secure login system

### Technical Stack
- **React 18** with TypeScript
- **React Router v6** for navigation
- **Zustand** for state management
- **Axios** for API calls with JWT interceptors
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **Lucide React** for icons

## 📁 Project Structure

```
src/
├── api/                    # API Integration Layer
│   ├── client.ts           # Axios instance with interceptors
│   ├── auth.ts             # Authentication endpoints
│   ├── products.ts         # Product CRUD operations
│   ├── orders.ts           # Order management
│   └── users.ts            # User & driver management
│
├── components/             # UI Components
│   ├── ui/                 # Reusable UI primitives
│   ├── layout/             # Layout components
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── Layout.tsx
│   └── ProtectedRoute.tsx  # Route authentication wrapper
│
├── pages/                  # Page Views
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── Products/
│   ├── Orders/
│   ├── Customers.tsx
│   ├── Drivers.tsx
│   └── Settings.tsx
│
├── store/                  # Zustand State Management
│   ├── useAuthStore.ts     # Authentication state
│   └── useUIStore.ts       # UI preferences
│
├── types/                  # TypeScript Definitions
│   ├── auth.ts
│   ├── product.ts
│   ├── order.ts
│   └── user.ts
│
└── hooks/                  # Custom React Hooks
    └── useAuth.ts
```

## 🔐 Authentication

The dashboard uses JWT token-based authentication with automatic token refresh.

### Demo Credentials
- **Username:** `admin` (or any username)
- **Password:** any password (mock authentication accepts all)

### How It Works
1. Login credentials are sent to `/api/v1/auth/token/`
2. Access and refresh tokens are stored in localStorage
3. Access token is automatically added to all API requests
4. Token auto-refresh on 401 errors
5. Logout clears tokens and redirects to login

## 📊 Dashboard Features

### Statistics Cards
- Total Revenue with today's revenue
- Total Orders count
- Active Drivers count
- Low Stock Alerts

### Charts
- Weekly sales trend using Recharts
- Revenue visualization over 7 days

### Recent Orders
- Quick view of latest 5 orders
- Status badges for quick identification

## 🛍️ Product Management

### Features
- **List View** - Sortable, filterable product table
- **Add Product** - Create new products with validation
- **Edit Product** - Update existing product details
- **Delete Product** - Remove products from catalog

### Product Fields
- Name, Description, SKU
- Category (Bottled, Gallon, Sparkling, Flavored, Accessories)
- Price, Stock Quantity
- Unit Type (Bottle, Gallon, Liter, Pack)
- Status (Active, Inactive, Out of Stock)
- Product Image URL

### Filters
- Search by name or SKU
- Filter by category
- Filter by status

## 📦 Order Management

### Order List Features
- Filter by status (Pending, Confirmed, Delivering, etc.)
- Real-time order stats
- Quick view of order details

### Order Detail View
- Complete order information
- Customer contact details
- Delivery address
- Order items with pricing
- Status update dropdown
- Driver assignment system
- Order notes

### Order Statuses
1. **Pending** - New order received
2. **Confirmed** - Order confirmed by admin
3. **Preparing** - Order being prepared
4. **Assigned** - Driver assigned
5. **Delivering** - Out for delivery
6. **Delivered** - Successfully delivered
7. **Cancelled** - Order cancelled

## 👥 Customer & Driver Management

### Customers
- View all customers
- Total orders and revenue per customer
- Contact information
- Member since date
- Last order date

### Drivers
- Driver fleet overview
- Vehicle information
- Availability status
- Completed deliveries count
- Rating system
- Contact details

## ⚙️ Settings

Manage dashboard preferences:
- General settings
- Notification preferences
- Security & password
- Appearance & theme

## 🎨 Design System

### Colors
- **Primary:** Sky Blue (#0ea5e9) - Fresh, water-themed
- **Secondary:** Slate (#64748b) - Professional, neutral
- **Accent:** Rose (#f43f5e) - Alerts, Actions
- **Success:** Emerald - Positive actions
- **Warning:** Amber - Caution states

### Typography
Uses system fonts with automatic scaling and proper hierarchy.

## 🔄 Mock Data

The dashboard currently uses mock data for demonstration. All API calls are stubbed with realistic data:

- Mock authentication (accepts any credentials)
- Sample products with images
- Sample orders with different statuses
- Sample customers and drivers
- Mock dashboard statistics

### Connecting to Real Backend

To connect to a real backend:

1. Update `API_BASE_URL` in `/api/client.ts`
2. Replace mock implementations in API files with real axios calls
3. Update data types if needed
4. Configure CORS on your backend

Example:
```typescript
// In /api/products.ts
export const productsApi = {
  getAll: async (filters?: ProductFilters): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>('/products/', { params: filters });
    return response.data;
  },
  // ... other methods
};
```

## 🚦 Routing

Protected routes require authentication:
- `/` - Dashboard
- `/orders` - Order list
- `/orders/:id` - Order detail
- `/products` - Product list
- `/products/create` - Add product
- `/products/edit/:id` - Edit product
- `/customers` - Customer list
- `/drivers` - Driver list
- `/settings` - Settings

Public routes:
- `/login` - Login page

## 🔒 Security Features

- JWT token storage
- Automatic token refresh
- Protected route wrapper
- Role-based access (Admin only)
- Secure logout
- Password input masking

## 📱 Responsive Design

The dashboard is fully responsive:
- Mobile-friendly sidebar (collapsible)
- Responsive grid layouts
- Touch-friendly buttons and controls
- Optimized tables for mobile viewing

## 🎯 Best Practices

- TypeScript for type safety
- Component-based architecture
- Separation of concerns (API, UI, State)
- Reusable UI components
- Custom hooks for logic reuse
- Proper error handling
- Loading states
- User feedback (success/error messages)

## 🚀 Getting Started

The dashboard is ready to use! Just log in with any username/password to explore all features.

## 📝 Notes

- This is a frontend-only implementation with mock data
- For production use, connect to a real backend API
- Images are loaded from Unsplash for demonstration
- All data is simulated and resets on page refresh
- Token persistence uses localStorage

## 🔮 Future Enhancements

Potential features for production:
- WebSocket for real-time updates
- Advanced filtering and search
- Export data (CSV, PDF)
- Analytics and reporting
- Multi-language support
- Email notifications
- Mobile app integration
- Map integration for delivery tracking
