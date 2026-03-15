# Rexplore Technologies - Enterprise Digital Solutions (React Port)

A high-performance, premium company website for Rexplore Technologies, now migrated to React for enhanced component architecture and state management. Built with a focus on modern aesthetics (Glassmorphism), real-time data synchronization, and a comprehensive client-to-admin workflow powered by Firebase.

## 🚀 Key Implementations (Latest Updates)

### 1. Immersive Error UX (New)
*   **Signature 404 Animation**: A dedicated full-screen "Look like you're lost" error page featuring a synchronized background animation and glassmorphic typography.
*   **Direct Pathing**: Integrated navigation recovery buttons to pull users back into the site flow effortlessly.

### 2. Standardized Global Ecosystem
*   **International Date Format**: All timestamps across Admin, Profile, and Tracking modules are unified to the **`dd-mm-yyyy`** format for maximum clarity.
*   **Technical Tracking IDs**: Refined Tracking ID displays (removed prefixes) for a cleaner, professional developer-centric look.

### 3. High-Impact Admin Dashboard
*   **Projects-First Logic**: The Admin command center now defaults to **'Demo Requests'**, streamlining the project management lifecycle.
*   **Excel Reporting**: One-click generation of professional project reports in `.xlsx` format using **XLSX (SheetJS)**.

### 4. Premium Design System
*   **Spotlight Cursor**: Dynamic, interactive cursor components powered by Framer Motion/Tailwind for a modern interactive feel.
*   **Premium Controls**: Integrated `btn-glow-primary` and `btn-outline-primary` classes for high-fidelity interactive elements.
*   **Mobile-First Alignment**: Comprehensive CSS overhaul to eliminate overflows and ensure perfect grid positioning on ultra-mobile screens (<400px).

### 5. Unified Client Portal & Tracking
*   **Tracking Dock (Bottom-Left)**: A floating interactive dock providing quick access to tracking tools.
*   **Roadmap Visualization**: Real-time progress tracking (Received → Reviewed → In-Progress → Finalizing → Live).
*   **Telegram Bot Integration**: Direct link to the `@rexplorebot` for mobile-native tracking and support.

## 📁 Project Architecture

```
Rexplore-technologies/
├── src/
│   ├── components/       # Reusable UI elements (Navbar, Footer, etc.)
│   │   └── ui/           # Advanced UI components (Spotlight Cursor)
│   ├── context/          # Global state (FirebaseContext)
│   ├── pages/            # Page components (Home, BookADemo, Admin, 404, etc.)
│   ├── assets/           # Local styling and assets
│   ├── App.jsx           # Main routing and layout
│   └── main.jsx          # Entry point
├── firebase.json         # Firebase hosting and routing config
├── firestore.rules       # Secure data access patterns
└── package.json          # Dependencies and scripts
```

## ⚙️ Technology Stack

- **Frontend**: React 18, React Router 6, Vite, Vanilla CSS
- **Backend**: Firebase 11 (Firestore, Auth)
- **Utility**: EmailJS, XLSX (SheetJS), Font Awesome 6, Framer Motion

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
