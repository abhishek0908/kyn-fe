import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text tracking-widest">
          KYN
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="sm:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex space-x-6">
          <Link to="/" className="px-5 py-2 text-lg font-medium bg-gray-800 text-white rounded-lg hover:bg-gray-700 hover:scale-105 transition-all shadow-lg">
            Home
          </Link>
          <Link to="/review" className="px-5 py-2 text-lg font-medium bg-gray-800 text-white rounded-lg hover:bg-gray-700 hover:scale-105 transition-all shadow-lg">
            Reviews
          </Link>
          <Link
            to="/submit"
            className="px-6 py-2 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-500 hover:scale-105 transition-all shadow-lg"
          >
            Add Review
          </Link>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="sm:hidden absolute top-full left-0 w-full bg-gray-900 shadow-lg flex flex-col items-center py-6 space-y-4">
          <Link to="/" className="px-5 py-2 text-lg font-medium bg-gray-800 text-white rounded-lg hover:bg-gray-700 hover:scale-105 transition-all shadow-lg" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/review" className="px-5 py-2 text-lg font-medium bg-gray-800 text-white rounded-lg hover:bg-gray-700 hover:scale-105 transition-all shadow-lg" onClick={() => setIsOpen(false)}>Reviews</Link>
          <Link
            to="/submit"
            className="px-6 py-2 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-500 hover:scale-105 transition-all shadow-lg"
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