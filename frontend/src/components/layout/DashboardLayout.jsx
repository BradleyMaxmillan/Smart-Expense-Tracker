import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Sidebar from '../components/layout/Sidebar'; // Optional if you have a sidebar

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar (optional) */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 p-4">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
