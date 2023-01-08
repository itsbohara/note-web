import PropTypes from "prop-types";
import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
// hooks
import useAuth from "app/hooks/useAuth";
// pages
import Login from "pages/auth/login";

// components
import LoadingScreen from "components/LoadingScreen";
// import SplashLoadingV2 from "screens/SplashLoadingScreenV2";

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized, user } = useAuth();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<any>(null);

  if (!isInitialized) {
    // return <SplashLoadingV2 />;
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
