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

import NotFound from './pages/NotFound';

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
              <Route path="*" element={<NotFound />} />
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
