# Raxplore Technologies - Company Website

A modern, premium company website built with cutting-edge design and interactive features.

## 🚀 Features

### Design & Aesthetics
- ✨ **Modern UI/UX**: Glassmorphism, gradients, and smooth animations
- 🎨 **Premium Color Palette**: Electric blue to purple gradients with carefully chosen colors
- 🌙 **Dark Mode**: Sleek dark theme with vibrant accents
- 📱 **Fully Responsive**: Mobile-first design that works on all devices
- ⚡ **Smooth Animations**: Scroll-triggered animations and micro-interactions

### Sections
1. **Hero Section**: Eye-catching landing with animated statistics
2. **About Us**: Company mission, vision, and core values
3. **Services**: Six comprehensive service offerings
4. **Portfolio**: Featured projects showcase
5. **Team**: Meet the professional team members
6. **Testimonials**: Client success stories
7. **Contact**: Interactive contact form and company information
8. **Footer**: Newsletter signup and quick links

### Technical Features
- 🎯 **SEO Optimized**: Proper meta tags, semantic HTML, heading structure
- 🔄 **Interactive Elements**: Smooth scrolling, active navigation, hover effects
- 📊 **Animated Counters**: Number animations on scroll
- 📧 **Form Validation**: Client-side validation for contact and newsletter forms
- 🖱️ **Parallax Effects**: Subtle parallax scrolling on hero section
- ⚙️ **Performance Optimized**: Debounced scroll events, lazy loading support

## 📁 Project Structure

```
Raxplore-technologies/
├── index.html          # Main HTML file
├── styles.css          # Comprehensive CSS with design system
├── script.js           # Interactive JavaScript functionality
├── assets/             # Images and media
│   ├── logo.png        # Company logo
│   ├── hero-bg.png     # Hero background
│   ├── team-1.png      # Team member photos
│   ├── team-2.png
│   ├── team-3.png
│   ├── project-webdev.png    # Portfolio images
│   └── project-mobile.png
└── README.md           # This file
```

## 🚀 Getting Started

### Option 1: Open Directly
Simply open `index.html` in your web browser:
```bash
# Open in default browser (Windows)
start index.html

# Or navigate to the file and double-click it
```

### Option 2: Local Development Server
For the best experience, use a local development server:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Then visit: http://localhost:8000
```

**Using Node.js (http-server):**
```bash
# Install http-server globally (one time)
npm install -g http-server

# Run server
http-server

# Then visit: http://localhost:8080
```

**Using VS Code Live Server:**
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 🎨 Customization Guide

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #ec4899;
    /* ... more colors */
}
```

### Content
- **Company Info**: Edit text in `index.html`
- **Team Members**: Replace images in `assets/` and update names/roles
- **Services**: Modify service cards in the Services section
- **Portfolio**: Update project showcases with your actual work

### Fonts
Currently using Google Fonts (Inter & Outfit). To change:
1. Update the Google Fonts link in `index.html`
2. Update font variables in `styles.css`

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## 🔧 Backend Integration

### Contact Form
The contact form currently uses a simulated submission. To integrate with a backend:

1. **Replace the simulation in `script.js`** (around line 165):
```javascript
const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
});
```

2. **Popular backend options:**
   - FormSpree
   - EmailJS
   - Custom Node.js/PHP backend
   - Firebase Functions
   - Netlify Forms

### Newsletter Subscription
Similar to the contact form, replace the simulation with your email service provider API (Mailchimp, SendGrid, etc.)

## 🌐 Deployment

### GitHub Pages
```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit"

# Create repository on GitHub, then:
git remote add origin [your-repo-url]
git push -u origin main

# Enable GitHub Pages in repository settings
```

### Netlify
1. Drag and drop the project folder to Netlify
2. Or connect your GitHub repository
3. Deploy automatically

### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 📊 Performance Tips

1. **Optimize Images**: Compress images using tools like TinyPNG or ImageOptim
2. **Enable Caching**: Add cache headers in your server configuration
3. **Minify Files**: Use tools to minify CSS and JavaScript for production
4. **CDN**: Consider using a CDN for faster global delivery

## 🛠️ Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ IE11 (not supported)

## 📄 License

This project is created for Raxplore Technologies. All rights reserved.

## 🤝 Support

For questions or support, please contact:
- Email: info@raxplore.tech
- Website: [Coming Soon]

## 🎉 Credits

- **Design & Development**: Raxplore Technologies
- **Fonts**: Google Fonts (Inter, Outfit)
- **Icons**: Emoji icons (can be replaced with Font Awesome or custom SVGs)

---

Built with ❤️ by Raxplore Technologies
