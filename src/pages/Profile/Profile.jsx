import React, { useState } from 'react';
import ProfileForm from './ProfileForm';
import PasswordForm from './PasswordForm';
import SubscriptionPage from './SubscriptionPage';
import { IoMdPerson, IoMdLock, IoMdCard } from 'react-icons/io';

const Profile = () => {
  const [activeSection, setActiveSection] = useState("manageProfile");

  return (
    <div className=" px-4 py-6 sm:py-8 sm:px-6 md:px-10 lg:px-16 flex flex-col items-center">
      {/* Heading */}
      <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 md:mb-8 text-center uppercase tracking-tight">
        Profile & Subscriptions
      </h1>

      {/* Navigation Buttons */}
      <div className="w-full max-w-5xl grid grid-cols-1 xs:grid-cols-3 sm:flex sm:flex-row justify-center gap-2 xs:gap-3 sm:gap-4 md:gap-6 mb-4 xs:mb-6 sm:mb-8">
        <button
          onClick={() => setActiveSection("manageProfile")}
          className={`flex items-center gap-2 px-3 py-2 text-xs xs:text-sm sm:text-base md:text-lg font-medium w-full justify-center rounded-md transition-all ${
            activeSection === "manageProfile"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          } focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-black`}
          aria-label="Manage Profile"
          aria-current={activeSection === "manageProfile" ? "true" : "false"}
        >
          <IoMdPerson size={16} className="xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
          <span className="hidden xs:inline">Manage Profile</span>
          <span className="inline xs:hidden">Profile</span>
        </button>
        <button
          onClick={() => setActiveSection("changePassword")}
          className={`flex items-center gap-2 px-3 py-2 text-xs xs:text-sm sm:text-base md:text-lg font-medium w-full justify-center rounded-md transition-all ${
            activeSection === "changePassword"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          } focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-black`}
          aria-label="Change Password"
          aria-current={activeSection === "changePassword" ? "true" : "false"}
        >
          <IoMdLock size={16} className="xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
          <span className="hidden xs:inline">Change Password</span>
          <span className="inline xs:hidden">Password</span>
        </button>
        <button
          onClick={() => setActiveSection("subscription")}
          className={`flex items-center gap-2 px-3 py-2 text-xs xs:text-sm sm:text-base md:text-lg font-medium w-full justify-center rounded-md transition-all ${
            activeSection === "subscription"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          } focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-black`}
          aria-label="Subscription"
          aria-current={activeSection === "subscription" ? "true" : "false"}
        >
          <IoMdCard size={16} className="xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
          <span className="hidden xs:inline">Subscription</span>
          <span className="inline xs:hidden">Sub</span>
        </button>
      </div>

      {/* Content */}
      <div className="w-full max-w-5xl mt-4 xs:mt-5 sm:mt-6 md:mt-8">
        {activeSection === "manageProfile" && <ProfileForm />}
        {activeSection === "changePassword" && <PasswordForm />}
        {activeSection === "subscription" && <SubscriptionPage />}
      </div>
    </div>
  );
};

export default Profile;