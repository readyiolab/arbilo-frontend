import React, { useState, useEffect } from 'react';
import { UserCircleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Transition } from '@headlessui/react';
import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLoginClick = () => {
    navigate('/login');
    setIsDrawerOpen(false);
  };

  const handleSignupClick = () => {
    navigate('/signup');
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { to: 'Signals-section', label: 'Signals' },
    { to: 'how-it-works-section', label: 'How it Works' },
    { to: 'pricing-section', label: 'Pricing' },
    { to: 'faq-section', label: 'FAQs' },
    { to: 'tips', label: 'Tips' },
    { to: 'blog-section', label: 'Blog' },
    { to: 'contact-section', label: 'Contact Us' },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <aside className="bg-white text-black py-3 text-center text-sm font-medium animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span>
            ✹ Limited-Time Offer: Huge Discount for the First 250 Subscribers!{' '}
            <Link
              to="pricing-section"
              smooth={true}
              duration={500}
              className="text-white font-semibold hover:text-gray-300 underline-offset-4 hover:underline cursor-pointer transition-colors duration-200"
            >
              View All Prices
            </Link>
          </span>
        </div>
      </aside>

      {/* Navigation Bar */}
      <nav
        className={`py-4 transition-all duration-300 z-10 ${
          isSticky
            ? 'fixed top-0 left-0 right-0 bg-white shadow-lg text-black'
            : 'bg-black text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo and Links */}
          <div className="flex items-center gap-6">
            <Link to="home-section" smooth={true} duration={500}>
              <img
                src="/assets/images/logo2.png"
                alt="company_logo"
                loading="lazy"
                className="w-28 md:w-20 cursor-pointer"
              />
            </Link>
            <div className="hidden md:flex">
              <ul className="flex gap-6">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      smooth={true}
                      duration={500}
                      className={`${
                        isSticky ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-300'
                      } font-medium text-base cursor-pointer transition-colors duration-200 hover:scale-105 transform`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-3">
              <button
                onClick={handleSignupClick}
                className={`${
                  isSticky ? 'bg-white border-black' : 'bg-white border-black'
                } text-black px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-200 hover:scale-105 transition-all duration-200 text-sm font-semibold border`}
              >
                Sign up <UserCircleIcon className={`w-5 h-5 ${isSticky ? 'text-black' : 'text-black'}`} />
              </button>
              <button
                onClick={handleLoginClick}
                className={`${
                  isSticky ? 'bg-black text-white border-white' : 'bg-black text-white border-white'
                } px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-800 hover:scale-105 transition-all duration-200 text-sm font-semibold border`}
              >
                Log In <UserCircleIcon className={`w-5 h-5 ${isSticky ? 'text-white' : 'text-white'}`} />
              </button>
            </div>
            <button className="md:hidden" onClick={toggleDrawer}>
              {isDrawerOpen ? (
                <XMarkIcon className={`w-6 h-6 ${isSticky ? 'text-black' : 'text-white'}`} />
              ) : (
                <Bars3Icon className={`w-6 h-6 ${isSticky ? 'text-black' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <Transition
          show={isDrawerOpen}
          enter="transition-transform duration-300 ease-in-out"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition-transform duration-300 ease-in-out"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
          as="div"
          className="fixed inset-0 z-40 md:hidden"
        >
          <div
            className="fixed inset-0 bg-black bg-opacity-60"
            onClick={toggleDrawer}
          ></div>
          <div className="fixed left-0 top-0 w-80 h-full bg-white p-6 flex flex-col justify-between">
            <div>
              <button onClick={toggleDrawer} className="text-black mb-6">
                <XMarkIcon className="w-6 h-6" />
              </button>
              <ul className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      smooth={true}
                      duration={500}
                      onClick={toggleDrawer}
                      className="text-black hover:text-gray-600 font-medium text-lg cursor-pointer transition-colors duration-200 hover:scale-105 transform"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleSignupClick}
                className="bg-white text-black px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-200 hover:scale-105 transition-all duration-200 text-sm font-semibold border border-black"
              >
                Sign up <UserCircleIcon className="w-5 h-5 text-black" />
              </button>
              <button
                onClick={handleLoginClick}
                className="bg-black text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-800 hover:scale-105 transition-all duration-200 text-sm font-semibold border border-white"
              >
                Log In <UserCircleIcon className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </Transition>
      </nav>
    </>
  );
};

export default Header;