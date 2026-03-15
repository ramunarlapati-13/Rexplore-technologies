import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFirebase } from '../context/FirebaseContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loginWithGoogle } = useFirebase();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'auto';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  const navLinks = [
    { name: 'Home', path: '/', isHash: true, targetId: 'home' },
    { name: 'Services', path: '/', isHash: true, targetId: 'services' },
    { name: 'Our Work', path: '/', isHash: true, targetId: 'portfolio' },
    { name: 'Team', path: '/', isHash: true, targetId: 'team' },
    { name: 'Book a Project', path: '/book-a-demo' },
    { name: 'Contact', path: '/', isHash: true, targetId: 'contact' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="container nav-container">
        <div className="logo">
          <img src="/assets/logo.png" alt="Rexplore Technologies Logo" />
          <span>REXPLORE</span>
        </div>
        
        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`} id="navMenu">
          {navLinks.map((link) => (
            <li key={link.name}>
              {link.isHash && location.pathname === '/' ? (
                <a 
                  href={`#${link.targetId}`} 
                  className="nav-link" 
                  onClick={closeMobileMenu}
                >
                  {link.name}
                </a>
              ) : (
                <Link 
                  to={link.path + (link.targetId ? `#${link.targetId}` : '')} 
                  className="nav-link"
                  onClick={closeMobileMenu}
                >
                  {link.name}
                </Link>
              )}
            </li>
          ))}
          
          <li className="auth-nav-item">
            {user ? (
              <Link to="/profile" className="nav-link profile-link" onClick={closeMobileMenu}>
                {user.displayName.split(' ')[0]}'s Profile
              </Link>
            ) : (
              <button onClick={loginWithGoogle} className="btn btn-secondary auth-btn">
                Log In
              </button>
            )}
          </li>
        </ul>

        <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
