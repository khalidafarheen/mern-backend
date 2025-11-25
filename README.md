# Wanderlust - Travel Accommodation Platform 🌍

A full-stack web application for discovering and booking unique accommodations worldwide, built with Node.js, Express, and MongoDB.

![Wanderlust](https://img.shields.io/badge/Status-Active-success)
![Node.js](https://img.shields.io/badge/Node.js-v20.x-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)

## 🚀 Features

- **User Authentication**: Secure signup/login with Passport.js and session management
- **Property Listings**: Create, read, update, and delete accommodation listings
- **Advanced Search**: Filter properties by location, name, and price range
- **Reviews & Ratings**: Users can leave reviews and ratings for properties
- **Image Upload**: Cloudinary integration for property images
- **Interactive Maps**: Mapbox GL integration for location visualization
- **Responsive Design**: Mobile-friendly UI with Bootstrap 5
- **Category Filters**: Browse by trending, mountains, farms, arctic destinations
- **Owner Authorization**: Only listing owners can edit/delete their properties

## 🛠️ Tech Stack

**Frontend:**
- EJS (Embedded JavaScript Templates)
- Bootstrap 5
- Font Awesome Icons
- Mapbox GL JS

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- Passport.js (Authentication)
- Express Session
- Connect Flash

**Cloud Services:**
- MongoDB Atlas (Database)
- Cloudinary (Image Storage)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/wanderlust.git
cd wanderlust
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret
MAP_TOKEN=your_mapbox_token
PORT=8080
```

4. Start the server:
```bash
npm start
```

5. Visit `http://localhost:8080`

## 🎯 Usage

1. **Sign Up/Login** to access full features
2. **Browse Listings** on the main page with category filters
3. **Search** for properties by location, name, or price
4. **Create Listing** by clicking "Add New Listing" (requires login)
5. **View Details** including map location and reviews
6. **Leave Reviews** on properties you've visited
7. **Manage Your Listings** - edit or delete your own properties

## 📸 Screenshots

### Landing Page
Modern, animated hero section with gradient background

### Listings Page
Grid layout with search functionality and category filters

### Property Details
Detailed view with map, reviews, and booking information

## 🔐 Security Features

- Password hashing with bcrypt
- Session-based authentication
- CSRF protection
- Input validation and sanitization
- Owner-based authorization

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Landing page |
| GET | `/listings` | View all listings |
| GET | `/listings/search` | Search listings |
| GET | `/listings/new` | New listing form |
| POST | `/listings` | Create listing |
| GET | `/listings/:id` | View single listing |
| PUT | `/listings/:id` | Update listing |
| DELETE | `/listings/:id` | Delete listing |
| POST | `/listings/:id/reviews` | Add review |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Shaik Khalida Farheen**
- GitHub: [@khalidafarheen](https://github.com/khalidafarheen)
- LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- Inspired by Airbnb
- Icons from Font Awesome
- Maps powered by Mapbox
- Images hosted on Cloudinary

---

⭐ Star this repo if you find it helpful!
