import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-netflix-black' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-12 py-4">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-netflix-red text-2xl md:text-3xl font-bold">
            ELITE
          </span>
          <span className="text-white text-xl md:text-2xl font-light">CINEMAS</span>
        </Link>
        <nav className="flex items-center space-x-4 md:space-x-6">
          <Link
            to="/"
            className="text-white hover:text-gray-300 transition-colors text-sm md:text-base"
          >
            Home
          </Link>
          <Link
            to="/shows"
            className="text-white hover:text-gray-300 transition-colors text-sm md:text-base"
          >
            Shows
          </Link>
          <Link
            to="/new-popular"
            className="text-white hover:text-gray-300 transition-colors text-sm md:text-base"
          >
            New & Popular
          </Link>
          <Link
            to="/movies"
            className="text-white hover:text-gray-300 transition-colors text-sm md:text-base"
          >
            Movies
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
