import React from 'react';
import { FaHome, FaPlus, FaChartPie, FaUser } from 'react-icons/fa';

const Footer = () => (
  <footer className="fixed bottom-0 w-full bg-white shadow-inner flex justify-around p-3">
    <FaHome className="text-gray-600 text-xl" />
    <FaPlus className="text-gray-600 text-xl" />
    <FaChartPie className="text-gray-600 text-xl" />
    <FaUser className="text-gray-600 text-xl" />
  </footer>
);

export default Footer;
