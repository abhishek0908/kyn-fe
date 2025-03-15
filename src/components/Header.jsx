import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full backdrop-blur-lg bg-gray-900/80 text-white py-4 border-b border-gray-700 shadow-lg z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl sm:text-3xl font-bold tracking-wide bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text"
        >
          KYN
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden focus:outline-none transition-transform duration-300"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Navigation - Desktop */}
        <nav className="hidden sm:flex space-x-6">
          <Link
            to="/"
            className="px-4 py-2 text-lg font-medium bg-gray-700/60 rounded-lg hover:bg-gray-600 transition-all duration-300"
          >
            Home
          </Link>
          <Link
            to="/review"
            className="px-4 py-2 text-lg font-medium bg-gray-700/60 rounded-lg hover:bg-gray-600 transition-all duration-300"
          >
            View Review
          </Link>
          <Link
            to="/submit"
            className="px-4 py-2 text-lg font-medium bg-blue-600 rounded-lg hover:bg-blue-500 transition-all duration-300"
          >
            Submit Review
          </Link>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <nav className="sm:hidden fixed inset-0 bg-gray-900/95 h-full flex flex-col justify-center items-center gap-6 pt-28 z-50">
          <button
            className="absolute top-6 right-6 text-white text-3xl"
            onClick={() => setMenuOpen(false)}
          >
            <X size={30} />
          </button>
          <Link
            to="/"
            className="text-lg font-semibold py-3 w-4/5 text-center bg-gray-800 hover:bg-gray-700 rounded-lg transition duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/review"
            className="text-lg font-semibold py-3 w-4/5 text-center bg-gray-800 hover:bg-gray-700 rounded-lg transition duration-300"
            onClick={() => setMenuOpen(false)}
          >
            View Review
          </Link>
          <Link
            to="/submit"
            className="text-lg font-semibold py-3 w-4/5 text-center bg-blue-700 hover:bg-blue-600 rounded-lg transition duration-300"
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
