import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-gray-800 text-white px-6 py-3">
      <h1 className="text-lg font-semibold">Product Optimizer</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-blue-300">Home</Link>
        <Link to="/history" className="hover:text-blue-300">History</Link>
      </div>
    </nav>
  );
}

export default Navbar;
