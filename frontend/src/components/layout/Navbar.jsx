import React from "react";
import { User, Plus } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-white p-4 shadow-md rounded-b-2xl">
      <div className="flex space-x-6">
        <span className="text-gray-600 cursor-pointer">Dashboard</span>
        <span className="text-teal-600 font-bold cursor-pointer">Analytics</span>
        <span className="text-gray-600 cursor-pointer">Settings</span>
      </div>
      <div className="flex space-x-4 items-center">
        <Plus className="w-5 h-5 text-gray-600 cursor-pointer"/>
        <User className="w-6 h-6 text-gray-600"/>
      </div>
    </div>
  );
};

export default Navbar;
