import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { IoMdSwap, IoMdTrendingUp } from "react-icons/io";
import ArbiTrack from "./ArbiTrack";
import ArbiPair from "./ArbiPair";
import { useDashboard } from "../../context/DashboardContext";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const messages = [
  "Scanning for arbitrage opportunities...",
  "Analyzing market data for profits...",
  "Fetching real-time exchange rates...",
  "Preparing insights for trading...",
];

const DashBoard = () => {
  const { auth } = useContext(AuthContext);
  const {
    arbiPairData,
    arbiTrackData,
    timeUntilNextRefresh,
    isInitialized,
    error,
  } = useDashboard();

  const [activeTab, setActiveTab] = useState("ArbiTrack");
  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const isActive = auth?.user?.is_active;

  // Loading message rotation
  useEffect(() => {
    if (!isInitialized) {
      const interval = setInterval(() => {
        setCurrentMessage(
          (prev) => messages[(messages.indexOf(prev) + 1) % messages.length]
        );
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isInitialized]);

  // Format time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs.toString().padStart(2, "0")}s`;
  };

  const handleSubscriptionActivate = () => {
    window.location.href = "/subscription"; // Redirect to subscription page
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
        Arbitrage Trading Dashboard
      </h1>
      <div className="flex flex-col items-center gap-3 mb-6">
        <div className="text-sm sm:text-base font-semibold text-gray-600">
          Next Refresh in:{" "}
          <span className="text-blue-600">
            {formatTime(timeUntilNextRefresh)}
          </span>
        </div>
        {!isInitialized && (
          <p className="text-sm text-gray-500 italic animate-pulse">
            {currentMessage}
          </p>
        )}
      </div>

      {!isActive && (
        <div className="mb-6 max-w-2xl mx-auto bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-300 rounded-lg p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl text-yellow-700 animate-pulse">⚠️</span>
            <h2 className="text-lg font-semibold text-yellow-800">
              Subscription Inactive
            </h2>
          </div>
          <p className="text-gray-700 text-sm sm:text-base">
            Unlock <b className="font-bold">ArbiPair</b> and access premium
            arbitrage opportunities by activating your subscription today!
          </p>
          <Button
            onClick={handleSubscriptionActivate}
            className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded-md transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <span className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Activate Now
            </span>
          </Button>
        </div>
      )}
      {isInitialized ? (
        <div>
          {/* Custom Tabs Navigation */}
          <div className="flex flex-col sm:flex-row justify-center gap-2 mb-6  ">
            <button
              onClick={() => setActiveTab("ArbiTrack")}
              className={`flex items-center gap-2 text-sm sm:text-base font-medium px-4 py-2 rounded-md transition-all ${
                activeTab === "ArbiTrack"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-blue-50"
              }`}
            >
              <IoMdTrendingUp className="text-lg" />
              ArbiTrack
            </button>
            <button
              onClick={() => isActive && setActiveTab("ArbiPair")}
              disabled={!isActive}
              className={`flex items-center gap-2 text-sm sm:text-base font-medium px-4 py-2 rounded-md transition-all ${
                activeTab === "ArbiPair" && isActive
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-green-50"
              } ${!isActive ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <IoMdSwap className="text-lg" />
              ArbiPair
            </button>
          </div>

          {/* Tab Content */}
          <div className=" p-6">
            {activeTab === "ArbiTrack" && (
              <ArbiTrack
                data={arbiTrackData}
                loading={!isInitialized}
                error={error}
              />
            )}
            {activeTab === "ArbiPair" && isActive && (
              <ArbiPair
                data={arbiPairData}
                loading={!isInitialized}
                error={error}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">
          Initializing dashboard...
        </div>
      )}
    </div>
  );
};

export default DashBoard;
