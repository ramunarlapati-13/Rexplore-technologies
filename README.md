# Rexplore Technologies - Company Website

A modern, premium company website built with cutting-edge design and interactive features, now powered by a real-time Firebase backend.

## 🚀 Features

### Design & Aesthetics
- ✨ **Modern UI/UX**: Glassmorphism, gradients, and smooth animations.
- 🎨 **Premium Color Palette**: Electric blue to purple gradients with carefully chosen colors.
- 🌙 **Dark Mode**: Sleek dark theme with vibrant accents.
- 📱 **Fully Responsive**: Mobile-first design that works on all devices.
- ⚡ **Smooth Animations**: Scroll-triggered animations and micro-interactions.

### Dynamic Backend (Firebase)
- 🔥 **Real-time Firestore**: Powering testimonials, contact forms, and demo requests.
- 🔐 **Secure Authentication**: Admin access protected by Google Sign-In.
- 📝 **Testimonial Management**: Public feedback form with admin approval workflow.
- 🚀 **Automated Workflows**: Integrated email notifications for admins and auto-replies for clients.

### Sections
1. **Hero Section**: Eye-catching landing with animated statistics and primary CTAs.
2. **About Us**: Company mission, vision, and core values.
3. **Services**: Six comprehensive service offerings.
4. **Portfolio**: Featured projects showcase.
5. **Team**: Meet the professional team members.
6. **Testimonials**: Real-time client success stories loaded from Firestore.
7. **Book a Demo**: Dedicated portal for scheduling tailored product demonstrations.
8. **Admin Dashboard**: Secure panel for managing site data and client requests.

## 📁 Project Structure

```
Rexplore-technologies/
├── index.html            # Main Landing Page
├── book-a-demo.html     # Demo Booking Portal
├── admin.html           # Secure Admin Dashboard
├── styles.css           # Global Design System & Components
├── script.js            # Main Website Logic & Firebase Integration
├── assets/              # Premium Media Assets
├── firebase.json        # Firebase Hosting & Project Config
├── firestore.rules      # Security Rules for Database
├── .firebaserc          # Firebase Project Alias
└── README.md            # Project Documentation
```

## ⚙️ Backend & Integration

### 1. Firebase Suite
- **Firestore**: Used as the primary database for `testimonials` and `demo_requests`.
- **Authentication**: Google Sign-In implemented for the Admin Panel.
- **Security Rules**: Public can write to forms, but only authorized admins (e.g., `ramunarlapati@gmail.com`) can read or manage data.

### 2. External Services
- **FormSubmit.co**: Handles background email alerts to admins when new demos are requested.
- **EmailJS**: Provides automated, professional auto-replies to clients upon form submission.
- **Google Fonts**: Uses 'Inter' and 'Outfit' for a premium typographic feel.

## 🛠️ Admin Dashboard

The admin panel (`admin.html`) provides authorized users with:
- **Real-time Monitoring**: Instant updates of new requests.
- **Approval Workflow**: Approve or hide testimonials before they go live.
- **Request Tracking**: Manage the status of demo requests (Pending, Contacted, Completed).
- **Data Management**: Securely delete or update records directly from the UI.

## 🚀 Deployment

### Firebase Hosting (Recommended)
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and Select Project
firebase login
firebase use rexploretech

# Deploy Rules & Hosting
firebase deploy
```

### Vercel / Netlify
The project is optimized for static hosting platforms. Ensure your Firebase config is correctly set in `script.js` or provided via a serverless `/api/config` endpoint.

## 🎨 Customization Guide

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #ec4899;
}
```

### Firebase Config
Update the `firebaseConfig` object in `script.js`, `admin.html`, and `book-a-demo.html` with your actual project credentials from the Firebase Console.

## 📄 License

This project is created for Rexplore Technologies. All rights reserved.

## 🤝 Support

For questions or support, please contact:
- Email: info@rexplore.tech
- Admin: ramunarlapati27@gmail.com

---

Built with ❤️ by Rexplore Technologies
