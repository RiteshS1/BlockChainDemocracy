// src/components/Footer.tsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-5 text-center">
      <p>&copy; {new Date().getFullYear()} BlockChain Democracy. All rights reserved.</p>
      <p>
        <a href="/privacy-policy" className="text-blue-400">Privacy Policy</a> | 
        <a href="/terms-of-service" className="text-blue-400"> Terms of Service</a>
      </p>
    </footer>
  );
};

export default Footer;
