# Node.js MongoDB EJS Application

A full-stack web application built with Node.js, Express, MongoDB, and EJS templating with Bootstrap 5 for styling.

## Features

- **Backend**: Node.js with Express.js framework
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: EJS templating engine with Bootstrap 5
- **Authentication**: JWT-based authentication with HTTP-only cookies and API endpoints
- **Responsive Design**: Mobile-first responsive design with Bootstrap
- **Error Handling**: Comprehensive error handling and 404 pages

## Project Structure

```
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── config/
│   └── database.js          # MongoDB connection configuration
├── models/
│   └── User.js              # User model with Mongoose
├── routes/
│   ├── index.js             # Main routes (home, about, contact)
│   └── users.js             # User routes (auth, profile)
├── views/
│   ├── auth/
│   │   ├── login.ejs        # Login page
│   │   └── register.ejs     # Registration page
│   ├── users/
│   │   └── profile.ejs      # User profile page
│   ├── partials/
│   │   ├── header.ejs       # Header partial
│   │   └── footer.ejs       # Footer partial
│   ├── layout.ejs           # Main layout template
│   ├── index.ejs            # Home page
│   ├── about.ejs            # About page
│   ├── contact.ejs          # Contact page
│   ├── 404.ejs              # 404 error page
│   └── error.ejs            # Server error page
├── public/
│   ├── css/
│   │   └── style.css        # Custom styles
│   └── js/
│       ├── main.js          # Client-side JavaScript
│       └── auth.js          # JWT authentication helpers
├── .env                     # Environment variables
├── .gitignore              # Git ignore file
├── package.json            # Project dependencies
└── server.js               # Main server file
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nodejs-mongodb-ejs-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory and configure:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/your_database_name
   SESSION_SECRET=your_session_secret_key_here
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   # On macOS with Homebrew
   brew services start mongodb-community
   
   # On Ubuntu/Debian
   sudo systemctl start mongod
   
   # Or run directly
   mongod
   ```

5. **Run the application**
   ```bash
   # Development mode with nodemon
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Access the application**
   
   Open your browser and navigate to `http://localhost:3000`

## Usage

### Authentication
- Register a new account at `/users/register`
- Login with existing credentials at `/users/login`
- Access your profile at `/users/profile` (requires login)
- Logout using the logout button in the navigation

### Pages
- **Home** (`/`): Landing page with application overview
- **About** (`/about`): Information about the application
- **Contact** (`/contact`): Contact form and information
- **Profile** (`/users/profile`): User profile page (protected route)

## Development

### Adding New Routes
1. Create route handlers in the appropriate file in the `routes/` directory
2. Create corresponding EJS templates in the `views/` directory
3. Update navigation in `views/layout.ejs` if needed

### Database Models
- User model is defined in `models/User.js`
- Add new models in the `models/` directory following the same pattern

### Styling
- Custom CSS is in `public/css/style.css`
- Bootstrap 5 is loaded via CDN in the layout template
- Add custom JavaScript in `public/js/main.js`

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/your_database_name |
| `JWT_SECRET` | Secret key for JWT token signing | Required |
| `JWT_EXPIRES_IN` | JWT token expiration time | 7d |

## Dependencies

### Production Dependencies
- **express**: Web framework for Node.js
- **mongoose**: MongoDB object modeling
- **ejs**: Embedded JavaScript templating
- **dotenv**: Environment variable loader
- **express-session**: Session middleware
- **bcryptjs**: Password hashing
- **method-override**: HTTP method override

### Development Dependencies
- **nodemon**: Development server with auto-restart

## License

MIT License - see LICENSE file for details

## JWT Authentication Features

### Traditional Form Authentication
- Login and registration forms with server-side rendering
- HTTP-only cookies for secure token storage
- Automatic redirects after authentication
- CSRF protection with form-based submissions

### API Authentication Endpoints
- `POST /users/api/register` - Register new user
- `POST /users/api/login` - Authenticate user
- `GET /users/api/me` - Get current user info
- Returns JSON responses with JWT tokens

### Client-Side Authentication
- JavaScript API client (`auth.js`) for SPA-style authentication
- Token storage in localStorage for API requests
- Automatic token refresh and validation
- Toggle between form and API modes on login/register pages

### Security Features
- JWT tokens with configurable expiration
- HTTP-only cookies for web authentication
- Bearer token support for API requests
- Automatic token cleanup on logout
- Password hashing with bcrypt
- Protected routes with middleware

### Usage Examples

#### API Authentication (JavaScript)
```javascript
// Register user
const result = await authAPI.register({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
});

// Login user
const result = await authAPI.login({
    email: 'john@example.com',
    password: 'password123'
});

// Get current user
const user = await authAPI.getCurrentUser();

// Make authenticated request
const response = await authAPI.makeAuthenticatedRequest('/api/protected-route');
```

#### cURL Examples
```bash
# Register
curl -X POST http://localhost:3000/users/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3000/users/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get user info (replace TOKEN with actual JWT)
curl -X GET http://localhost:3000/users/api/me \
  -H "Authorization: Bearer TOKEN"
```
## Frontend SPA Structure

### Single Page Application (SPA)
The application now includes a complete frontend SPA served from the `/public` directory:

```
public/
├── index.html              # Main SPA entry point
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker for offline support
├── css/
│   ├── style.css          # Original styles
│   └── frontend.css       # SPA-specific styles
├── js/
│   ├── app.js             # Main application logic
│   ├── auth.js            # JWT authentication client
│   ├── components.js      # Page components/templates
│   ├── router.js          # Client-side routing
│   └── utils.js           # Utility functions
└── pages/
    ├── home.html          # Static page templates
    ├── about.html         # (for reference/backup)
    └── contact.html
```

### Frontend Features

**🎯 Single Page Application**
- Client-side routing with history API
- Dynamic page loading without refreshes
- Smooth page transitions and animations
- Progressive Web App (PWA) support

**🎨 Modern UI/UX**
- Bootstrap 5 with custom styling
- Bootstrap Icons for consistent iconography
- Responsive design for all devices
- Loading states and error handling
- Toast notifications for user feedback

**🔐 Authentication Integration**
- JWT token management
- Automatic auth status checking
- Protected routes and navigation
- Seamless login/logout experience

**⚡ Performance Features**
- Service worker for offline support
- Resource caching for faster loading
- Lazy loading and code splitting ready
- Optimized asset delivery

### Usage

**Access the Frontend:**
- Traditional server-rendered pages: `http://localhost:3000/`
- Frontend SPA: `http://localhost:3000/index.html` or any route (fallback to SPA)

**Routing:**
- `/` - Home page with hero section
- `/about` - About page with tech stack info
- `/contact` - Contact form and information
- `/login` - Authentication login form
- `/register` - User registration form
- `/dashboard` - Protected user dashboard
- `/profile` - User profile management

**Development:**
The frontend SPA works independently and can be developed separately from the backend. All API calls are made to the same server endpoints, providing flexibility for frontend development.

**API Integration:**
- Seamless integration with existing JWT API endpoints
- Automatic token management and refresh
- Error handling and user feedback
- Form validation and submission