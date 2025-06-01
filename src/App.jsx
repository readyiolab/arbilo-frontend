import React, { useEffect } from "react";
import { RouterProvider, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import { DashboardProvider } from "./context/DashboardContext";
import Scroll from "./components/Scroll/Scroll";
import ReactGA from "react-ga4";
import router from "./routes/Route";

// Initialize Google Analytics only in production
if (process.env.NODE_ENV === "production") {
  ReactGA.initialize(process.env.REACT_APP_GA_MEASUREMENT_ID || "G-P7GC5GBYMP");
}

// Component to track page views
function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);

  return null; // This component doesn't render anything
}

function App() {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <DashboardProvider>
          <Scroll />
          <RouterProvider router={router}>
            <RouteTracker />
          </RouterProvider>
        </DashboardProvider>
      </AdminAuthProvider>
    </AuthProvider>
  );
}

export default App;