import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-2 md:mb-0">
          <p>
            &copy; {new Date().getFullYear()} MovieHub. All rights reserved.
          </p>
        </div>
        <div className="flex space-x-4">
          <a href="/" className="hover:text-gray-400">
            Home
          </a>
          <a href="/genres" className="hover:text-gray-400">
            Genres
          </a>
          <a href="/popular" className="hover:text-gray-400">
            Popular
          </a>
          <a href="/new-releases" className="hover:text-gray-400">
            New Releases
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
