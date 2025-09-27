# BBShop - Fresh Meat Store

A modern web application for a fresh meat store with admin panel for managing products, prices, and special offers.

## Project Structure

```
BBShop/
├── Backend/           # Node.js + Express + MongoDB backend
└── bathula-fresh-hub/ # React + TypeScript frontend
```

## Setup Instructions



### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Backend Setup

1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Copy `.env` file and update the values:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/bbshop
   JWT_SECRET=your_jwt_secret_key_here
   ADMIN_EMAIL=admin@bbshop.com
   ADMIN_PASSWORD=admin123
   ```

4. Setup the database and create admin user:
   ```bash
   npm run setup
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

The backend will be running on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd bathula-fresh-hub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be running on `http://localhost:5173`

## Usage

### Admin Access
- URL: `http://localhost:5173/admin/login`
- Default credentials:
  - Email: `admin@bbshop.com`
  - Password: `admin123`

### Features

#### Admin Panel
- **Dashboard**: Overview of products, special offers, and statistics
- **Product Management**: Add, edit, delete, and manage product availability
- **Special Offers**: Create and manage special offers with expiry dates
- **Price Management**: Update product prices
- **Category Management**: Organize products by categories (chicken, mutton, natukodi)

#### API Endpoints

**Authentication**
- `POST /api/auth/login` - Admin login
- `GET /api/auth/admin` - Get current admin info

**Products**
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)
- `PUT /api/products/:id/availability` - Toggle availability
- `PUT /api/products/:id/special-offer` - Set special offer
- `DELETE /api/products/:id/special-offer` - Remove special offer

**Admin Management**
- `GET /api/admin` - Get all admins (superadmin only)
- `POST /api/admin` - Create new admin (superadmin only)
- `PUT /api/admin/:id` - Update admin
- `DELETE /api/admin/:id` - Delete admin (superadmin only)

## Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **TanStack Query** - API state management
- **Tailwind CSS** - Styling
- **Radix UI** - UI components
- **Axios** - HTTP client

## Development

### Adding New Features

1. **Backend**: Add new routes in `Backend/routes/`
2. **Frontend**: Add new pages in `bathula-fresh-hub/src/pages/`
3. **API Integration**: Update `bathula-fresh-hub/src/lib/api.ts`

### Database Schema

**Product Model**
```javascript
{
  name: String,
  category: String, // 'chicken', 'mutton', 'natukodi', 'other'
  price: Number,
  description: String,
  image: String,
  isAvailable: Boolean,
  isSpecialOffer: Boolean,
  offerPrice: Number,
  offerValidUntil: Date
}
```

**Admin Model**
```javascript
{
  name: String,
  email: String,
  password: String, // hashed
  role: String, // 'admin', 'superadmin'
  isActive: Boolean
}
```

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Protected API routes
- Input validation
- CORS configuration

## Deployment

### Backend Deployment
1. Set up MongoDB Atlas or cloud MongoDB
2. Update environment variables
3. Deploy to services like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy to services like Netlify, Vercel, or GitHub Pages
3. Update API base URL in production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
