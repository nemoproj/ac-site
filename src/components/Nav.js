import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToConnectionGuide = () => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollToGuide: true } });
    } else {
      document.getElementById('connection-guide')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMobileMenuOpen(false);
  };

  // Add effect to handle scroll after navigation
  React.useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollToGuide) {
      // Small delay to ensure the content is rendered
      setTimeout(() => {
        document.getElementById('connection-guide')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Clean up the state
        window.history.replaceState({}, document.title);
      }, 100);
    }
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="nav-wrapper">
        <div className="nav-container">
          <div className="flex items-center gap-8">
            <Link to="/">
              <img src="/ac-site/logo2.png" alt="alphacorp" className="nav-logo" loading="eager" />
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className="nav-link">홈</Link>
              <Link to="/team" className="nav-link">팀 소개</Link>
              <Link to="/patchnotes" className="nav-link">패치노트</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="join-button hidden md:block" onClick={scrollToConnectionGuide}>
              서버 참여하기 →
            </button>
            <button className="hamburger md:hidden" onClick={toggleMobileMenu}>
              <div className={`hamburger-lines ${isMobileMenuOpen ? 'active' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <Link to="/" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>홈</Link>
        <Link to="/team" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>팀 소개</Link>
        <Link to="/patchnotes" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>패치노트</Link>
        <button className="mobile-join-button" onClick={scrollToConnectionGuide}>
          서버 참여하기 →
        </button>
      </div>

      <div
        className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}

export default Nav;