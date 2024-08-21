import React, { useState } from 'react';
import diflenLogo from '../assets/DIFLEN LOGO.svg'

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white dark:bg-black text-black shadow-lg">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div>
          <img src={diflenLogo} alt="Diflen Logo" className="h-10" />
        </div>

        {/* Menu para dispositivos maiores */}
        <div className="hidden md:flex space-x-8">
          <a href="#" className="dark:text-white hover:text-slate-400 transition duration-300">Home</a>
          <a href="#" className="dark:text-white hover:text-slate-400 transition duration-300">Salas</a>
        </div>

        {/* Menu hamburguer para dispositivos móveis */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="relative z-10 block dark:text-white text-black focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Menu dropdown para dispositivos móveis */}
      <div className={`fixed inset-0 bg-black bg-opacity-80 transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className="flex justify-end p-6">
          <button onClick={toggleMenu} className="text-white text-3xl focus:outline-none">
            &times;
          </button>
        </div>
        <div className="flex flex-col items-center space-y-6 mt-10">
          <a href="#" className="text-white text-xl hover:text-slate-400 transition duration-300">Home</a>
          <a href="#" className="text-white text-xl hover:text-slate-400 transition duration-300">Salas</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
