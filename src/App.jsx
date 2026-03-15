import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FirebaseProvider } from './context/FirebaseContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TrackingDock from './components/TrackingDock';
import Home from './pages/Home';
import BookADemo from './pages/BookADemo';
import Profile from './pages/Profile';
import Admin from './pages/Admin';

function App() {
  return (
    <FirebaseProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/book-a-demo" element={<BookADemo />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
          <TrackingDock />
        </div>
      </Router>
    </FirebaseProvider>
  );
}

export default App;
