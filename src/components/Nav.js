import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Nav() {
  const location = useLocation();

  const scrollToConnectionGuide = () => {
    if (location.pathname !== '/') {
      window.location.href = '/#connection-guide';
    } else {
      document.getElementById('connection-guide')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <nav className="fixed-nav">
      <div className="max-w-6xl mx-auto px-4 w-full flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link to="/">
            <img src="/logo2.png" alt="alphacorp" className="nav-logo" loading="eager" />
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="nav-link">홈</Link>
            <Link to="/team" className="nav-link">팀 소개</Link>
            <Link to="/patchnotes" className="nav-link">패치노트</Link>
          </div>
        </div>
        <button className="join-button" onClick={scrollToConnectionGuide}>
          서버 참여하기 →
        </button>
      </div>
    </nav>
  );
}

export default Nav;