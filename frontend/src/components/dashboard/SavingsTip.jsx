import React from 'react';
import { FaLightbulb } from 'react-icons/fa';

const SavingsTip = () => (
  <div className="bg-white rounded-lg shadow-md p-4 mt-4 flex items-start space-x-4">
    <FaLightbulb className="text-yellow-400 text-2xl mt-1" />
    <p>Set up automated transfers to your savings account each payday to build your nest egg effortlessly.</p>
  </div>
);

export default SavingsTip;
