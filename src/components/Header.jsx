import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full backdrop-blur-lg bg-gray-900/80 text-white py-4 border-b border-gray-700 shadow-lg z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold tracking-wide bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
          KYN
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden focus:outline-none transition-transform duration-300"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation - Desktop */}
        <nav className="hidden sm:flex space-x-6">
          <Link
            to="/"
            className="px-5 py-2 text-lg font-medium bg-gray-700/60 rounded-lg hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
          >
            Home
          </Link>
          <Link
            to="/review"
            className="px-5 py-2 text-lg font-medium bg-gray-700/60 rounded-lg hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
          >
            View Review
          </Link>
          <Link
            to="/submit"
            className="px-5 py-2 text-lg font-medium bg-blue-600 rounded-lg hover:bg-blue-500 transition-all duration-300 transform hover:scale-105"
          >
            Submit Review
          </Link>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <nav className="sm:hidden fixed top-0 left-0 w-full h-full bg-gray-900/90 flex flex-col justify-center items-center gap-6">
          <button
            className="absolute top-5 right-6 text-white text-3xl"
            onClick={() => setMenuOpen(false)}
          >
            <X size={30} />
          </button>
          <Link
            to="/"
            className="text-2xl font-semibold py-3 px-8 rounded-lg bg-gray-700/60 hover:bg-gray-600 transition duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/review"
            className="text-2xl font-semibold py-3 px-8 rounded-lg bg-gray-700/60 hover:bg-gray-600 transition duration-300"
            onClick={() => setMenuOpen(false)}
          >
            View Review
          </Link>
          <Link
            to="/submit"
            className="text-2xl font-semibold py-3 px-8 rounded-lg bg-blue-600 hover:bg-blue-500 transition duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Submit Review
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
