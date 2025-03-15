import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text tracking-widest transform hover:scale-110 transition-all duration-300 ease-in-out">
          KYN
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="sm:hidden text-white focus:outline-none transform hover:scale-110 transition-all duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex space-x-4">
          <Link
            to="/"
            className="px-4 py-2 text-sm font-medium bg-gray-800 text-white rounded-xl border-2 border-transparent hover:bg-gray-700 hover:border-gray-300 hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            Home
          </Link>
          <Link
            to="/review"
            className="px-4 py-2 text-sm font-medium bg-gray-800 text-white rounded-xl border-2 border-transparent hover:bg-gray-700 hover:border-gray-300 hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            Reviews
          </Link>
          <Link
            to="/submit"
            className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-xl border-2 border-transparent hover:bg-blue-500 hover:border-blue-300 hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            Add Review
          </Link>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="sm:hidden absolute top-full left-0 w-full bg-gray-900 shadow-lg flex flex-col items-center py-6 space-y-4">
          <Link
            to="/"
            className="px-4 py-2 text-sm font-medium bg-gray-800 text-white rounded-xl border-2 border-transparent hover:bg-gray-700 hover:border-gray-300 hover:scale-105 hover:shadow-lg transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/review"
            className="px-4 py-2 text-sm font-medium bg-gray-800 text-white rounded-xl border-2 border-transparent hover:bg-gray-700 hover:border-gray-300 hover:scale-105 hover:shadow-lg transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            Reviews
          </Link>
          <Link
            to="/submit"
            className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-xl border-2 border-transparent hover:bg-blue-500 hover:border-blue-300 hover:scale-105 hover:shadow-lg transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            Add Review
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
