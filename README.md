# Rexplore Technologies - Enterprise Digital Solutions (React Port)

A high-performance, premium company website for Rexplore Technologies, now migrated to React for enhanced component architecture and state management. Built with a focus on modern aesthetics (Glassmorphism), real-time data synchronization, and a comprehensive client-to-admin workflow powered by Firebase.

## 🚀 Key Implementations

### 1. Modern React Architecture
*   **Vite Build Tool**: Ultra-fast development and build process.
*   **React Router**: Seamless Single Page Application (SPA) navigation.
*   **Context API**: Global state management for Firebase Authentication and user roles.
*   **Component-Based UI**: Reusable components for Navbar, Footer, Tracking Dock, and Modals.

### 2. Unified Client Portal & Tracking
*   **Tracking Dock (Bottom-Left)**: A floating interactive dock providing quick access to tracking tools.
*   **Unique Tracking IDs**: Every project brief or demo request generates a unique Firestore document ID for real-time status monitoring.
*   **Web Tracking Modal**: Integrated roadmap visualization showing project progress (Received → Reviewed → In-Progress → Finalizing → Live).
*   **Telegram Bot Integration**: Direct link to the `@rexplorebot` for mobile-native tracking and support.

### 3. Intelligent Project Briefing System
*   **Dynamic Forms**: React-controlled form components that capture project goals, budget ranges (**INR 1,500 - INR 20,000**), timelines, and contact details including validated **Mobile Numbers**.
*   **Firebase Integration**: Secure Google Sign-In and real-time Firestore updates.

### 4. Robust Admin Ecosystem
*   **Admin Dashboard**: A secure, real-time command center for managing projects, approving testimonials, and exporting data.
*   **Excel Reporting**: One-click generation of professional project reports in `.xlsx` format using **XLSX (SheetJS)**.

## 📁 Project Architecture

```
Rexplore-technologies/
├── src/
│   ├── components/       # Reusable UI elements (Navbar, Footer, etc.)
│   ├── context/          # Global state (FirebaseContext)
│   ├── pages/            # Page components (Home, BookADemo, Admin, etc.)
│   ├── assets/           # Local styling and assets
│   ├── App.jsx           # Main routing and layout
│   └── main.jsx          # Entry point
├── public/               # Static assets (logo, illustrations)
├── index.html            # React root template
├── vite.config.js        # Vite configuration
└── package.json          # Dependencies and scripts
```

## ⚙️ Technology Stack

- **Frontend**: React 18, React Router 6, Vite, Vanilla CSS
- **Backend**: Firebase (Firestore, Auth)
- **Email**: EmailJS
- **Reporting**: XLSX (SheetJS)
- **Icons**: Font Awesome 6

## 🛠️ Setup & Run

1.  **Clone the repository**
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Run locally**:
    ```bash
    npm run dev
    ```
4.  **Build for production**:
    ```bash
    npm run build
    ```

Built with ❤️ for Rexplore Technologies | Innovative Tech Solutions
